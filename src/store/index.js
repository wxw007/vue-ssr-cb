import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      title: "", // 文档标题
      meta: [], // 文档meta信息
      request: null, // 存放请求header, 参数, url等信息
      scriptUrls: [], // js url
      link: []// 文档link信息
    },
    mutations
  })
}
