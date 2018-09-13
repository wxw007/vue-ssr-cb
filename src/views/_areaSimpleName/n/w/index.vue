<template>
    <indexTemplate :showRefreshBtn="true" @refresh="refreshMore">
        <hotNews v-if="hotInfoList != null && hotBannerInfoList != null" :hotInfoList="hotInfoList" :hotBannerInfoList="hotBannerInfoList"></hotNews>
        <div class="loading" v-show="loading" id="loadingtest"> </div>
        <newsList :infosMap="{'infoList':stickInfoList}" v-if="showStickInfoList"></newsList>
        <infiniteScroll @loadMore="loadMore">
            <newsList :infosMap="infosMap"></newsList>
        </infiniteScroll>
    </indexTemplate>
</template>
<script>
    /** 
     * 首页
     * @author jiemin
     * @author wzw
     * @date 2017-12-20
     */
    import { mapState } from 'vuex'

    import indexTemplate from './base/layouts/indexTemplate.vue'
    import hotNews from "./base/index/hot-news.vue"
    import newsList from "./base/index/news-list.vue"
    import infiniteScroll from './base/common/infinite-scroll.vue'
    import infoIndex from '@/store/modules/web/index'

    export default {
        storeModule() {
            return { infoIndex };
        },
        asyncData({ store, query }) {
            return store.dispatch("infoIndex/fetchData");
        },
        data() {
            return {
                loading: false
            }
        },
        computed: {
            ...mapState("infoIndex", ["hotBannerInfoList", "hotInfoList", "infosMap", "stickInfoList"]),
            showStickInfoList() {
                return this.stickInfoList != null && this.stickInfoList.length > 0;
            }
        },
        components: {
            indexTemplate,
            newsList,
            hotNews,
            infiniteScroll
        },
        methods: {
            loadMore(callback) {
                callback(this.$store.dispatch("infoIndex/fetchMore"))
            },
            refreshMore() {
                window.scrollTo(0, 0);
                this.loading = true;
                this.$store.dispatch("infoIndex/refreshMore")
                    .then(response => {
                        this.loading = false;
                    })
            }
        }
    };
</script>

<style>
    .loading {
        background: url("~@/assets/web/loading.gif") center center;
        background-repeat: no-repeat;
        height: 15px;
        margin-top: 20px;
    }
</style>