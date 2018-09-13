<template>
  <div>
    <pageHeader></pageHeader>
    <div id="index_content" class="content clearfloat">
      <div id="" class="detail_left">
        <blueHeadline :text="'分享'"></blueHeadline>
        <shareBtn></shareBtn>
      </div>
      <div id="content_area">
        <slot></slot>
      </div>
      <div id="side_right">
        <!-- <adBox style="margin-top:0;"></adBox> -->
        <downloadBox></downloadBox>
        <aboutusBox></aboutusBox>
      </div>
      <shortcutBtn :isReload.sync="isReload"></shortcutBtn>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  import pageHeader from "../../../base/header/header.vue"
  import blueHeadline from "../../../base/common/blue-headline.vue"
  import shareBtn from "../../../base/left-aside/share-btn.vue"
  import shortcutBtn from "../../../base/common/shortcut_btn.vue"
  import downloadBox from "../../../base/right-aside/download_box.vue"
  import aboutusBox from "../../../base/right-aside/aboutus_box.vue"
  import adBox from "../../../base/right-aside/ad_box.vue"
  import rateBox from "../../../base/right-aside/rate_box.vue"


  import '@/util/plugins/lazyload.js'

  import lifeserviceDetailTemplate from '@/store/modules/web/life/base/layouts/lifeservice-detail-template..js'

  export default {
    storeModule() {
      return { lifeserviceDetailTemplate };
    },
    data() {
      return {
        isReload: false, //控制刷新按钮是否显示
      };
    },
    computed: {
    },
    components: {
      pageHeader,
      blueHeadline,
      shareBtn,
      // comment,
      shortcutBtn,
      downloadBox,
      aboutusBox,
      adBox
    }
  };
</script>
<style>
  /* 生活服务详情页的导航部分*/

  .life-detail-nav {
    font-size: 14px;
  }

  .life-detail-nav a {
    color: #666666;
    font-size: 14px;
    line-height: 1;
  }

  .life-detail-title {
    margin: 15px 0;
    font-size: 28px;
    color: #17191a;
  }

  /*   标题辅助文字  */

  .life-detail-title-extra {
    width: 100%;
  }

  .life-detail-title-extra .from {
    margin-right: 26px;
    font-size: 12px;
    color: #666;
  }

  .life-detail-title-extra .time {
    font-size: 12px;
    color: #666;
  }

  .life-detail-title-extra .right-type-blue {
    float: right;
    font-size: 16px;
    color: #0082c6;
    font-weight: 800;
    font-style: normal;
    line-height: 1;
  }


  /* 
   * 生活服务的详情页介绍
  */

  .lifeservice-detail-intro {
    margin-top: 25px;
    font-size: 14px;
    /* text-align: center; */
  }

  .lifeservice-detail-intro p {
    margin: 14px 0px;
  }

  .lifeservice-detail-intro img {
    max-width: 100%;
  }
</style>