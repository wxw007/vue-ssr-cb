<template>
    <div>
        <mine-top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow"></mine-top>
        <div class="list">
            <ul>
                <li>
                   <div class="info">
                        <img class="info-img" :src="travelItem.travelImg" alt="" @click="gotoUrl">
                        <div class="info-text">
                            <div class="info-title" @click="gotoUrl">{{travelItem.travelTitle}}</div>
                            <div class="info-time">{{travelItem.inputTime | timezoneconvert}}</div>
                        </div>
                    </div>
                     <div class="reply">
                        <div class="reply-content">{{travelItem.replyContent}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
/** 
 * 个人中心-旅游订单
 * @author wxw
 * @since 2018-07-02 16:47
 */
import timezoneconvert from '@/util/filter/timezoneconvert'
import { resolveUrl } from '@/util/common/url.js'
import footTab from "../../base/foot/foot-tab.vue"
import mineTop from "../base/mine-top.vue"

export default {
    components: {
        footTab,
        mineTop
    },
    filters: {
        timezoneconvert
    },
    data() {
        return {
            mineTop: {
                topTitle: '旅游订单详情',
                back: true,
                shadow: true
            },
            travelItem:''
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData(){
            this.travelItem = JSON.parse(sessionStorage.travelItem)
        },
        gotoUrl(){
            window.location.href = this.travelItem.url
        }
    }
}
</script>
<style src="../../base/static/css/base.css"></style>
<style src="../../base/static/css/themes.css"></style>
<style scoped lang="less">
@font26: .26rem;
* {
    padding: 0;
    margin: 0;
    box-sizing: content-box;
}

.list {
    ul {

        li {
    padding: 0 .3rem;
            .info {
                padding: .2rem 0;
                overflow: hidden;
                border-bottom: 1px solid #e8e8e8;
                    position: relative;

                .info-img {
                    width: 1.72rem; // height: 1.34rem;
                    border-radius: .04rem;
                    float: left;
                    margin-right: .3rem;
                }
                .info-text {
                    overflow: hidden;
                    .info-title {
                        font-size: .34rem;
                        color: #17191a;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .info-time {
                        // position: absolute;
                        font-size: .28rem;
                        color: #879399;
                        bottom: .15rem;
                        text-align: right;
                    }
                }
            }
             .reply{
                    .reply-content{
                        line-height: 1.5;
                        margin-top: .4rem;
                        font-size: .28rem;
                        color: #18191b;
                        &::before{
                            content: '';
                            width: .34rem;
                            height: .34rem;
                            display: inline-block;
                            margin-right: .1rem;
                            background: url(~@/assets/m/images/reply-icon.png);
                            background-size: cover;
                            vertical-align: sub;
                        }
                    }
                }
           
        }
    }
}
</style>