<template>
    <indexTemplate>
        <infiniteScroll @loadMore="loadMore">
            <list :jobServiceList="jobServiceList"></list>
        </infiniteScroll>
    </indexTemplate>
</template>
<script>
    import { mapState } from 'vuex'

    import list from "./base/list.vue";
    import jobServiceIndex from '@/store/modules/web/life/jobservice/index.js'

    import indexTemplate from '../base/layouts/index-template-lifeservice.vue'

    export default {
        storeModule() {
            return { jobServiceIndex };
        },
        asyncData({ store, route, query }) {
            return store.dispatch("jobServiceIndex/fetchData");
        },
        computed: {
            ...mapState("jobServiceIndex", ["jobServiceList"])
        },
        components: {
            list,
            indexTemplate,
            infiniteScroll: () => import('../../base/common/infinite-scroll.vue')
        },
        methods: {
            loadMore(callback) {
                callback(this.$store.dispatch("jobServiceIndex/fetchMore"));
            }
        }
    };
</script>