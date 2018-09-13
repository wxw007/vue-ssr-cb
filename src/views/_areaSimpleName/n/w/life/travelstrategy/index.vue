<template>
  <indexTemplate>
    <bannerList :bannerList="bannerList"></bannerList>
    <cityIntroduction :cityIntroduction="travelIntroduction"></cityIntroduction>
    <hotTravelStrategyList :travelStrategyTopList="travelStrategyTopList" v-if="isShowTravelStrategyTopList"></hotTravelStrategyList>

    <blueHeadline :text="'全部攻略'"></blueHeadline>
    <infiniteScroll @loadMore="loadMore">
      <travelStrategyList :travelStrategyList="travelStrategyList"></travelStrategyList>
    </infiniteScroll>
  </indexTemplate>
</template>
<script>
  import { mapState } from 'vuex'
  import indexTemplate from '../base/layouts/index-template-travel.vue'

  import travelStrategyList from "./base/travel-strategy-list.vue" //旅游攻略列表
  import bannerList from './base/banner-list.vue'
  import cityIntroduction from './base/city-introduction.vue'
  import hotTravelStrategyList from './base/hot-travel-strategy-list.vue'
  import blueHeadline from "../../base/common/blue-headline.vue"


  import travelStrategyIndex from '@/store/modules/web/life/travelstrategy/index.js'

  export default {
    storeModule() {
      return { travelStrategyIndex };
    },
    asyncData({ store, route, query }) {
      return store.dispatch("travelStrategyIndex/fetchData");
    },
    data() {
      return {
        navTabList: [
          { alt: "旅游攻略", name: "旅游攻略" },
          { alt: "旅游套餐", name: "旅游套餐" }
        ],
        nowTab: "旅游攻略",
        nowList: []
      };
    },
    computed: {
      ...mapState("travelStrategyIndex", ["bannerList", "travelIntroduction", "travelStrategyTopList", "travelStrategyList"]),
      isShowTravelStrategyTopList() {  //是否显示热点攻略
        return this.travelStrategyTopList != null && this.travelStrategyTopList.length > 0;
      }
    },
    components: {
      travelStrategyList,
      bannerList,
      cityIntroduction,
      hotTravelStrategyList,
      blueHeadline,
      indexTemplate,
      infiniteScroll: () => import('../../base/common/infinite-scroll.vue')
    },
    methods: {
      loadMore(callback) {
        callback(this.$store.dispatch("travelStrategyIndex/fetchMore"));
      }
    }
  };
</script>