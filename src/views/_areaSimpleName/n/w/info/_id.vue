<template>
    <div>
        <pageHeader></pageHeader>
        <div id="index_content" class="content clearfloat">
            <div class="detail_left">
                <blueHeadline text="分享"></blueHeadline>
                <shareBtn></shareBtn>
            </div>
            <div id="content_area">
                <newsSection v-if="info != null" :info="info" :infoType="infoType"></newsSection>
                <crrelationList v-if="showCrrelationList" :crrelationList="crrelationList"></crrelationList>
                <comment></comment>
                <recommendedColumnNews :subscriptionList="subscriptionList"></recommendedColumnNews>

            </div>
            <div id="side_right">
                <theLatestNews :newestInfoList="newestInfoList" v-if="showLatestNews"></theLatestNews>
                <theHotNews :hottestInfoList="hottestInfoList" v-if="showHotNews"></theHotNews>
                <adBox style="margin-top:0;" :adList="adList"></adBox>
                <downloadBox></downloadBox>
                <aboutusBox></aboutusBox>
            </div>
            <shortcutBtn :isReload="false"></shortcutBtn>
        </div>
    </div>
</template>
<script>
    /** 
     * 新闻详情页
     * 
     * @author jiemin
     * @author wzw 
     * @since 2017-12-20
     */
    import { mapState } from 'vuex'
    import pageHeader from "../base/header/header.vue";
    import blueHeadline from "../base/common/blue-headline.vue";
    import shareBtn from "../base/left-aside/share-btn.vue";
    import newsSection from "./base/_id/news_section.vue";
    import comment from "./base/_id/comment.vue";
    import recommendedColumnNews from "./base/_id/recommended-column-news.vue";
    import crrelationList from "./base/_id/crrelation-list.vue";
    import shortcutBtn from "../base/common/shortcut_btn.vue";
    import downloadBox from "../base/right-aside/download_box.vue";
    import aboutusBox from "../base/right-aside/aboutus_box.vue";
    import adBox from "../base/right-aside/ad-box.vue";
    import theLatestNews from "../base/right-aside/the-latest-news.vue";
    import theHotNews from "../base/right-aside/the-hot-news.vue";
    import newsList from "../base/index/news-list.vue";

    // import '@/util/plugins/swiper'
    import '@/util/plugins/lazyload'

    import infoDetail from '@/store/modules/web/info/_id.js'

    export default {
        storeModule() {
            return { infoDetail };
        },
        asyncData({ store, route }) {
            return store.dispatch("infoDetail/fetchData");
        },
        mounted() {
            this.$store.dispatch("infoDetail/getCrrelationList", { id: this.$route.params.id });
            this.$store.dispatch("infoDetail/getAdList", { id: this.$route.params.id });
        },
        computed: {
            ...mapState("infoDetail", ["areaconfig", "info", "bannerList", "adList", "infoType",
                "hottestInfoList", "subscriptionList", "newestInfoList", "crrelationList"]),
            showCrrelationList() {// 是否显示相关新闻
                return this.crrelationList != null && this.crrelationList.length > 0;
            },
            showLatestNews() {// 是否显示最新新闻
                return this.newestInfoList != null && this.newestInfoList.length > 0;
            },
            showHotNews() {// 是否显示热门排行 
                return this.hottestInfoList != null && this.hottestInfoList.length > 0;
            }
        },
        components: {
            pageHeader,
            blueHeadline,
            shareBtn,
            newsSection,
            comment,
            crrelationList,
            recommendedColumnNews,
            shortcutBtn,
            downloadBox,
            aboutusBox,
            adBox,
            theLatestNews,
            theHotNews,
            newsList
        }
    };
</script>