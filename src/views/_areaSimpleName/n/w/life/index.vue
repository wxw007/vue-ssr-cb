<template>
    <indexTemplate>
        <list :lifeModuleList="lifeModuleList" :bannerList="bannerList" :lifeTopInfoList="lifeTopInfoList"></list>
    </indexTemplate>
</template>
<script>
    /** 
     * 生活首页
     * @author jiemin
     * @author wzw
     * @since 2017-12-26
     */
    import { mapState } from 'vuex'

    import '@/util/plugins/swiper.js'
    import '@/util/plugins/lazyload.js'

    import indexTemplate from './base/layouts/index-template.vue'
    import list from "./base/index/list.vue"

    import lifeIndex from '@/store/modules/web/life/index'

    export default {
        storeModule() {
            return { lifeIndex };
        },
        asyncData({ store, route }) {
            return store.dispatch("lifeIndex/fetchData");
        },
        data() {
            return {};
        },
        computed: {
            ...mapState("lifeIndex", ["embassy", "lifeTopInfoList", "bannerList", "lifeModuleList"])
        },
        components: {
            indexTemplate,
            list
        }
    };
</script>