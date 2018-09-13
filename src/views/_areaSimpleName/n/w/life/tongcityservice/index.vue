<template>
    <indexTemplate>
        <infiniteScroll @loadMore="loadMore">
            <list :tongcityServiceList="tongcityServiceList"></list>
        </infiniteScroll>
    </indexTemplate>

</template>
<script>
    import { mapState } from 'vuex'

    import list from "./base/list.vue"

    import indexTemplate from '../base/layouts/index-template-lifeservice.vue'

    import tongcityServiceIndex from '@/store/modules/web/life/tongcityservice/index.js'

    export default {
        storeModule() {
            return { tongcityServiceIndex };
        },
        asyncData({ store, route, query }) {
            return store.dispatch("tongcityServiceIndex/fetchData");
        },
        computed: {
            ...mapState("tongcityServiceIndex", ["tongcityServiceList"])
        },
        components: {
            indexTemplate,
            list,
            infiniteScroll: () => import('../../base/common/infinite-scroll.vue')
        },
        methods: {
            loadMore(callback) {
                callback(this.$store.dispatch("tongcityServiceIndex/fetchMore"));
            }
        }
    };
</script>