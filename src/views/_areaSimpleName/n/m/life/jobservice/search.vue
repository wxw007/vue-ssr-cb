<template>
    <div class="container">
        <!--生活搜索-->
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
    import jobServiceSearch from "@/store/modules/m/life/jobservice/search.js"

    import list from './base/list.vue'
    import searchBox from "../base/search-box.vue"
    import '../../base/common/global.js'
    import '../../base/common/list.js'
    export default {
        storeModule() {
            return { jobServiceSearch };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("jobServiceSearch/fetchData");
        },
        computed: {
            ...mapState("jobServiceSearch", ["list"])
        },
        components: {
            list,
            searchBox
        },
        methods: {
            loadMore(callback) {
                callback("jobServiceSearch/fetchMore", this.list);
            }
        }
    }
</script>