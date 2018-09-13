<template>
  <indexTemplate>
    <infiniteScroll @loadMore="loadMore">
      <travelList :travelList="travelList"></travelList>
    </infiniteScroll>
  </indexTemplate>
</template>
<script>
  /** 
    * 旅游套餐首页
    * @author jiemin
    * @author wzw
    * @since 2017-12-26
    */
  import { mapState } from 'vuex'

  import indexTemplate from '../base/layouts/index-template-travel.vue'
  import travelList from "./base/list.vue"

  import travelIndex from '@/store/modules/web/life/travel/index.js'

  export default {
    storeModule() {
      return { travelIndex };
    },
    asyncData({ store, route, query }) {
      return store.dispatch("travelIndex/fetchData");
    },
    computed: {
      ...mapState("travelIndex", ["travelList"])
    },
    components: {
      indexTemplate,
      travelList,
      infiniteScroll: () => import('../../base/common/infinite-scroll.vue')
    },
    methods: {
      loadMore(callback) {
        callback(this.$store.dispatch("travelIndex/fetchMore"));
      }
    }
  };
</script>