<template>
    <div class="container">
        <!--旅游攻略-->
        <div class="trip">
            <tabList :tabList="childLifeModuleList" :searchPageUrl="searchPageUrl"></tabList>
            <bannerList :bannerList="bannerList"></bannerList>
            <div v-if="showCityIntroduction">
                <div class="know" :class="{'on':showTravelIntroductionContentAll}">
                    <div class="know-title"> {{cityIntroduction.travelIntroductionTitle}}</div>
                    <div class="know-content"> {{cityIntroduction.travelIntroductionContent}}</div>
                    <v-touch class="know-arrow-warp" @tap="showTravelIntroductionContentAll = !showTravelIntroductionContentAll" style="    padding-bottom: .12rem;">
                        <div class="know-arrow">
                            <img src="~@/assets/m/images/34.jpg" alt="">
                        </div>
                    </v-touch>
                </div>
                <div class="middle-photo-warp" v-if="cityIntroduction.imgList != null" style="    padding-top: 0rem;">
                    <div class="middle-list">
                        <div class="photo-box fl" v-for="img in cityIntroduction.imgList">
                            <img :src="img.imgUrl">
                        </div>
                    </div>
                </div>
            </div>
            <div class="inner">
                <div class="hot" v-if="showTravelStrategyTopList">
                    <div class="hot-top clearfix">
                        <div class="hot-top-title fl">热门攻略</div>
                        <touch-link class="hot-more fr" :to="hotTravelStrategyUrl" v-if="travelStrategyTopList.length > 3">more</touch-link>
                    </div>
                    <div class="hot-middle clearfix">
                        <touch-link tag="div" class="hot-box " v-for="travelStrategy in travelStrategyTopList" :key="travelStrategy.id" :href="travelStrategy.url">
                            <div class="hot-img" style="width:100%;">
                                <img :src="travelStrategy.titleImage">
                            </div>
                            <div class="hot-title one-row-text">{{travelStrategy.strategyTitle}}</div>
                            <div class="hot-subtitle one-row-text">{{travelStrategy.subContent}}</div>
                        </touch-link>
                    </div>
                </div>
                <div class="all-strategy" v-if="showTravelStrategyList">
                    <div class="all-strategy-title">全部攻略</div>
                    <infiniteScroll @loadBottom="loadMore">
                        <list :list="travelStrategyList"></list>
                    </infiniteScroll>

                </div>
            </div>
        </div>
        <css></css>
    </div>
</template>
<script>
    /** 
     * 旅游攻略
     * @author wzw
     * @since 2018-02-06 15:50
     */
    import { mapState } from "vuex"
    import travelStrateIndex from "@/store/modules/m/life/travelstrategy/index.js"
    import tabList from '../base/tab-list.vue'
    import bannerList from '../../base/index/banner-list.vue'
    import list from "./base/list.vue"
    import '../../base/common/global.js'
    import '../../base/common/swiper.js'
    import '../../base/common/list.js'

    import { resolveUrl } from "@/util/common/url.js"
    export default {
        storeModule() {
            return { travelStrateIndex };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("travelStrateIndex/fetchData");
        },
        data() {
            return {
                showTravelIntroductionContentAll: false
            };
        },
        computed: {
            ...mapState("travelStrateIndex", ["bannerList", "cityIntroduction", "travelStrategyTopList", "travelStrategyList", "childLifeModuleList", "haveMoreTravelStrategyTopList"]),
            showCityIntroduction() {
                return this.cityIntroduction != null && this.cityIntroduction.
                    travelIntroductionTitle != null
            },
            showTravelStrategyTopList() {
                return this.travelStrategyTopList != null && this.travelStrategyTopList.length > 0;
            },
            showTravelStrategyList() {
                return this.travelStrategyList != null && this.travelStrategyList.length > 0;
            },
            searchPageUrl() {
                return resolveUrl(this.$store, "/n/m/life/travelstrategy/search")
            },
            hotTravelStrategyUrl() {
                return resolveUrl(this.$store, "/n/m/life/travelstrategy/hot")
            }
        },
        components: {
            tabList,
            bannerList,
            list
        },
        methods: {
            loadMore(callback) {
                callback("travelStrateIndex/fetchMore", this.travelStrategyList);
            }
        }
    }
</script>
<style>
    .hot-middle {
        display: flex;
        /* justify-content: center; */
    }

    .hot-box {
        width: 30%;
        margin-right: 0.3rem;
    }

    .hot-box:last-child {
        margin-right: 0rem;
    }
</style>