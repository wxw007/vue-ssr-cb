<template>
    <div class="index-list" v-show="show">
        <loadmore @loadTop="refreshMore" @loadBottom="loadMore" ref="loadmore">
            <bannerList :bannerList="bannerList"></bannerList>
            <div class="inner" style="padding-bottom: 0rem;">
                <flashNewsList :list="flashNewsList"></flashNewsList>
                <newsList :infoList="stickInfoList" v-if="showStickInfoList"></newsList>
                <newsList :infoList="infoList"></newsList>
            </div>
        </loadmore>
    </div>
</template>
<script>
    /** 
     *  
     * @author wzw
     * @since 2018-02-11 16:24
     */
    import { mapState } from 'vuex'
    import infoIndex from "@/store/modules/m/index/index.js"
    import newsList from "../base/index/news-list.vue"
    import bannerList from "../base/index/banner-list.vue"
    import flashNewsList from "../base/index/flash-news-list.vue"

    let cache = {};
    const browser = process.browser;

    export default {
        storeModule() {
            return { infoIndex };
        },
        clientCache({ store, route, params, query }) {
            let curInfoTypeId = query.infoTypeId || "default";
            return cache[curInfoTypeId] != null;
        },
        asyncData({ store, route, params, query }) {
            if (browser) {
                let rootState = store.state;
                let state = store.state["infoIndex"];
                if (rootState.route.path == rootState.request.url) {
                    let curInfoTypeId = rootState.route.query.infoTypeId || "default";
                    let data = {};
                    for (let key in state) {
                        data[key] = state[key];
                    }
                    cache[curInfoTypeId] = {
                        data: { success: true, data, head: { title: rootState.title, meta: rootState.meta } }
                    };
                    let toInfoTypeId = rootState.request.query.infoTypeId || "default";
                    if (cache[toInfoTypeId]) {
                        let result = cache[toInfoTypeId].data;
                        store.commit("infoIndex/refreshData", result.data);
                        return Promise.resolve(cache[toInfoTypeId]);
                    }
                }
            }
            store.commit("infoIndex/setShow", false);
            return store.dispatch("infoIndex/fetchData")
                .then(response => {
                    store.commit("infoIndex/setShow", true);
                    return response;
                });
        },
        computed: {
            ...mapState("infoIndex", ["infoList", "stickInfoList", "bannerList", "flashNewsList", "show"]),
            showStickInfoList() {
                return this.stickInfoList != null && this.stickInfoList.length > 0;
            }
        },
        watch: {
            "$route": 'reset'
        },
        components: {
            newsList,
            bannerList,
            flashNewsList
        },
        methods: {
            loadMore(callback) {
                callback("infoIndex/fetchMore", this.infoList);
            },
            refreshMore(callback) {
                callback("infoIndex/refreshMore", this.infoList);
            },
            reset() {
                this.$refs.loadmore.reset();
            }
        }
    }
</script>