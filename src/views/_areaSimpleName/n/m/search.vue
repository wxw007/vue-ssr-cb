<template>
    <div class="container">
        <div class="life">
            <searchBox></searchBox>
            <div class="inner">
                <infiniteScroll @loadBottom="loadMore">
                    <list :infoList="list"></list>
                </infiniteScroll>
            </div>
        </div>
        <css></css>
    </div>
</template>
<script>
    /** 
     * 新闻搜索页
     * @author wzw
     * @since 2018-02-06 
     */
    import { mapState } from "vuex"
    import infoSearch from "@/store/modules/m/search.js"

    import list from './base/index/news-list.vue'
    import searchBox from "./life/base/search-box.vue"

    import './base/common/list.js'
    import './base/common/global.js'

    export default {
        storeModule() {
            return { infoSearch };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("infoSearch/fetchData");
        },
        computed: {
            ...mapState("infoSearch", ["list"])
        },
        components: {
            list,
            searchBox
        },
        methods: {
            loadMore(callback) {
                callback("infoSearch/fetchMore", this.list);
            }
        }
    }
</script>