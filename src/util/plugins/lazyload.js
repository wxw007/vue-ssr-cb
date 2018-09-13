import Vue from 'vue'
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require("@/assets/web/lazy-loading.png"),
    loading: require("@/assets/web/lazy-loading.png"),
    attempt: 1
    // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
});