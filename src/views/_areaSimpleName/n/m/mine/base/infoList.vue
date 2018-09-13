<template>
    <div class="index-news-list container">
        <div class=" index-padding cborder clearfix" v-for="info,index in infoList" :key="index" @click="to(info)">
            <template v-if="info.aiId != null ">
                <!-- 广告 -->
                <template v-if="info.isPromotion == '1'">
                    <div class="index-title two-row-text" v-html="info.aiTitle"></div>
                    <div class="index-img-warp clearfix">
                        <img :src="info.infoImage" alt="">
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
                            <img :src="info.infoImage">
                        </div>
                        <div class="index-img index-img-middle fl">
                            <img :src="info.infoImageSecond">
                        </div>
                        <div class="index-img fl">
                            <img :src="info.infoImageThirdly">
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
                        <img :src="info.infoImage">
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
                    <img :src="info.infoImage" alt="">
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
                    <img :src="info.infoImage" alt="">
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
                        <img :src="info.infoImage">
                    </div>
                    <div class="index-img index-img-middle fl">
                        <img :src="info.infoImageSecond">
                    </div>
                    <div class="index-img fl">
                        <img :src="info.infoImageThirdly">
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
                    <img :src="info.infoImage">
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
        </div>
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
    props: {
        infoList: {
            default () {
                return [];
            }
        }
    },
    methods:{
    	to(info){
    		window.location.href = info.url || info.infoDetailUrl
    	},
        delSame(){
            
        }
    },
    filters: {
        timezoneconvert
    }
}
</script>
<style scoped>
.container{
	padding: 0 .3rem 0 .3rem;
    -webkit-tap-highlight-color: transparent;
}
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