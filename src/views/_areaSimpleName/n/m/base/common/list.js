import Vue from 'vue'
import '@/util/plugins/lazyload.js'
import { InfiniteScroll, Spinner, Loadmore } from 'mint-ui'
import infiniteScroll from './list/infinite-scroll.vue'
import loadmoreComponent from './list/loadmore.vue'

Vue.use(InfiniteScroll);
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
Vue.component("infiniteScroll", infiniteScroll)
Vue.component("loadmore", loadmoreComponent)
