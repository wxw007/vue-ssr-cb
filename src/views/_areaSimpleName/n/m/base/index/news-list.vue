<template>
    <div class="index-news-list">
        <touch-link tag="div" class=" index-padding cborder clearfix" v-for="info in infoList" :key="info.infoCentreId" @click.native="saveHistory(info)">
            <template v-if="info.aiId != null ">
                <!-- 广告 -->
                <template v-if="info.isPromotion == '1'">
                    <div class="index-title two-row-text" v-html="info.aiTitle"></div>
                    <div class="index-img-warp clearfix">
                        <img v-lazy="info.infoImage" alt="">
                    </div>
                    <div class="index-bottom no-pl">
                        <div class="list-logo white" v-if="info.aiCompanyName != null && info.aiCompanyName != ''">
                            {{info.aiCompanyName}}
                        </div>
                    </div>
                </template>
                <template v-else-if="info.infoImageThirdly != null">
                    <div class="index-title two-row-text" v-html="info.aiTitle"></div>
                    <div class="index-img-warp clearfix">
                        <div class="index-img fl">
                            <img v-lazy="info.infoImage">
                        </div>
                        <div class="index-img index-img-middle fl">
                            <img v-lazy="info.infoImageSecond">
                        </div>
                        <div class="index-img fl">
                            <img v-lazy="info.infoImageThirdly">
                        </div>
                    </div>
                    <div class="index-bottom no-pl">
                        <div class="list-logo white" v-if="info.aiCompanyName != null && info.aiCompanyName != ''">
                            {{info.aiCompanyName}}
                        </div>
                    </div>
                </template>
                <template v-else-if="info.infoImage != null">
                    <div class="index-one-left fl">
                        <div class="index-title two-row-text" v-html="info.aiTitle"></div>
                        <div class="index-bottom index-bottom-padtop no-pl">
                            <div class="list-logo white" v-if="info.aiCompanyName != null && info.aiCompanyName != ''">
                                {{info.aiCompanyName}}
                            </div>
                        </div>
                    </div>
                    <div class="index-one-right fr">
                        <img v-lazy="info.infoImage">
                    </div>
                </template>
                <template v-else>
                    <div class="index-two-left fl">
                        <div class="index-title two-row-text" v-html="info.aiTitle"></div>
                        <div class="index-bottom index-bottom-padtop  no-pl">
                            <div class="list-logo white" v-if="info.aiCompanyName != null && info.aiCompanyName != ''">
                                {{info.aiCompanyName}}
                            </div>
                        </div>
                    </div>
                </template>
            </template>
            <template v-else-if="info.infoType == '2'">
                <!-- 视频新闻 -->
                <div class="index-title two-row-text" v-html="info.infoTitle"></div>
                <div class="index-img-warp clearfix vedio-token">
                    <img v-lazy="info.infoImage" alt="">
                </div>
                <div class="index-bottom no-pl">
                    <div class="list-logo blue" v-if="info.isStick == '1'">
                        置顶
                    </div>
                    <div class="list-logo green" v-if="info.symposiumLogoName">
                        {{info.symposiumLogoName}}
                    </div>
                    <div class="list-logo gray">
                        视频
                    </div>
                    <div class="index-author">{{info.quoteFrom}}</div>
                    <div class="index-time">
                        {{info.infoStartTime | timezoneconvert}}
                    </div>
                </div>
            </template>
            <template v-else-if="info.isPromotion == '1'">
                <!-- 推广新闻 -->
                <div class="index-title two-row-text" v-html="info.infoTitle"></div>
                <div class="index-img-warp clearfix">
                    <img v-lazy="info.infoImage" alt="">
                </div>
                <div class="index-bottom no-pl">
                    <div class="list-logo blue" v-if="info.isStick == '1'">
                        置顶
                    </div>
                    <div class="list-logo green" v-if="info.symposiumLogoName">
                        {{info.symposiumLogoName}}
                    </div>
                    <div class="list-logo gray">
                        {{info.promotionName}}
                    </div>
                    <div class="index-author" v-if="info.quoteFrom">{{info.quoteFrom}}</div>
                    <div class="index-time">
                        {{info.infoStartTime | timezoneconvert}}
                    </div>
                </div>
            </template>
            <template v-else-if="info.infoImageThirdly != null">
                <!-- 三图新闻 -->
                <div class="index-title two-row-text" v-html="info.infoTitle"></div>
                <div class="index-img-warp clearfix">
                    <div class="index-img fl">
                        <img v-lazy="info.infoImage">
                    </div>
                    <div class="index-img index-img-middle fl">
                        <img v-lazy="info.infoImageSecond">
                    </div>
                    <div class="index-img fl">
                        <img v-lazy="info.infoImageThirdly">
                    </div>
                </div>
                <div class="index-bottom no-pl">
                    <div class="list-logo blue" v-if="info.isStick == '1'">
                        置顶
                    </div>
                    <div class="list-logo green" v-if="info.symposiumLogoName">
                        {{info.symposiumLogoName}}
                    </div>
                    <div class="index-author" v-if="info.quoteFrom">{{info.quoteFrom}}</div>
                    <div class="index-time">
                        {{info.infoStartTime | timezoneconvert}}
                    </div>
                </div>
            </template>
            <template v-else-if="info.infoImage != null">
                <!-- 单图新闻 -->
                <div class="index-one-left fl">
                    <div class="index-title two-row-text" v-html="info.infoTitle"></div>
                    <div class="index-bottom index-bottom-padtop no-pl">
                        <div class="list-logo blue" v-if="info.isStick == '1'">
                            置顶
                        </div>
                        <div class="list-logo green" v-if="info.symposiumLogoName">
                            {{info.symposiumLogoName}}
                        </div>
                        <div class="index-author" v-if="info.quoteFrom">{{info.quoteFrom}}</div>
                        <div class="index-time">
                            {{info.infoStartTime | timezoneconvert}}
                        </div>
                    </div>
                </div>
                <div class="index-one-right fr">
                    <img v-lazy="info.infoImage">
                </div>
            </template>
            <template v-else>
                <!-- 无图新闻 -->
                <div class="index-two-left fl">
                    <div class="index-title two-row-text" v-html="info.infoTitle"></div>
                    <div class="index-bottom index-bottom-padtop  no-pl">
                        <div class="list-logo blue" v-if="info.isStick == '1'">
                            置顶
                        </div>
                        <div class="list-logo green" v-if="info.symposiumLogoName">
                            {{info.symposiumLogoName}}
                        </div>
                        <div class="index-author" v-if="info.quoteFrom">{{info.quoteFrom}}</div>
                        <div class="index-time">
                            {{info.infoStartTime | timezoneconvert}}
                        </div>
                    </div>
                </div>
            </template>
        </touch-link>
    </div>
