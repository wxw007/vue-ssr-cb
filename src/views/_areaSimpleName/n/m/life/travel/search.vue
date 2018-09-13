<template>
    <div class="container">
        <div class="life">
            <searchBox></searchBox>
            <div class="inner">
                <infiniteScroll @loadBottom="loadMore">
                    <list :list="list"></list>
                </infiniteScroll>
            </div>
        </div>
        <css></css>
    </div>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-02-06 16:59
     */
    import { mapState } from "vuex"
    import travelSearch from "@/store/modules/m/life/travel/search.js"

    import list from './base/list.vue'
    import searchBox from "../base/search-box.vue"
    import '../../base/common/global.js'
    import '../../base/common/list.js'
    export default {
        storeModule() {
            return { travelSearch };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("travelSearch/fetchData");
        },
        computed: {
            ...mapState("travelSearch", ["list"])
        },
        components: {
            list,
            searchBox
        },
        methods: {
            loadMore(callback) {
                callback("travelSearch/fetchMore", this.list);
            }
        }
    }
</script>