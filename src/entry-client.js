import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import headManager from './util/head/client'
import { registerStoreModules, registerStoreModules2 } from './util/store/client'
import request from './util/server/request'

import ProgressBar from './components/progress-bar.vue'

const bar = new Vue(ProgressBar).$mount();
Vue.prototype.$bar = bar;
document.body.appendChild(bar.$el)

const isProd = process.env.NODE_ENV === 'production'

const { app, router, store } = createApp()

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    // 只是锚点改变的话， 不重新请求数据
    if (to.path == from.path && to.hash != from.hash) {
      return;
    }


    const { asyncData, clientCache } = this.$options
    if (asyncData) {
      request.setRequestToStore({ store, route: to })

      let isCache = clientCache && clientCache({ store: this.$store, route: to, params: to.params, query: to.query });

      if (!isCache) {
        bar.start();
      }
      asyncData({
        store: this.$store,
        route: to,
        params: to.params,
        query: to.query
      }).then(response => {
        headManager.setHeadSingle(response, store)

        if (!isCache) {
          bar.finish();
        }
        next();
      }).catch(error => {
        if (error.url) {
          window.location = error.url;
        } else {
          next();
        }
      })
    } else {
      next()
    }
  }
})


// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 客户端head元素管理
headManager.handle({ store, router })

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  const currentMatched = router.getMatchedComponents(router.currentRoute)

  currentMatched.forEach(component => {
    registerStoreModules(component, store);
  })


  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    let diffed = false

    // 同一组件， 路由路径不同(不是参数不同)也请求数据
    let fromRoutePath = "";
    from.matched.forEach(({ path }) => {
      fromRoutePath += path;
    });
    let toRoutePath = "";
    to.matched.forEach(({ path }) => {
      toRoutePath += path;
    });
    if (fromRoutePath != toRoutePath) {
      diffed = true;
    }

    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    // 动态注册module
    activated.forEach(component => {
      registerStoreModules2(component, store);
    });

    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    request.setRequestToStore({ store, route: to })

    bar.start();

    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to, params: to.params, query: to.query })))
      .then(responses => {
        bar.finish();

        // 设置head信息
        headManager.setHead(responses, store);

        next()
      })
      .catch(error => {
        if (error.url) {
          window.location = error.url;
        } else {
          next();
        }
      })
  })
  // actually mount to DOM
  app.$mount('#app')
})

// // service worker
// if ('https:' === location.protocol && navigator.serviceWorker) {
//   navigator.serviceWorker.register('/s/dist/service-worker.js')
// }

