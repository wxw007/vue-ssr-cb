<template>
    <div class="img-container">
        <b>照片&nbsp;：</b>
        <div class="small-img-container">
            <swiper class="small-img-box " :options="swiperOption" :class="{'no-arrow':!showArrow}">
                <ul class="swiper-wrapper small-img-list">
                    <li v-for="(img, index) in imgList" :key="img+index" class="swiper-slide" @click="showImg(index)" :class="{'active':activeIndex == index}">
                        <img :src="img">
                    </li>
                </ul>
                <div v-if="showArrow" class="swiper-button-prev pre-arrow"></div>
                <div v-if="showArrow" class="swiper-button-next next-arrow"></div>
            </swiper>
        </div>
        <div class="other-show-img-box" v-show="activeIndex!=null" @click="hideImg($event)">
            <img :src="activeImgUrl" alt="">
        </div>
    </div>
</template>

<script>
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
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                // activeImgUrl: require("~@/assets/web/delete/food-2.png"),
                activeIndex: null
            };
        },
        computed: {
            activeImgUrl() {
                if (this.activeIndex == null) {
                    return null;
                }
                return this.bigImgList[this.activeIndex];
            },
            showArrow() {
                return this.imgList != null && this.imgList.length > 4;
            }
        },
        components: {
            swiper: () => import("../../base/common/swiper-container.vue")
        },
        methods: {
            showImg(index) {
                this.activeIndex = index;
            },
            hideImg(e) {
                var target = e.target;
                if (target.nodeName == "DIV") {
                    this.activeIndex = null;
                }
            },
        }
    }
</script>

<style scoped>
    .img-container {
        position: relative;
        width: 100%;
        margin-top: 9px;
        overflow: hidden;
    }

    .img-container b {
        line-height: 1;
        font-size: 18px;
        font-weight: 800;
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
        width: 100%;
        height: 97px;
        margin-top: 20px;
        overflow: hidden;
    }

    .small-img-box {
        position: relative;
        overflow: hidden;
        padding: 0px 40px;
        width: 100%;
        /* height: 133px; */
        height: 97px;
        /* max-height: 109px; */
    }

    .small-img-box.no-arrow {
        padding: 0px;
    }

    .small-img-box .pre-arrow {
        background: url("~@/assets/web/swiper-left.png") no-repeat;
        left: 0px;
        height: 100%;
        width: 20px;
        background-size: 100% 100%;
        top: 0;
        margin-top: 0;
        opacity: 1;
    }

    .small-img-box .next-arrow {
        background: url("~@/assets/web/swiper-right.png") no-repeat;
        right: 0px;
        height: 100%;
        width: 20px;
        background-size: 100% 100%;
        top: 0;
        margin-top: 0;
        opacity: 1;
    }

    .small-img-list li {
        display: inline-block;
        width: 69px;
        height: 100%;
        border-radius: 2px;
        margin-right: 14px;
        cursor: pointer;
        /* opacity: .4; */
    }

    .small-img-list li.active {
        opacity: 1;
    }


    .small-img-list li img {
        width: 100%;
        /* height: 100%; */
        height: auto;
    }

    /* 
    显示当前被选中的图片的盒子样式
 */

    .other-show-img-box {
        z-index: 15;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
    }

    .other-show-img-box img {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        -ms-transform: translateX(-50%) translateY(-50%);
    }
</style>