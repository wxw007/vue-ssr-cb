<template>
    <div class="container">
        <div class="common-top-title cborder-bg clearfix">
            <backBtn></backBtn>
            热门攻略
        </div>
        <div class="trip-packages">
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
     * 热门旅游攻略
     * 
     * @author wzw
     * @since 2018-02-07 20:26
     */
    import list from "./base/list.vue"
    import backBtn from "../../base/common/back-btn.vue"
    import { mapState } from "vuex"
    import hotTravelStrategy from "@/store/modules/m/life/travelstrategy/hot.js"
    import '@/util/plugins/lazyload.js'
    import '../../base/common/global.js'
    import '../../base/common/swiper.js'
    import '../../base/common/list.js'

    export default {
        storeModule() {
            return { hotTravelStrategy };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("hotTravelStrategy/fetchData");
        },
        computed: {
            ...mapState("hotTravelStrategy", ["list"])
        },
        components: {
            list,
            backBtn
        },
        methods: {
            loadMore(callback) {
                callback("hotTravelStrategy/fetchMore", this.list);
            }
        }
    }
</script>