<template>
    <div>
        <pageHeader></pageHeader>
        <div id="index_content" class="content clearfloat" style="position:relative;">
            <div id="side_left">
                <leftLogo></leftLogo>
                <affix>
                    <subscription :infoTypeList="subscriptionList" :unSubscriptionList="unSubscriptionList"></subscription>
                </affix>
            </div>
            <div class="not-found-box">
                <div class="not-found-txt">
                    <h1>出错啦...</h1>
                    <p>建筑物维修中，找不到您请求的网页</p>
                    <a href="/">
                        <span>返回首页</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /** 
     * 
     */
    import { mapState } from 'vuex'
    import leftLogo from "./base/left-aside/left-logo.vue"
    import subscription from "./base/left-aside/subscription.vue"
    import affix from './base/common/affix.vue'
    import pageHeader from "./base/header/header.vue"
    import web404 from '@/store/modules/web/404.js'
    export default {
        storeModule() {
            return { web404 };
        },
        asyncData({ store }) {
            return store.dispatch("web404/fetchData");
        },
        computed: {
            ...mapState("web404", ["subscriptionList", "unSubscriptionList"])
        },
        components: {
            pageHeader,
            leftLogo,
            affix,
            subscription
        }
    };
</script>
<style>
    html,
    body,
    #app,
    #app>div {
        width: 100%;
        height: 100%;
    }

    #index_content {
        height: 100%;
    }

    .not-found-box {
        position: absolute;
        width: 74.16667%;
        height: 670px;
        margin: auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: url("~@/assets/web/404bg.png") no-repeat center center;
        background-size: 100%;
    }

    .not-found-txt {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 500px;
        height: 186px;
    }

    .not-found-txt h1 {
        font-size: 36px;
        color: #000;
        line-height: 1;
        margin-bottom: 29px;
    }

    .not-found-txt p {
        font-size: 30px;
        color: #000;
        line-height: 1;
    }

    .not-found-txt a {
        display: block;
        width: 300px;
        height: 60px;
    }

    .not-found-txt a span {
        display: block;
        width: 300px;
        height: 60px;
        line-height: 60px;
        font-size: 30px;
        color: #fff;
        background: #0082C6;
        text-align: center;
        margin-top: 34px;
    }
</style>