import Vue from 'vue'
import 'swiper/dist/css/swiper.css'
import browser from '../browser'

if (process.browser && !browser.isIE()) {
    // https://github.com/surmon-china/vue-awesome-swiper
    const VueAwesomeSwiper = require("vue-awesome-swiper/dist/ssr");
    Vue.use(VueAwesomeSwiper);
}