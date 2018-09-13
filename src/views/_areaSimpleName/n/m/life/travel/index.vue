<template>
    <div class="container">
        <!--旅游套餐-->
        <div class="trip-packages">
            <tabList :tabList="childLifeModuleList" :searchPageUrl="searchPageUrl"></tabList>

            <div class="inner">
                <infiniteScroll @loadBottom="loadMore">
                    <list :list="travelList"></list>
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
     * @since 2018-02-06 15:50
     */
    import list from "./base/list.vue"
    import tabList from '../base/tab-list.vue'
    import { mapState } from "vuex"
    import travelIndex from "@/store/modules/m/life/travel/index.js"
    import '../../base/common/global.js'
    import '../../base/common/swiper.js'
    import '../../base/common/list.js'

    import { resolveUrl } from "@/util/common/url.js"
    export default {
        storeModule() {
            return { travelIndex };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("travelIndex/fetchData");
        },
        computed: {
            ...mapState("travelIndex", ["travelList", "childLifeModuleList"]),
            searchPageUrl() {
                return resolveUrl(this.$store, "/n/m/life/travel/search")
            }
        },
        components: {
            list,
            tabList
        },
        methods: {
            loadMore(callback) {
                callback("travelIndex/fetchMore", this.travelList);
            }
        }
    }
</script>