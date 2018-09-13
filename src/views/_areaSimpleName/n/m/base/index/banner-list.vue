<template>
    <swiper class="turn-warp " :options="swiperOptions" v-show="isShow">
        <div class="turn-list swiper-wrapper">
            <touch-link tag="div" class="turn-box swiper-slide" v-for="banner in bannerList" :key="banner.img" :href="banner.url">
                <img :src="banner.img">
                <div class="banner-title">{{banner.title}}</div>
            </touch-link>
        </div>
        <!-- <div class="turn-bottom clearfix"> -->
        <!-- <div class="turn-cover"></div>
            <div class="turn-title fl">
                <div>华人头条之“侨”那些事儿</div>
                <div class="hide">华人头条之“侨”那些事儿2</div>
                <div class="hide">华人头条之“侨”那些事儿3</div>
                <div class="hide">华人头条之“侨”那些事儿4</div>
            </div> -->
        <div class="turn-point fr" v-show="showDot"></div>
        <!-- </div> -->
    </swiper>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-02-06 08:27
     */
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
                swiperOptions: {
                    pagination: {
                        el: '.turn-warp .turn-point'
                    },
                    autoplay: {
                        delay: 3000
                    },
                    loop: false
                }
            }
        },
        computed: {
            isShow() {
                return (this.bannerList != null && this.bannerList.length > 0)
            },
            showDot() {
                return this.bannerList != null && this.bannerList.length > 1;
            }
        }
    }
</script>
<style>
    .banner-title {
        /* opacity: .3; */
        /* background: #000000; */
        position: absolute;
        width: 100%;
        bottom: 0px;
        line-height: .54rem;
        font-size: .28rem;
        color: #ffffff;
        padding-left: .3rem;
        background-color: rgba(0, 0, 0, .3);
    }

    .turn-list {
        display: flex;
    }

    .turn-box {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
        max-height: 3.8rem;
    }

    .turn-point {
        bottom: 0px !important;
        position: absolute;
        z-index: 10;
        right: 0px;
        height: .52rem;
        line-height: 0;
        padding-right: .3rem;
        text-align: right;
    }



    .turn-point .swiper-pagination-bullet {
        background: #d8eff3;
        margin-right: .08rem;
        width: .08rem;
        height: .08rem;
    }

    .turn-point .swiper-pagination-bullet-active {
        background: #ffffff;
        width: .1rem;
        height: .1rem;
    }
</style>