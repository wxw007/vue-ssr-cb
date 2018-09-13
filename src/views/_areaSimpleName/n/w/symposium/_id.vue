<template>
    <div>
        <pageHeader></pageHeader>
        <div id="index_content" class="content clearfloat">
            <div class="detail_left">
                <blueHeadline :text="text"></blueHeadline>
                <shareBtn></shareBtn>
            </div>
            <div id="content_area" class="">
                <specialNewsDetailSection :symposium="symposium" :symposiumClassList="symposiumClassList" :symposiumImgList="symposiumImgList"></specialNewsDetailSection>

                <div v-for="symposiumClass in symposiumClassList" :key="symposiumClass.symposiumclassId">
                    <div class="blue_header clearfloat">
                        <h3 :id="symposiumClass.symposiumclassName">{{symposiumClass.symposiumclassName}}</h3>
                        <!-- <a href="####">更多</a> -->
                    </div>
                    <newsList :infosMap="symposiumClass.infosMap"></newsList>
                </div>
            </div>
            <div id="side_right">
                <adBox style="margin-top:0;"></adBox>
                <downloadBox></downloadBox>
                <aboutusBox></aboutusBox>
            </div>
            <shortcutBtn :isReload.sync="isReload"></shortcutBtn>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'

    import pageHeader from "../base/header/header.vue";
    import blueHeadline from "../base/common/blue-headline.vue";
    import shareBtn from "../base/left-aside/share-btn.vue";
    import specialNewsDetailSection from "./base/_id/special-news-detail-section.vue";
    import shortcutBtn from "../base/common/shortcut_btn.vue";
    import downloadBox from "../base/right-aside/download_box.vue";
    import aboutusBox from "../base/right-aside/aboutus_box.vue";
    import friendlyLinkBox from "../base/right-aside/friendly_link_box.vue";
    import adBox from "../base/right-aside/ad_box.vue";
    import rateBox from "../base/right-aside/rate_box.vue";
    import newsList from "../base/index/news-list.vue";

    import '@/util/plugins/lazyload'
    import '@/util/plugins/swiper'

    import { getSymposiumInfoList } from '@/api/web'
    import symposiumDetail from '@/store/modules/web/symposium/_id.js'
    import { insertUrlForInfoList } from '@/store/modules/web/base/url/info-url-utils.js'

    export default {
        storeModule() {
            return { symposiumDetail };
        },
        asyncData({ store, params, query }) {
            return store.dispatch("symposiumDetail/fetchData");
        },
        data() {
            return {
                isReload: false, //控制刷新按钮是否显示
                text: "分享"
            };
        },
        computed: {
            ...mapState("symposiumDetail", ["symposium", "symposiumClassList", "symposiumImgList"])
        },
        components: {
            pageHeader,
            blueHeadline,
            shareBtn,
            specialNewsDetailSection,
            shortcutBtn,
            downloadBox,
            aboutusBox,
            adBox,
            newsList
        },
        beforeMount() {
            let route = this.$route;
            this.symposiumClassList.forEach(symposiumClass => {
                let params = {};
                if (route.params.id) {
                    params.symposiumId = route.params.id;
                }
                if (route.query.fromInfoId) {
                    params.fromInfoId = route.query.fromInfoId;
                }
                params.symposiumclassId = symposiumClass.symposiumclassId;
                getSymposiumInfoList(params).then(response => {
                    let result = response.data;
                    if (result.success) {
                        let infoList = result.data;
                        if (infoList != null) {
                            insertUrlForInfoList(infoList, this.$store.state.request.url, true);
                        }
                        this.$set(symposiumClass, "infosMap", { infoList: result.data })
                    }
                });

            });
        }
    };
</script>