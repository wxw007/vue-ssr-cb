<template>
    <indexTemplate>
        <infiniteScroll @loadMore="loadMore">
            <list :recruitServiceList="recruitServiceList"></list>
        </infiniteScroll>
    </indexTemplate>
</template>
<script>
    import { mapState } from 'vuex'
    import list from "./base/list.vue"
    import indexTemplate from '../base/layouts/index-template-lifeservice.vue'
    import recruitServiceIndex from '@/store/modules/web/life/recruitservice/index.js'

    export default {
        storeModule() {
            return { recruitServiceIndex };
        },
        asyncData({ store, route, query }) {
            return store.dispatch("recruitServiceIndex/fetchRecruitService");
        },
        computed: {
            ...mapState("recruitServiceIndex", ["recruitServiceList"])
        },
        components: {
            list,
            indexTemplate,
            infiniteScroll: () => import('../../base/common/infinite-scroll.vue')
        },
        methods: {
            loadMore(callback) {
                callback(this.$store.dispatch("recruitServiceIndex/fetchMore"));
            }
        }
    };
</script>