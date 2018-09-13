// register globally
import Vue from 'vue'
if (process.browser) {
    const infiniteScroll = require('vue-infinite-scroll')
    Vue.use(infiniteScroll)
}


