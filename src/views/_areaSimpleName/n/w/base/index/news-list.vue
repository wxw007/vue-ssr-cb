<template>
    <!-- 新闻列表 -->
    <div class="new_list" v-if="infosMap != null">
        <div class="news_list_item clearfloat" v-for="info in infosMap.infoList" :key="info.infoCentreId">
            <template v-if="info.aiId != null ">
                <!-- 广告 -->
                <template v-if="info.isPromotion == '1'">
                    <a @click="to(info.url)" class="ad-style">
                        <img v-lazy="info.infoImage">
                    </a>
                    <div class="item_right video-style-right">
                        <div class="item_headline clearfloat">
                            <h3>
                                <a @click="to(info.url)">
                                    {{info.aiTitle}}
                                </a>
                            </h3>
                            <div class="item_msg">
                                <i class="hot_token" v-if="info.aiCompanyName != null && info.aiCompanyName != ''">{{info.aiCompanyName}}</i>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else-if="info.infoImageThirdly != null">
                    <div class="item_headline">
                        <h3>
                            <a @click="to(info.url)">
                                {{info.aiTitle}}
                            </a>
                        </h3>
                        <div class="img_box">
                            <a @click="to(info.url)">
                                <img v-lazy="info.infoImage"> </a>
                            <i></i>
                            <a @click="to(info.url)">
                                <img v-lazy="info.infoImageSecond"> </a>
                            <i></i>
                            <a @click="to(info.url)">
                                <img v-lazy="info.infoImageThirdly">
                            </a>
                            <i></i>
                            <a @click="to(info.url)" class="more_news">
                                <img v-lazy="info.infoImageThirdly">
                            </a>
                        </div>
                        <div class="item_msg">
                            <i class="hot_token" v-if="info.aiCompanyName != null && info.aiCompanyName != ''">{{info.aiCompanyName}}</i>
                        </div>
                    </div>
                </template>
                <template v-else-if="info.infoImage != null">
                    <img v-lazy="info.infoImage">
                    <div class="item_right ">
                        <div class="item_headline clearfloat">
                            <h3>
                                <a @click="to(info.url)">
                                    {{info.aiTitle}}
                                </a>
                            </h3>
                            <div class="item_msg">
                                <i class="hot_token" v-if="info.aiCompanyName != null && info.aiCompanyName != ''">{{info.aiCompanyName}}</i>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="item_headline">
                        <h3>
                            <a @click="to(info.url)">
                                {{info.aiTitle}}
                            </a>
                        </h3>
                        <div class="item_msg">
                            <i class="hot_token" v-if="info.aiCompanyName != null && info.aiCompanyName != ''">{{info.aiCompanyName}}</i>
                        </div>
                    </div>
                </template>

            </template>
            <template v-else-if="info.infoType == '2'">
                <!-- 视频新闻 -->
                <a :href="info.url" class="video-style" target="_blank">
                    <img v-lazy="info.infoImage">
                </a>
                <div class="item_right video-style-right">
                    <div class="item_headline clearfloat">
                        <h3>
                            <a :href="info.url" target="_blank" v-html="info.infoTitle"></a>
                        </h3>
                        <div class="item_msg">
                            <i class="hot_token">视频</i>
                            <i class="hot_token" v-if="info.symposiumLogoName">{{info.symposiumLogoName}}</i>
                            <i class="hot_token top-token" v-if="info.isStick == '1'">置顶</i>
                            <span>{{info.quoteFrom}}</span>
                            <span>{{info.infoStartTime | timezoneconvert}}</span>
                            <!-- <div class="unlike">
                                <em>不感兴趣</em>
                                <b></b>
                            </div> -->
                        </div>
                        <ul class="tag tag-block" v-if="info.tags!=null ">
                            <li>标签：</li>
                            <li class="tag-item " :class="{'active':tag.keywordsId == $route.params.id}" v-for="tag in info.tags" :key="tag.keywordsId">
                                <a :href="tag.url">{{tag.keywords}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
            <template v-else-if="info.isPromotion == '1'">
                <!-- 推广新闻 -->
                <a :href="info.url" class="ad-style" target="_blank">
                    <img v-lazy="info.infoImage">
                </a>
                <div class="item_right video-style-right">
                    <div class="item_headline clearfloat">
                        <h3>
                            <a :href="info.url" target="_blank" v-html="info.infoTitle">
                            </a>
                        </h3>
                        <div class="item_msg">
                            <i class="hot_token">{{info.promotionName}}</i>
                            <i class="hot_token top-token" v-if="info.isStick == '1'">置顶</i>
                            <span v-if="info.quoteFrom">{{info.quoteFrom}}</span>
                            <span>{{info.infoStartTime | timezoneconvert}}</span>
                        </div>
                        <ul class="tag tag-block" v-if="info.tags!=null">
                            <li>标签：</li>
                            <li class="tag-item " :class="{'active':tag.keywordsId == $route.params.id}" v-for="tag in info.tags" :key="tag.keywordsId">
                                <a :href="tag.url">{{tag.keywords}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </template>
            <template v-else-if="info.infoImageThirdly != null">
                <!-- 三图  -->
                <div class="item_headline">
                    <h3>
                        <a :href="info.url" target="_blank" v-html="info.infoTitle">
                        </a>
                    </h3>
                    <div class="img_box">
                        <a :href="info.url" target="_blank">
                            <img v-lazy="info.infoImage"> </a>
                        <i></i>
                        <a :href="info.url" target="_blank">
                            <img v-lazy="info.infoImageSecond"> </a>
                        <i></i>
                        <a :href="info.url" target="_blank">
                            <img v-lazy="info.infoImageThirdly">
                        </a>
                        <i></i>
                        <a :href="info.url" target="_blank" class="more_news">
                            <img v-lazy="info.infoImageThirdly">
                        </a>
                    </div>
                    <div class="item_msg" style="overflow:hidden">
                        <i class="hot_token" v-if="info.symposiumLogoName">{{info.symposiumLogoName}}</i>
                        <i class="hot_token top-token" v-if="info.isStick == '1'">置顶</i>
                        <span v-if="info.quoteFrom">{{info.quoteFrom}}</span>
                        <span>{{info.infoStartTime | timezoneconvert}}</span>
                        <ul class="tag tag-inline" v-if="info.tags!=null">
                            <li>标签：</li>
                            <li class="tag-item " :class="{'active':tag.keywordsId == $route.params.id}" v-for="tag in info.tags" :key="tag.keywordsId">
                                <a :href="tag.url">{{tag.keywords}}</a>
                            </li>
                        </ul>
                        <!-- <div class="unlike">
                            <em>不感兴趣</em>
                            <b></b>
                        </div> -->
                    </div>
                </div>
            </template>
            <template v-else-if="info.infoImage != null">
                <!-- 单图  -->
                <img v-lazy="info.infoImage">
                <div class="item_right ">
                    <div class="item_headline clearfloat">
                        <h3>
                            <a :href="info.url" target="_blank" v-html="info.infoTitle">
                            </a>
                        </h3>
                        <div class="item_msg">
                            <i class="hot_token" v-if="info.symposiumLogoName">{{info.symposiumLogoName}}</i>
                            <i class="hot_token top-token" v-if="info.isStick == '1'">置顶</i>
                            <span v-if="info.quoteFrom">{{info.quoteFrom}}</span>
                            <span>{{info.infoStartTime | timezoneconvert}}</span>
                            <!-- <div class="unlike">
                                <em>不感兴趣</em>
                                <b></b>
                            </div> -->
                        </div>
                    </div>
                    <ul class="tag tag-block" v-if="info.tags!=null">
                        <li>标签：</li>
                        <li class="tag-item " :class="{'active':tag.keywordsId == $route.params.id}" v-for="tag in info.tags" :key="tag.keywordsId">
                            <a :href="tag.url">{{tag.keywords}}</a>
                        </li>
                    </ul>
                </div>
            </template>
            <template v-else>
                <!-- 无图新闻 -->
                <div class="item_headline">
                    <h3>
                        <a :href="info.url" target="_blank" v-html="info.infoTitle">
                        </a>
                    </h3>
                    <div class="item_msg over-hidden">
                        <i class="hot_token" v-if="info.symposiumLogoName">{{info.symposiumLogoName}}</i>
                        <i class="hot_token top-token" v-if="info.isStick == '1'">置顶</i>
                        <span v-if="info.quoteFrom">{{info.quoteFrom}}</span>
                        <span>{{info.infoStartTime | timezoneconvert}}</span>
                        <ul class="tag tag-inline" v-if="info.tags!=null">
                            <li>标签：</li>
                            <li class="tag-item " :class="{'active':tag.keywordsId == $route.params.id}" v-for="tag in info.tags" :key="tag.keywordsId">
                                <a :href="tag.url">{{tag.keywords}}</a>
                            </li>
                        </ul>
                        <!-- <div class="unlike">
                            <em>不感兴趣</em>
                            <b></b>
                        </div> -->
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    /** 
     * 新闻列表
     * @author wzw 
     * @author jiemin
     * @date 2017-12-20
     */
    import timezoneconvert from '@/util/filter/timezoneconvert'
    export default {
        props: ["infosMap"],
        filters: {
            timezoneconvert
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
    /* 
     * 新闻列表的样式
     */

    .news_list_item {
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #F2F2F2;
    }

    .news_list_item img {
        width: 22.727%;
    }

    .news_list_item .video-style {
        /* 视频样式 */
        display: table-cell;
        width: 50%;
        height: 192px;
        vertical-align: middle;
        padding-right: 1.42%;
    }

    .news_list_item .ad-style {
        /* 广告，推广样式 */
        display: table-cell;
        width: 50%;
        height: 171px;
        vertical-align: middle;
        padding-right: 1.42%;
    }


    .news_list_item .ad-style img {
        /* 广告，推广样式 */
        width: 100%;
        height: 100%;
    }

    .news_list_item .video-style img {
        /* 视频样式 */
        width: 100%;
        height: 100%;
    }

    .news_list_item .item_right {
        float: right;
        width: 75.29%;
        height: 100%;
        /*padding-top: 19px;*/
        padding-top: 10px;
    }

    .news_list_item .item_right.video-style-right {
        float: none;
        vertical-align: middle;
        display: table-cell;
        width: 50%;
        height: 100%;
        padding-top: 0;
        padding-left: 1.42%;
    }

    .news_list_item .item_headline {
        position: relative;
        width: 100%;
    }

    .news_list_item .item_headline h3 {
        width: 100%;
        /* height: 18px; */
        /* line-height: 19px; */
        margin-bottom: 15px;
        /* font-size: 18px; */
        /* color: #17191A; */
        /* overflow: hidden; */
        /* text-overflow: ellipsis; */
        /* display: -webkit-box; */
        /* -webkit-line-clamp: 1; */
        /* -webkit-box-orient: vertical; */
    }

    .news_list_item .item_headline h3 a {
        width: 100%;
        max-height: 38px;
        line-height: 19px;
        margin-bottom: 15px;
        font-size: 18px;
        color: #17191A;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .news_list_item .item_headline .img_box {
        margin-bottom: -2px;
    }

    .news_list_item .item_headline .img_box a {
        display: inline-block;
        width: 22.722%;
        overflow: hidden;
        margin-top: 5px;
    }

    .news_list_item .item_headline .img_box a img {
        width: 100%;
        height: auto;
    }

    .news_list_item .item_headline .img_box .more_news {
        position: relative;
    }

    .news_list_item .item_headline .img_box .more_news img {
        -webkit-filter: blur(5px);
        /* Chrome, Opera */
        -moz-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
        filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=5, MakeShadow=false);
        /* IE6~IE9 */
    }

    .news_list_item .item_headline .img_box .more_news:before {
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

    .news_list_item .item_headline .img_box .more_news:after {
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

    .news_list_item .item_headline .img_box i {
        display: inline-block;
        width: 1px;
        height: 100%;
        margin: 0 1.434%;
    }

    .news_list_item .item_headline .item_msg {
        position: relative;
        height: 30px;
        line-height: 15px;
        padding-top: 15px;
    }

    .news_list_item .item_headline .item_msg i {
        float: left;
        display: inline-block;
        /* width: 31px; */
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

    .news_list_item .item_headline .item_msg span {
        float: left;
        display: inline-block;
        height: 15px;
        line-height: 16px;
        font-size: 12px;
        font-family: "SimSun";
        color: #666;
    }

    .news_list_item .item_headline .item_msg span:nth-of-type(1) {
        margin-right: 20px;
    }

    .news_list_item .item_headline .item_msg .unlike {
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

    .news_list_item .item_headline .item_msg .unlike b {
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

    .news_list_item .item_headline .item_msg .unlike em {
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

    .news_list_item .item_headline .item_msg .unlike:hover {
        background: #0082C6;
        width: 73px;
        height: 22px;
    }

    .news_list_item .item_headline .item_msg .unlike:hover b {
        background: url(~@/assets/web/index_icon.png) no-repeat -39px -56px;
    }

    .news_list_item .item_headline .item_msg .hot_token {
        /* background: url(~@/assets/web/index_icon.png) no-repeat 0 -59px; */
    }


    .news_list_item .item_headline .promotion a {
        display: block;
    }

    .news_list_item .item_headline .promotion img {
        width: 100%;
    }

    .top-token {
        background: #0082C6;
        color: white !important;
        padding: 0px 5px;
    }

    .news_list_item a {
        cursor: pointer;
    }

    @media screen and (-ms-high-contrast: active),
    (-ms-high-contrast: none) {
        .news_list_item .item_headline .item_msg i {
            line-height: 12px;
        }
    }



    .new_list img {
        background: url("~@/assets/web/lazy-loading.png") no-repeat center center;
        background-size: 100% 100%;
        /* background:#bfbfbf; */
        height: 116px;
    }

    .new_list img[lazy=loaded] {
        background: transparent;
        height: auto;
    }

    /*标签*/

    .tag {
        overflow: hidden;
        margin-top: 1px;
    }

    .news_list_item .item_headline .item_msg .tag>.margin-none {
        margin: 0;
    }

    .tag>li {
        list-style: none;
        float: left;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
        font-family: "SimSun";
        color: #666;
    }

    .tag>li>a {
        /*color: #444;*/
        color: #666;
    }

    .tag>li.tag-item {
        cursor: pointer;
        margin-right: 15px;
    }

    .tag>li.tag-item.active a {
        color: #0082c6;
    }

    .tag>li.tag-item a:hover {
        color: #0082c6;
    }

    .tag-inline {
        display: inline;
        margin-left: 25px;
    }

    .tag-inline>li:first-child {
        margin-left: 30px;
    }

    .tag-block {
        margin-top: 10px;
        overflow: hidden;
        max-width: 100%;
        height: 16px;
    }

    .over-hidden {
        overflow: hidden;
        height: 16px;
    }
</style>