</template>
<script>
/** 
 * 
 * @author wzw
 * @since 2018-02-05 20:47
 */
import timezoneconvert from '@/util/filter/timezoneconvert'
export default {
    name: "wei-news-list",
    props: {
        infoList: {
            default () {
                return [];
            }
        }
    },
    methods: {
        to(url) {
            window.location = url;
        },
        saveHistory(info) {
            let infoString = JSON.stringify(info);
            let arr1 = localStorage.historyList ? JSON.parse(localStorage.historyList) : [];
            let localString = JSON.stringify(arr1);
            if (arr1.length == 0) {
                arr1.push(info);
                localStorage.setItem('historyList', JSON.stringify(arr1));
            } else if (localString.indexOf(infoString) > -1) {
                let a = localString.replace(infoString, '').replace('[,','[').replace(',]',']');
                console.log(a)
                let b = JSON.parse(a)
                b.unshift(info);
                localStorage.setItem('historyList', JSON.stringify(b));
            } else {
                arr1.unshift(info)
                console.log(arr1)
                localStorage.setItem('historyList', JSON.stringify(arr1));
            }
            window.location.href = info.url

        },
        // saveHistory(info){
        //     let arr1 = localStorage.historyList ? JSON.parse(localStorage.historyList) : [];
        //     arr1.unshift(info);
        //     localStorage.setItem('historyList', JSON.stringify(arr1));
        //     window.location.href = info.url
        // }
    },
    filters: {
        timezoneconvert
    }
}
</script>
<style>
.list-logo {
    display: inline-block;
    margin-right: .2rem;
    height: .28rem;
    border-radius: 2px;
    line-height: .28rem;
    font-size: 0.2rem;
    padding: 0 0.10rem;
}

.list-logo.blue {
    background: #1c96d5;
    color: white;
}

.list-logo.green {
    background: #0c9;
    color: white;
}

.list-logo.gray {
    background: #9fbccc;
    color: white;
}

.list-logo.white {
    background: #fff;
    color: #0f929c;
    border: 1px solid #0f929c;
}

.vedio-token {
    position: relative;
    overflow: hidden;
}

.vedio-token:before {
    content: "";
    display: block;
    position: absolute;
    width: 1.08rem;
    height: 1.08rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: url(~@/assets/m/images/video-play-btn-icon.png) no-repeat center center;
    background-size: 100% 100%;
}

.index-author {
    max-width: 2.1rem;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
}
</style>