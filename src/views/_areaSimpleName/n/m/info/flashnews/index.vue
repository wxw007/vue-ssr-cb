<template>
    <div class="container">
        <!--要闻-->
        <div class="news">
            <div class="float-title-height"></div>
            <div class="float-top">
                <div class="common-top-title cborder-bg clearfix">
                    <backBtn></backBtn>
                    要闻
                </div>
            </div>
            <div class="inner">
                <infiniteScroll @loadBottom="loadMore">
                    <list :list="newsInOneDay" title="24小时"></list>
                    <list :list="newsInTwoDays" title="48小时"></list>
                    <list :list="newsMoreThanTwoDays" title="更早"></list>
                </infiniteScroll>
            </div>
        </div>
        <css></css>
    </div>
</template>
<script>
    import { mapState } from "vuex"
    import flashNews from "@/store/modules/m/info/flashnews/index.js"
    import list from "./base/list.vue"
    import backBtn from "../../base/common/back-btn.vue"

    import '../../base/common/list.js'
    import '../../base/common/global.js'

    /** 
     * 
     * @author wzw
     * @since 2018-02-05 20:13
     */
    export default {
        storeModule() {
            return { flashNews };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("flashNews/fetchData");
        },
        computed: {
            ...mapState("flashNews", ["newsInOneDay", "newsInTwoDays", "newsMoreThanTwoDays"])
        },
        components: {
            list,
            backBtn
        },
        methods: {
            loadMore(callback) {
                callback("flashNews/fetchMore", this.newsMoreThanTwoDays);
            }
        }
    }
</script>