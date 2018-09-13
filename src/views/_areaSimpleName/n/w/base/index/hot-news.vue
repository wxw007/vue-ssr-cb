<template>
    <!-- 热点新闻，放轮播和新闻 -->
    <div class="hot_news_area clearfloat">
        <div class="hot_slide_area">
            <swiper :options="swiperOption">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="hotBannerInfo in hotBannerInfoList" :key="hotBannerInfo.infoCentreId">
                        <a :title="hotBannerInfo.infoTitle" :href="hotBannerInfo.url" target="_blank">
                            <img :src="hotBannerInfo.infoImage" style="width:100%;">
                        </a>
                        <div class="tips">
                            <a>{{hotBannerInfo.infoTitle}}</a>
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination" style="position:absolute;left:0px;bottom:8px;width:100%;text-align: center;"></div>
            </swiper>
        </div>
        <div class="hot_news">
            <div class="blue_header clearfloat">
                <h3>热点新闻</h3>
            </div>
            <h2 class="hot_new_headline" v-for="hotInfo in hotInfoList" :key="hotInfo.infoCentreId">
                <a :href="hotInfo.url" target="_blank">{{hotInfo.infoTitle}}</a>
            </h2>
        </div>
    </div>
</template>
<script>
    /** 
     * 热点新闻列表区域
     * @author wzw 
     * @author jiemin
     * @date 2017-12-20
     */
    export default {
        props: ["hotBannerInfoList", "hotInfoList"],
        data() {
            return {
                swiperOption: {
                    loop: true,
                    speed: 300,
                    autoplay: {
                        delay: 3000
                    },
                    pagination: {
                        el: '.hot_slide_area .swiper-pagination',
                        clickable: true
                    }
                }
            };
        },
        components: {
            swiper: () => import('../common/swiper-container.vue')
        }
    }
</script>


<style>
    /* 热点新闻区域，即轮播图范围 */

    .news_content {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: all 0.8s ease-in-out;
    }

    .hot_news_area {
        height: 252px;
    }

    .hot_news_area .hot_slide_area {
        position: relative;
        overflow: hidden;
        float: left;
        width: 48.31%;
        height: 252px;
        /*热点新闻的轮播样式区域*/
    }

    .hot_slide_area>div {
        height: 100%;
    }

    .hot_news_area .hot_news {
        float: right;
        width: 48.17%;
        height: 252px;
    }

    .hot_news_area .hot_news .hot_new_headline {
        height: 75px;
        padding: 15px 0;
        font-size: 18px;
        border-bottom: 1px solid #F2F2F2;
    }

    .hot_news_area .hot_news .hot_new_headline a {
        display: block;
        height: 100%;
        height: 48px;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #17191A;
    }


    .hot_slide_area div.tips {
        position: absolute;
        bottom: 0px;
        width: 100%;
        height: 42px;
        /* background-color: #000; */
        background-color: rgba(0, 0, 0, 0.7);
        overflow: hidden;
    }

    .hot_slide_area div.tips a {
        color: #fff;
        font-size: 15px;
        line-height: 30px;
        overflow: hidden;
        height: 25px;
        display: inline-block;
        text-decoration: none;
        padding: 0px 5px;
    }

    .hot_slide_area div.title {
        width: 100%;
        text-align: center;
        position: absolute;
        left: 0px;
        bottom: 15px;
        height: 25px;
    }

    .hot_slide_area div.title a {
        display: block;
        width: 100%;
        height: 25px;
        color: #FFF;
        font-size: 15px;
        line-height: 25px;
        text-decoration: none;
        overflow: hidden;
    }

    .hot_slide_area div.title a:hover {
        text-decoration: underline !important;
    }

    .hot_slide_area .swiper-container-horizontal>.swiper-pagination-bullets {
        bottom: 8px;
    }

    .hot_slide_area .swiper-pagination-bullet {
        display: inline-block;
        width: 4px;
        height: 4px;
        background-color: #FFF;
        text-indent: -99999px;
        margin: 3px 4.5px 0px;
        opacity: 0.7;
        transform: scale(1);
        transition: all 0.3s ease-in-out;
    }

    .hot_slide_area .swiper-pagination-bullet-active {
        background: white;
        transform: scale(1.5);
        opacity: 1;
    }
</style>