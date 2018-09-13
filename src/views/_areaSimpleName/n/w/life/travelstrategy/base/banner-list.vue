<template>
    <div class="strategy-banner">
        <swiper :options="swiperOption">
            <ul class="swiper-wrapper">
                <li v-for="banner in bannerList" style="width:100%;" class="swiper-slide" @click="to(banner.url)">
                    <img :src="banner.img" style="width:100%;">
                </li>
            </ul>
            <div class="swiper-button-prev prev-arrow" v-if="showArrow"></div>
            <div class="swiper-button-next next-arrow" v-if="showArrow"></div>
        </swiper>
    </div>
</template>
<script>
    export default {
        props: {
            bannerList: {
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                swiperOption: {
                    speed: 300,
                    autoplay: {
                        delay: 5000
                    },
                    navigation: {
                        nextEl: '.strategy-banner .swiper-button-next',
                        prevEl: '.strategy-banner .swiper-button-prev'
                    }
                }
            }
        },
        computed:{
            showArrow(){
                return this.bannerList != null && this.bannerList.length > 1;
            }
        },
        components: {
            swiper: () => import("../../../base/common/swiper-container.vue")
        },
        methods: {
            to(url) {
                if (url == null) {
                    return;
                }
                window.open(url);
            }
        }
    }
</script>

<style scoped>
    /**
     * banner图的样式
     */

    .strategy-banner {
        position: relative;
        width: 100%;
        /* box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.5); */
        margin-top: 25px;
        overflow: hidden;
    }

    .strategy-banner .swiper-container {
        max-height: 360px;
    }

    .strategy-banner li {
        cursor: pointer;
    }

    .strategy-banner .prev-arrow {
        background-image: url('~@/assets/web/last-pictrue.png');
        background-size: 42px 48px;
        width: 37px;
        height: 36px;
        left: 0px;
    }

    .strategy-banner .next-arrow {
        background-image: url('~@/assets/web/next-pictrue.png');
        background-size: 42px 48px;
        width: 37px;
        height: 36px;
        right: 0px;
    }
</style>