<template>
    <indexTemplate>
        <infiniteScroll @loadMore="loadMore">
            <list :symposiumList="symposiumList"></list>
        </infiniteScroll>
    </indexTemplate>
</template>
<script>
    /** 
     * 专题首页
     * @author jiemin
     * @author wzw
     * @date 2017-12-20
     */
    import { mapState } from 'vuex'
    import indexTemplate from '../base/layouts/indexTemplate.vue'
    import list from "./base/index/list.vue"
    import symposiumIndex from '@/store/modules/web/symposium/index'
    export default {
        storeModule() {
            return { symposiumIndex };
        },
        asyncData({ store, route }) {
            return store.dispatch("symposiumIndex/fetchData");
        },
        computed: {
            ...mapState("symposiumIndex", ["symposiumList"])
        },
        components: {
            indexTemplate,
            list,
            infiniteScroll: () => import('../base/common/infinite-scroll.vue')
        },
        methods: {
            loadMore(callback) {
                callback(this.$store.dispatch("symposiumIndex/fetchMore"));
            }
        }
    };
</script>