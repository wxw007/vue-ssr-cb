<template>

    <div class="latest-news-list-box" v-if="newestInfoList != null">
        <div class="blue_header clearfloat">
            <h3>最新资讯</h3>
        </div>
        <div class="latest-new-list clearfloat">
            <div v-for="(info,index) in newestInfoList"  :key="info.infoCentreId" class="latest-news-list-item clearfloat">
                <!-- 单图  -->
                <template v-if="info.hasImg=='1'">
                    <img :src="info.infoImage">
                    <div class="item_right ">
                        <div class="item_headline clearfloat">
                            <h3>
                                <a :href="info.url" target="_blank">{{info.infoTitle}}</a>
                            </h3>
                            <div class="item_msg clearfloat">
                                <span>{{info.quoteFrom}}</span>
                                <span>{{info.infoStartTime | timezoneconvert}}</span>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="item_headline no-img">
                        <h3>
                            <a :href="info.url" target="_blank">{{info.infoTitle}}
                            </a>
                        </h3>
                        <div class="item_msg clearfloat">
                            <span>{{info.quoteFrom}}</span>
                            <span>{{info.infoStartTime | timezoneconvert}}</span>
                        </div>
                    </div>
                </template>
            </div>
            <!-- 无图新闻 -->
        </div>
    </div>
</template>
<script>
    /** 
     * 最新新闻
     * @author jiemin
     * @date 2018-03-21
     */
    import timezoneconvert from '@/util/filter/timezoneconvert'
    export default {
        props: ["newestInfoList"],
        filters: {
            timezoneconvert
        },
    }
</script>
<style>
    .latest-new-list {
        padding-top: 10px;
    }

    .latest-news-list-box {
        width: 100%;
        margin-top: 0;
    }

    .latest-news-list-item {
        width: 100%;
        padding: 10px 0;
    }

    .latest-news-list-item img {
        width: 35.6%;
    }

    .latest-news-list-item .item_right {
        float: right;
        width: 60.6%;
        height: 100%;
    }

    .latest-news-list-item .item_headline {
        position: relative;
        width: 100%;
    }

    .latest-news-list-item .item_headline h3 {
        width: 100%;
        height: 38px;
        margin-bottom: 15px;
    }

    .latest-news-list-item .item_headline.no-img h3 {
        width: 100%;
        height: 38px;
        margin-bottom: 0px;
    }

    .latest-news-list-item .item_headline h3 a {
        width: 100%;
        max-height: 38px;
        line-height: 19px;
        margin-bottom: 15px;
        font-size: 16px;
        color: #17191A;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .latest-news-list-item .item_headline .img_box {
        margin-bottom: -2px;
    }

    .latest-news-list-item .item_headline .img_box a {
        display: inline-block;
        width: 22.722%;
        overflow: hidden;
        margin-top: 5px;
    }

    .latest-news-list-item .item_headline .img_box a img {
        width: 100%;
        height: auto;
    }

    .latest-news-list-item .item_headline .img_box .more_news {
        position: relative;
    }

    .latest-news-list-item .item_headline .img_box .more_news img {
        -webkit-filter: blur(5px);
        /* Chrome, Opera */
        -moz-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=5, MakeShadow=false);
        /* IE6~IE9 */
    }

    .latest-news-list-item .item_headline .img_box .more_news:before {
        content: "查看更多>>";
        position: absolute;
        z-index: 3;
        display: block;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 80px;
        line-height: 80px;
        font-size: 16px;
        color: #fff;
        text-align: center;
    }

    .latest-news-list-item .item_headline .img_box .more_news:after {
        content: "";
        position: absolute;
        z-index: 2;
        display: block;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        font-size: 16px;
        color: #fff;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.43);
    }

    .latest-news-list-item .item_headline .img_box i {
        display: inline-block;
        width: 1px;
        height: 100%;
        margin: 0 1.434%;
    }

    .latest-news-list-item .item_headline .item_msg {
        position: relative;
        line-height: 1;
        padding-top: 8px;
    }

    .latest-news-list-item .item_headline .item_msg i {
        float: left;
        display: inline-block;
        height: 15px;
        line-height: 15px;
        margin-right: 20px;
        font-size: 12px;
        font-style: normal;
        color: #0082C6;
        text-align: center;
        border: 1px solid #0082C6;
        border-radius: 2px;
    }

    .latest-news-list-item .item_headline .item_msg span {
        float: left;
        display: inline-block;
        height: 15px;
        line-height: 16px;
        font-size: 12px;
    }

    .latest-news-list-item .item_headline .item_msg span:nth-of-type(2) {
        float: right;
    }

    .latest-news-list-item .item_headline .item_msg .unlike {
        float: left;
        position: absolute;
        display: block;
        bottom: -2px;
        right: -4px;
        float: right;
        width: 21px;
        height: 22px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    }

    .latest-news-list-item .item_headline .item_msg .unlike b {
        position: absolute;
        display: inline-block;
        right: 5px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 11px;
        height: 11px;
        background: url(~@/assets/web/index_icon.png) no-repeat -53px -34px;
    }

    .latest-news-list-item .item_headline .item_msg .unlike em {
        float: none;
        display: inline-block;
        height: 22px;
        padding: 0 6px;
        line-height: 24px;
        font-size: 12px;
        font-style: normal;
        color: #fff;
        overflow: hidden;
    }

    .latest-news-list-item .item_headline .item_msg .unlike:hover {
        background: #0082C6;
        width: 73px;
        height: 22px;
    }

    .latest-news-list-item .item_headline .item_msg .unlike:hover b {
        background: url(~@/assets/web/index_icon.png) no-repeat -39px -56px;
    }

    .latest-news-list-item .item_headline .promotion a {
        display: block;
    }

    .latest-news-list-item .item_headline .promotion img {
        width: 100%;
    }

    .top-token {
        background: #0082C6;
        color: white !important;
        padding: 0px 5px;
    }

    .latest-news-list-item a {
        cursor: pointer;
    }

    @media screen and (-ms-high-contrast: active),
    (-ms-high-contrast: none) {
        .latest-news-list-item .item_headline .item_msg i {
            line-height: 12px;
        }
    }



    .new_list img {
        background: url("~@/assets/web/lazy-loading.png") no-repeat center center;
        background-size: 100% 100%;
        /* background:#bfbfbf; */
        height: 76px;
    }

    .new_list img[lazy=loaded] {
        background: transparent;
        height: auto;
    }
</style>