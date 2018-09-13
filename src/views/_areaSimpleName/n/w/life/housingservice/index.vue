<template>
    <indexTemplate>
        <infiniteScroll @loadMore="loadMore">
            <list :housingServiceList="housingServiceList"></list>
        </infiniteScroll>
    </indexTemplate>
</template>
<script>
    import { mapState } from 'vuex'
    import list from "./base/list.vue"
    import indexTemplate from '../base/layouts/index-template-lifeservice.vue'
    import housingServiceIndex from '@/store/modules/web/life/housingservice/index.js'

    export default {
        storeModule() {
            return { housingServiceIndex };
        },
        asyncData({ store, route, query }) {
            return store.dispatch("housingServiceIndex/fetchData");
        },
        computed: {
            ...mapState("housingServiceIndex", ["housingServiceList"])
        },
        components: {
            list,
            indexTemplate,
            infiniteScroll: () => import('../../base/common/infinite-scroll.vue')
        },
        methods: {
            loadMore(callback) {
                callback(this.$store.dispatch("housingServiceIndex/fetchMore"));
            }
        }
    };
</script>