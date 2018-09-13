<template>
    <!-- 图片新闻的样式 -->
    <div class="picture_news_box" v-show="isShow">
        <div class="blue_header clearfloat">
            <h3>图片新闻</h3>
        </div>

        <div class="picture_news_slide">
            <swiper :options="swiperOption">
                <!-- <div v-swiper:mySwiper="swiperOption"> -->
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="imgInfo in imgInfoList" :key="imgInfo.infoCentreId">
                        <a :href="imgInfo.url" target="_blank">
                            <template v-if="notIE">
                                <img :data-src="imgInfo.infoImage" class="swiper-lazy">
                                <div class="swiper-lazy-preloader"></div>
                            </template>
                            <template v-else>
                                <img :src="imgInfo.infoImage" >
                            </template>
                            <!-- <img :src="imgInfo.infoImage"> -->
                        </a>

                        <div class="tips">
                            <a :href="imgInfo.url" target="_blank">{{imgInfo.infoTitle}}</a>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <!-- </div> -->
            </swiper>
        </div>
    </div>
</template>
<script>
    import browser from '@/util/browser'
    /** 
     * 图片新闻列表
     * @author jiemin
     * @author wzw
     * @date 2017-12-20
     */
    export default {
        props: ["imgInfoList"],
        data() {
            return {
                swiperOption: {
                    // loop: true,
                    speed: 300,
                    autoplay: {
                        delay: 3000
                    },
                    navigation: {
                        nextEl: '.picture_news_slide .swiper-button-next',
                        prevEl: '.picture_news_slide .swiper-button-prev'
                    },
                    lazy: {
                        loadPrevNext: true
                    }
                },
                notIE: true
            };
        },
        beforeMount() {
            this.notIE = !browser.isIE();
        },
        computed: {
            isShow() {
                return this.imgInfoList != null && this.imgInfoList.length > 0;
            }
        },
        components: {
            swiper: () => import('../common/swiper-container.vue')
        }
    }
</script>
<style>
    /* 
     *图片新闻样式
     */

    .picture_news_box {
        margin-top: 30px;
    }

    .picture_news_box .picture_news_slide {
        margin-top: 20px;
        width: 100%;
        /* box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.5); */
        /* max-height: 213px; */
    }

    .picture_news_slide {
        position: relative;
    }

    .picture_news_box .picture_news_slide .swiper-container {
        max-height: 216px;
        max-width: 300px;
    }

    .picture_news_box .swiper-slide {
        position: relative;
    }

    .picture_news_box .picture_news_slide img {
        display: block;
        margin: auto;
        width: 100%;
        max-height: 100% !important;
    }



    .picture_news_slide div.tips {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 32px;
        /* background-color: #000; */
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
    }

    .picture_news_slide div.tips a {
        color: #fff;
        font-size: 15px;
        line-height: 30px;
        overflow: hidden;
        height: 25px;
        display: inline-block;
        text-decoration: none;
        padding: 0px 5px;
        width: 100%;
    }


    /* 
        修改图片新闻轮播图的样式
    */

    .picture_news_slide .swiper-container .swiper-button-next {
        right: 0;
        width: 21px;
        height: 26px;
        background: url("~@/assets/web/next-pictrue.png") center center;
        background-size: 100% 100%;
    }

    .picture_news_slide .swiper-container .swiper-button-prev {
        left: 0;
        width: 21px;
        height: 26px;
        background: url("~@/assets/web/last-pictrue.png") center center;
        background-size: 100% 100%;
    }


    .picture_news_slide .swiper-button-prev.swiper-button-disabled,
    .picture_news_slide .swiper-button-next.swiper-button-disabled {
        pointer-events: inherit
    }
</style>