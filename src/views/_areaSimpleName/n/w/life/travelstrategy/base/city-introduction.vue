<template>
    <div class="city-intro" v-if="cityIntroduction != null && cityIntroduction.
    travelIntroductionTitle != undefined">
        <h2 class="city-intro-headine">
            {{cityIntroduction.travelIntroductionTitle}}
        </h2>
        <p class="city-intro-p">
            {{cityIntroduction.travelIntroductionContent}}
        </p>
        <div class="city-intro-img" v-if="cityIntroduction.imgList != null">
            <!-- <i class="left js-left" v-if="travelIntro.imgList.length>5">
                <b></b>
            </i>
            <i class="right js-right" v-if="travelIntro.imgList.length>5">
                <b></b>
            </i> -->
            <!-- <div class="city-intro-img-box">
                <ul class="city-intro-imgList">
                    <li v-for="a in travelIntro.imgList">
                        <img :src="a.imgSrc" alt="">
                    </li>
                </ul>
            </div> -->
            <swiper class="city-intro-img-box" :options="swiperOption">
                <ul class="swiper-wrapper city-intro-imgList" :class="{'ie':isIE}">
                    <li v-for="img in cityIntroduction.imgList" class="swiper-slide">
                        <img :src="img.imgUrl">
                    </li>
                </ul>
            </swiper>
            <div class="swiper-button-prev pre-arrow"></div>
            <div class="swiper-button-next next-arrow"></div>
        </div>
    </div>
</template>
<script>
    import browser from '@/util/browser'
    export default {
        props: {
            cityIntroduction: {
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                swiperOption: {
                    // loop: true,
                    speed: 300,
                    autoplay: {
                        delay: 3000
                    },

                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    breakpoints: {
                        //当宽度小于等于720
                        1200: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 30
                        }
                    },
                    spaceBetween: 30,
                    navigation: {
                        nextEl: '.city-intro-img .swiper-button-next',
                        prevEl: '.city-intro-img .swiper-button-prev'
                    }
                },
                isIE: false
            }
        },
        beforeMount() {
            this.isIE = browser.isIE();
        },
        components: {
            swiper: () => import("../../../base/common/swiper-container.vue")
        }
    }
</script>

<style>
    /* 城市的介绍 */

    .city-intro {
        margin-top: 20px;
        margin-bottom: 40px;
    }

    .city-intro-headine {
        font-size: 18px;
        line-height: 1;
        color: #17191a;
        margin-bottom: 17px;
    }

    .city-intro-p {
        font-size: 16px;
        color: #17191a;
        line-height: 23px;
    }

    .city-intro-img {
        position: relative;
        width: 100%;
        /* height: 95px; */
        margin-top: 25px;
        overflow: hidden;
    }

    .city-intro-img-box {
        /* width: 95.17%; */
        padding: 0px 17px;
        margin: 0 auto;
        max-height: 117px;
    }

    .city-intro-img-box.swiper-container {
        margin: 0px 14px;
    }

    .city-intro-img i {
        position: absolute;
        z-index: 2;
        width: 17px;
        height: 100%;
        cursor: pointer;
    }

    .city-intro-img i b {
        display: block;
        width: 100%;
        height: 100%;
    }

    .city-intro-img .left {
        top: 0;
        left: 0;
        background-color: #fff;
    }

    .city-intro-img .left b {
        background: url("~@/assets/web/last-small.png") no-repeat center left;
    }

    .city-intro-img .right {
        top: 0;
        right: 0;
        background-color: #fff;
    }

    .city-intro-img .right b {
        background: url("~@/assets/web/next-small.png") no-repeat center right;
    }

    /* 图片列表 */

    .city-intro-imgList {
        transition: all 0.5s ease-in-out;
    }

    .city-intro-imgList li {
        display: inline-block;
        /* width: 120px; */
        height: 100%;
        border-radius: 2px;
        /* margin-right: 19px; */
    }





    .city-intro-imgList li img {
        width: 100%;
        height: 100%;
    }

    /* 解决ie轮播问题 */

    .city-intro-imgList.ie{
        text-align: center;
    }
    .city-intro-imgList.ie li img {
        width: auto;
    }

</style>
<style>
    .city-intro-img .pre-arrow {
        left: 0px;
        width: 17px;
        height: 100%;
        top: 22px;
        background: url('~@/assets/web/last-small.png') no-repeat center left;
    }

    .city-intro-img .next-arrow {
        right: 0px;
        top: 22px;
        width: 17px;
        height: 100%;
        background: url('~@/assets/web/next-small.png') no-repeat center right;
    }
</style>