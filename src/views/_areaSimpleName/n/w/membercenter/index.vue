<template>
  <indexTemplate>
    <div class="news_content" style="display:block">
      <newsList :infosMap="{'infoList':memberMarkList}"></newsList>
    </div>
  </indexTemplate>
</template>
<script>
  import { mapState } from "vuex"

  import indexTemplate from './base/layouts/index-template.vue'
  import newsList from "../base/index/news-list.vue"

  import memberCenterIndex from "@/store/modules/web/membercenter/index"

  export default {
    storeModule() {
      return { memberCenterIndex };
    },
    asyncData({ store, route }) {
      return store.dispatch("memberCenterIndex/fetchData");
    },
    computed: {
      ...mapState("memberCenterIndex", [
        "memberMarkList"
      ])
    },
    components: {
      indexTemplate,
      newsList
    }
  };
</script>