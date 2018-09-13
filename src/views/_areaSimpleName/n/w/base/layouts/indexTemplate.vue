<template>
    <div>
        <pageHeader></pageHeader>
        <div id="index_content" class="content clearfloat">
            <div id="side_left">
                <leftLogo></leftLogo>
                <affix>
                    <subscription :infoTypeList="subscriptionList" :unSubscriptionList="unSubscriptionList"></subscription>
                </affix>
            </div>
            <div id="content_area">
                <div class="news_content" style="display:block">
                    <slot>
                    </slot>
                </div>
            </div>
            <div id="side_right">
                <searchBox :searchPageUrl="searchInfoUrl"></searchBox>
                <lifeBox :lifeModuleList="lifeModuleList"></lifeBox>
                <adBox :bannerList="bannerList"></adBox>
                <imgNewsBox :imgInfoList="imgInfoList"></imgNewsBox>
                <downloadBox :embassy="embassy" :showAffix="isShowDownloadAffix"></downloadBox>
                <rateBox></rateBox>
                <authoritativeRecommendLinkBox :authoritativeRecommendationMap="authoritativeRecommendationMap"></authoritativeRecommendLinkBox>
                <friendlyLinkBox :friendlyLinkMap="friendlyLinkMap"></friendlyLinkBox>
                <aboutusBox></aboutusBox>
                <affix @on-change="showDownloadBoxAffix">
                    <div></div>
                </affix>
            </div>
            <shortcutBtn :isReload="showRefreshBtn" @refresh="refresh"></shortcutBtn>
        </div>
    </div>
</template>
<script>
    /** 
     * 首页模板
     * 
     * @author jiemin
     * @author wzw
     * @date 2017-12-20
     */
    import { mapState } from 'vuex'
    import pageHeader from "../header/header.vue"
    import leftLogo from "../left-aside/left-logo.vue"
    import subscription from "../left-aside/subscription.vue"
    import shortcutBtn from "../common/shortcut_btn.vue"
    import downloadBox from "../right-aside/download_box.vue"
    import aboutusBox from "../right-aside/aboutus_box.vue"
    import authoritativeRecommendLinkBox from "../right-aside/authoritative-recommend-link-box.vue"
    import friendlyLinkBox from "../right-aside/friendly_link_box.vue"
    import lifeBox from "../right-aside/life_box.vue"
    import adBox from "../right-aside/ad_box.vue"
    import imgNewsBox from "../right-aside/img_news_box.vue"
    import rateBox from "../right-aside/rate_box.vue" // 汇率
    import searchBox from "../right-aside/search_box.vue"
    import affix from '../common/affix.vue'

    // import '@/util/plugins/swiper.js'
    import '@/util/plugins/lazyload.js'

    import infoIndexTemplate from '@/store/modules/web/base/layouts/info-index-template.js'
    import { resolveUrl } from "@/util/common/url.js"

    export default {
        props: {
            showRefreshBtn: {
                default: false
            }
        },
        storeModule() {
            return { infoIndexTemplate };
        },
        data() {
            return {
                isShowDownloadAffix: false
            };
        },
        computed: {
            ...mapState("infoIndexTemplate", ["embassy", "lifeModuleList", "authoritativeRecommendationMap", "friendlyLinkMap", "imgInfoList", "bannerList", "subscriptionList", "unSubscriptionList"]),
            searchInfoUrl() {
                return resolveUrl(this.$store, "/n/w/info/search")
            }
        },
        components: {
            pageHeader,
            leftLogo,
            subscription,
            shortcutBtn,
            downloadBox,
            aboutusBox,
            authoritativeRecommendLinkBox,
            friendlyLinkBox,
            lifeBox,
            adBox,
            imgNewsBox,
            rateBox,
            searchBox,
            affix
        },
        methods: {
            refresh() {
                this.$emit("refresh");
            },
            showDownloadBoxAffix(affix) {
                this.isShowDownloadAffix = affix;
            }
        }
    };
</script>