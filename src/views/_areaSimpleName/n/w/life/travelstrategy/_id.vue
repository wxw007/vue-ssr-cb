<template>
  <div>
    <pageHeader></pageHeader>
    <div id="index_content" class="content clearfloat">
      <div id="" class="detail_left">
        <blueHeadline :text="'分享'"></blueHeadline>
        <shareBtn></shareBtn>
      </div>
      <div id="content_area">
        <div class="travel-detail-intro">
          <h1 class="title">
            {{travelStrategy.strategyTitle}}
          </h1>
          <div class="title-extra">
            <span>{{travelStrategy.startTime | timezoneconvert}}</span>
          </div>
          <div class="content" v-html="travelStrategy.strategyContent"></div>
        </div>
      </div>
      <div id="side_right">
        <searchBox></searchBox>
        <downloadBox></downloadBox>
        <aboutusBox></aboutusBox>
      </div>
      <shortcutBtn></shortcutBtn>
    </div>
  </div>
</template>
<script>
  /** 
   * 旅游攻略详情页
   *
   * @author jiemin
   * @author wzw
   * @since 2017-12-29
   */

  import { mapState } from 'vuex'
  
  import pageHeader from "../../base/header/header.vue";
  import blueHeadline from "../../base/common/blue-headline.vue";
  import shareBtn from "../../base/left-aside/share-btn.vue";

  import searchBox from "../../base/right-aside/search_box.vue";
  import downloadBox from "../../base/right-aside/download_box.vue";
  import aboutusBox from "../../base/right-aside/aboutus_box.vue";
  import shortcutBtn from "../../base/common/shortcut_btn.vue";

  import travelStrategyDetail from '@/store/modules/web/life/travelstrategy/_id.js'

  import timezoneconvert from '@/util/filter/timezoneconvert'

  export default {
    storeModule() {
      return { travelStrategyDetail };
    },
    asyncData({ store, route }) {
      let params = {};
      if (route.params.id) {
        params.strategyId = route.params.id;
      }
      return store.dispatch("travelStrategyDetail/fetchData", params);
    },
    data() {
      return {
      };
    },
    computed: {
      ...mapState("travelStrategyDetail", ["travelStrategy"]),
    },
    components: {
      pageHeader,
      blueHeadline,
      shareBtn,
      shortcutBtn,
      searchBox,
      downloadBox,
      aboutusBox
    },
    filters: {
      timezoneconvert
    }
  };
</script>
<style >
  .travel-detail-intro {
    margin-top: 26px;
  }

  .travel-detail-intro .title {
    margin: 15px 0px;
    font-size: 28px;
    color: #17191a;
  }

  .travel-detail-intro .title-extra span {
    font-size: 12px;
    color: #666;
  }

  .travel-detail-intro .content {
    margin-top: 30px;
    font-size: 14px;
    max-width: 100%;
  }

  .travel-detail-intro .content *{
    max-width: 100%;
  }

  .travel-detail-intro .content img {
    max-width: 100%;
    margin-bottom: 15px;
  }

  .travel-detail-intro .content p {
    margin: 14px 0px;
  }
</style>