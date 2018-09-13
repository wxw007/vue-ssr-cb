<template>
  <div>
    <pageHeader></pageHeader>
    <div id="index_content" class="content clearfloat">
      <div id="" class="detail_left">
        <blueHeadline :text="'分享'"></blueHeadline>
        <shareBtn></shareBtn>
      </div>
      <div id="content_area" class="">
        <div class="life_nav_tab">
          <ul class="tab_btn">
            <li v-for="(a,index) in navTabList" :alt="a.alt" :class="{'active':a.alt==nowTab}" @click="changeTab($event)">{{a.name}}</li>
          </ul>
        </div>
        <!-- 旅游介绍 -->
        <div class="travel-detail-intro" v-show="nowTab=='旅游介绍'">
          <h1>{{travel.travelTitle }}</h1>
          <div class="travel-detail-content" v-html="travel.travelContent"></div>
        </div>
        <!--   商家资讯 -->
        <div class="merchant-info" v-show="nowTab=='商家资讯'">
          <div class="merchant-info-content" v-html="travel.companyContent">
          </div>
          <blueHeadline :text="'其他套餐'"></blueHeadline>
          <travelList :travelList="otherTravelList"></travelList>
        </div>
      </div>
      <div id="side_right">
        <searchBox></searchBox>
        <adBox></adBox>
        <downloadBox></downloadBox>
        <aboutusBox></aboutusBox>
      </div>
      <shortcutBtn></shortcutBtn>
    </div>
  </div>
</template>
<script>
  /** 
    * 旅游套餐详情页
    *
    * @author jiemin
    * @author wzw
    * @since 2017-12-26
    */
  import { mapState } from 'vuex'

  import pageHeader from "../../base/header/header.vue";
  import blueHeadline from "../../base/common/blue-headline.vue";
  import shareBtn from "../../base/left-aside/share-btn.vue";

  import searchBox from "../../base/right-aside/search_box.vue";
  import adBox from "../../base/right-aside/ad_box.vue";
  import downloadBox from "../../base/right-aside/download_box.vue";
  import aboutusBox from "../../base/right-aside/aboutus_box.vue";
  import shortcutBtn from "../../base/common/shortcut_btn.vue"

  import travelList from "./base/list.vue" //商家资讯列表

  import '@/util/plugins/swiper.js'
  import '@/util/plugins/lazyload.js'


  import travelDetail from '@/store/modules/web/life/travel/_id.js'

  export default {
    storeModule() {
      return { travelDetail };
    },
    asyncData({ store, route }) {
      let params = {};
      params.travelId = route.params.id;
      return store.dispatch("travelDetail/fetchData", params);
    },
    data() {
      return {
        navTabList: [
          { alt: "旅游介绍", name: "旅游介绍" },
          { alt: "商家资讯", name: "商家资讯" }
        ],
        nowTab: "旅游介绍",
        nowList: []
      };
    },
    computed: {
      ...mapState("travelDetail", ["travel", "otherTravelList"])
    },
    components: {
      pageHeader,
      blueHeadline,
      shareBtn,
      shortcutBtn,
      travelList,
      searchBox,
      adBox,
      downloadBox,
      aboutusBox
    },
    methods: {
      changeTab(e) {
        var target = e.target;
        var alt = target.getAttribute("alt");
        this.nowTab = alt;
        if (alt == "旅游攻略") {
          // this.nowList = this.qiuzhiListData;
        } else if (alt == "旅游套餐") {
          // this.nowList = this.jobListData;
        }
      }
    }
  };
</script>
<style>
  /* 分页面的tab切换按钮样式  */

  .life_nav_tab {
    width: 100%;
    font-size: 16px;
  }

  .life_nav_tab .tab_btn {
    display: block;
    width: 100%;
    height: 36px;
    border-bottom: 2px solid #0082c6;
    margin-bottom: 12px;
  }

  .life_nav_tab .tab_btn li {
    float: left;
    display: block;
    width: 120px;
    height: 36px;
    line-height: 38px;
    color: #0082c6;
    text-align: center;
    cursor: pointer;
  }

  .life_nav_tab .tab_btn .active {
    color: #fff;
    background-color: #0082c6;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  /* 旅游介绍 */

  .travel-detail-intro {
    margin-top: 26px;
  }

  .travel-detail-intro h1 {
    font-size: 28px;
    color: #17191a;
    text-align: left;
  }

  /* 旅游资讯介绍内容  */

  .travel-detail-content {
    margin-top: 30px;
    font-size: 14px;
  }

  .travel-detail-content * {
    max-width: 100%;
  }

  .travel-detail-content p {
    margin: 14px 0px;
  }

  .travel-detail-content img {
    max-width: 100%;
  }


  /* 商家资讯介绍内容  */

  .merchant-info-content {
    width: 100%;
    margin-top: 26px;
    font-size: 14px;
  }

  .merchant-info-content * {
    max-width: 100%;
  }

  .merchant-info-content p {
    margin: 14px 0px;
  }

  .merchant-info-content img {
    max-width: 100%;
  }
</style>