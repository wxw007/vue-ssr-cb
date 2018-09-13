<template>
  <indexTemplate>
    <infiniteScroll @loadMore="loadMore">
      <list :foodServiceList="foodServiceList" @loadMore="loadMore"></list>
    </infiniteScroll>
  </indexTemplate>
</template>
<script>
  import { mapState } from 'vuex'
  import list from './base/list.vue'
  import indexTemplate from '../base/layouts/index-template-lifeservice.vue'
  import foodServiceIndex from '@/store/modules/web/life/foodservice/index.js'

  export default {
    storeModule() {
      return { foodServiceIndex };
    },
    asyncData({ store, route, query }) {
      return store.dispatch("foodServiceIndex/fetchData");
    },
    computed: {
      ...mapState("foodServiceIndex", ["foodServiceList"])
    },
    components: {
      list,
      indexTemplate,
      infiniteScroll: () => import('../../base/common/infinite-scroll.vue')
    },
    methods: {
      loadMore(callback) {
        callback(this.$store.dispatch("foodServiceIndex/fetchMore"));
      }
    }
  };
</script>