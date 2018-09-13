<template>
    <div class="img-container">
        <div class="big-img-box">
            <img :src="activeImgUrl" alt="">
        </div>
        <div class="small-img-container">
            <swiper class="small-img-box " :options="swiperOption" :class="{'no-arrow':!showArrow}">
                <ul class="swiper-wrapper small-img-list" :class="{'ie':isIE}">
                    <li v-for="(img, index) in imgList" :key="img" class="swiper-slide" @click.stop="showImg(index)" :class="{'active':activeIndex == index}">
                        <img :src="img">
                    </li>
                </ul>
            </swiper>
            <div class="swiper-button-prev pre-arrow" v-if="showArrow"></div>
            <div class="swiper-button-next next-arrow" v-if="showArrow"></div>
        </div>
    </div>
</template>

<script>
    import browser from '@/util/browser'
    export default {
        props: {
            imgList: {
                default() {
                    return [];
                }
            },
            bigImgList: {
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                swiperOption: {
                    // loop: true,
                    speed: 300,
                    // autoplay: {
                    //   delay: 3000
                    // },
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    breakpoints: {
                        //当宽度小于等于720
                        720: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                            spaceBetween: 10
                        }
                    },
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.small-img-container .swiper-button-next',
                        prevEl: '.small-img-container .swiper-button-prev'
                    }
                },
                // activeImgUrl: require("~@/assets/web/delete/food-2.png"),
                activeIndex: 0,
                isIE: false
            };
        },
        components: {
            swiper: () => import("../../base/common/swiper-container.vue")
        },
        beforeMount() {
            this.isIE = browser.isIE();
        },
        computed: {
            activeImgUrl() {
                return this.bigImgList[this.activeIndex];
            },
            showArrow() {
                return this.imgList != null && this.imgList.length > 4;
            }
        },
        methods: {
            showImg(index) {
                this.activeIndex = index;
            }
        }
    }
</script>

<style scoped>
    .img-container {
        float: left;
        width: 51.136%;
    }

    .big-img-box {
        width: 100%;
        height: 263px;
    }

    .big-img-box img {
        width: 100%;
        height: 100%;
    }

    /*  小图滚动的样式 */

    .small-img-container {
        position: relative;
        width: 100%;
        height: 50px;
        margin-top: 9px;
        overflow: hidden;
    }

    .small-img-box {
        /* width: 91.5%; */
        /* margin-left: 20px; */
        overflow: hidden;
        margin: 0px 20px;
        /* width: 100%; */
        height: 100%;
        /* margin-left: 0px; */
    }

    .small-img-box.no-arrow {
        padding: 0px;
    }

    .small-img-container .pre-arrow {
        background: url("~@/assets/web/swiper-left.png") no-repeat;
        left: 0px;
        height: 50px;
        width: 10px;
        background-size: 100% 100%;
        top: 0%;
        margin-top: 0px;
    }

    .small-img-container .next-arrow {
        background: url("~@/assets/web/swiper-right.png") no-repeat;
        right: 0px;
        height: 50px;
        width: 10px;
        background-size: 100% 100%;
        top: 0%;
        margin-top: 0px;
    }

    .small-img-list li {
        display: inline-block;
        width: 69px;
        height: 100%;
        border-radius: 2px;
        /* margin-right: 14px; */
        cursor: pointer;
        opacity: .4;
    }

    .small-img-list li.active {
        opacity: 1;
    }



    .small-img-list li img {
        width: 100%;
        height: 100%;
    }

    /* 解决ie轮播问题 */
    .small-img-list.ie{
        text-align: center;
    }
    .small-img-list.ie li img {
        width: auto;
    }
</style>