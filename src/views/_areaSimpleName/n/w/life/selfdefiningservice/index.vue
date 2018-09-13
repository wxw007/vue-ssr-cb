<template>
    <indexTemplate>
        <infiniteScroll @loadMore="loadMore">
            <list :selfdefiningServiceList="selfdefiningServiceList"></list>
        </infiniteScroll>
    </indexTemplate>
</template>
<script>
    import { mapState } from 'vuex'
    import list from "./base/list.vue"
    import indexTemplate from '../base/layouts/index-template-lifeservice.vue'
    import selfdefiningServiceIndex from '@/store/modules/web/life/selfdefiningservice/index.js'


    export default {
        storeModule() {
            return { selfdefiningServiceIndex };
        },
        asyncData({ store, route, query }) {
            return store.dispatch("selfdefiningServiceIndex/fetchSelfdefiningService");
        },
        computed: {
            ...mapState("selfdefiningServiceIndex", ["selfdefiningServiceList"])
        },
        components: {
            indexTemplate,
            list,
            infiniteScroll: () => import('../../base/common/infinite-scroll.vue')
        },
        methods: {
            loadMore(callback) {
                callback(this.$store.dispatch("selfdefiningServiceIndex/fetchMore"));
            }
        }
    };
</script>