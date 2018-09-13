<template>
    <div class="ad_box" v-show="isShow">
        <div class="blue_header clearfloat">
            <h3>推广</h3>
        </div>
        <swiper class="ad_slide" :options="swiperOption" v-for="banner in doAdImgList" :key="banner[0].img">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="ad in banner">
                    <a @click="to(ad.url)">
                        <img :src="ad.img">
                    </a>
                </div>
            </div>
        </swiper>
        <!-- <div class="ad_slide" v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div v-for="banner in doAdImgList" :key="banner[0].img" class="swiper-slide">
                    <a v-for="ad in banner">
                        <img :src="ad.img" @click="to(ad.url)">
                    </a>
                </div>
            </div>
        </div> -->
        <!--  <div class="ad_slide" v-swiper:mySwiper="swiperOption" v-else-if="adList != null">
            <div class="swiper-wrapper">
                <a v-for="ad in adList" :key="ad.img" class="swiper-slide">
                    <img :src="ad.img" @click="to(ad.toUrl)" />
                </a>
            </div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </div> -->
    </div>
</template>
<script>
    /** 
     * 推广banner
     * @author jiemin
     * @author wzw
     * @date 2017-12-20
     */
    export default {
        props: ["bannerList"],
        data() {
            return {
                swiperOption: {
                    // loop: true,
                    speed: 300,
                    autoplay: {
                        delay: 3000
                    }
                }
            };
        },
        computed: {
            isShow() {
                return (this.bannerList != null && this.bannerList.length > 0)
            },
            doAdImgList() {//广告图要三张三张的轮播
                var doArr = this.bannerList || [];
                var arr = [];
                for (var i = 0, len = doArr.length; i < len; i++) {
                    var quotient = i % 3;//倍数
                    arr[quotient] == undefined && arr.push([]);
                    arr[quotient].push(doArr[i]);
                }
                return arr;
            }
        },
        components: {
            swiper: () => import('../common/swiper-container.vue')
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
<style>
    /* 
     *推广样式
     */

    .ad_box {
        width: 100%;
        margin-top: 30px;
    }

    .ad_box .ad_slide {
        max-height: 168px;
    }

    .ad_box .ad_slide a {
        display: inline-block;
        width: 100%;
        cursor: pointer;
        margin-top: 20px;
    }

    .ad_box .ad_slide a img {
        width: 100%;
        height: 100%;
        border: 1px solid #DFDFDF;
    }

    .ad_slide .swiper-button-next {
        right: 0;
        width: 21px;
        height: 26px;
        background: url("~@/assets/web/next-pictrue.png") center center;
        background-size: 100% 100%;
    }

    .ad_slide .swiper-button-prev {
        left: 0;
        width: 21px;
        height: 26px;
        background: url("~@/assets/web/last-pictrue.png") center center;
        background-size: 100% 100%;
    }
</style>