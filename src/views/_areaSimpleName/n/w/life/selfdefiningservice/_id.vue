<template>
  <detailTemplate>
    <div class="life-detail-nav">
      <!-- <a href="/n">首页</a>&nbsp;/&nbsp;
      <a href="/n/w/life/selfdefiningservice">推荐</a>&nbsp;/&nbsp;
      <a href="####">正文</a> -->
    </div>
    <h1 class="new-headline">
      {{selfdefining.title}}
    </h1>
    <div class="news-msg">
      <!-- <a class="news-form" href="###">环球新闻网</a> -->
      <span class='news-time'>{{selfdefining.startTime| timezoneconvert}}</span>
      <i class="food-type">{{selfdefining.wage}}</i>
    </div>
    <div class="life-detail-info other-type clearfloat">
      <div class="life-info-item" v-if="selfdefining.contact">
        <b>联系人&nbsp;：</b>
        <span>{{selfdefining.contact}}</span>
      </div>
      <div class="life-info-item" v-if="selfdefining.tel">
        <b>联系电话&nbsp;：</b>
        <span>{{selfdefining.tel}}</span>
      </div>
      <div class="life-info-item" v-if="selfdefining.absoluteAddress">
        <b>地址&nbsp;：</b>
        <span>{{selfdefining.absoluteAddress}}</span>
      </div>
      <div class="life-info-item" v-if="selfdefining.email">
        <b>邮箱&nbsp;：</b>
        <span>{{selfdefining.email}}</span>
      </div>
    </div>
    <otherTypeImgBox v-if="!!selfdefining.imgList" :imgList="selfdefining.imgList" :bigImgList="selfdefining.bigImgList"></otherTypeImgBox>


    <template v-if="selfdefining.serviceContent != null && selfdefining.serviceContent != ''">
      <blueHeadline :text="'详情介绍'" style="margin-top: 25px;"></blueHeadline>

      
      <div class="lifeservice-detail-intro" v-html="selfdefining.serviceContent">
      </div>
    </template>
     <baidu-map  v-if="browser && center.lng!='' && center.lat!=''" :center="center">
       <blueHeadline :text="'详细地址'" style="margin-top: 20px;"></blueHeadline>
     </baidu-map>
  </detailTemplate>
</template>
<script>
  /** 
   * 自定义服务详情页
   * 
   * @author jiemin
   * @author wzw 
   * @since 2017-12-27
   */
  import { mapState } from 'vuex'

  import detailTemplate from '../base/layouts/detail-template.vue'
  import blueHeadline from "../../base/common/blue-headline.vue"
  import otherTypeImgBox from '../base/other-type-img-box.vue'

  import selfdefiningServiceDetail from '@/store/modules/web/life/selfdefiningservice/_id.js'

  import timezoneconvert from '@/util/filter/timezoneconvert'

  export default {
    storeModule() {
      return { selfdefiningServiceDetail };
    },
    asyncData({ store, route }) {
      let params = {};
      if (route.params.id) {
        params.id = route.params.id;
      }
      return store.dispatch("selfdefiningServiceDetail/fetchSelfdefiningService", params);
    },
    data() {
      return {
        browser: false
      }
    },
    computed: {
      ...mapState("selfdefiningServiceDetail", ["selfdefining","center"]),
    },
    components: {
      blueHeadline,
      detailTemplate,
      otherTypeImgBox,
      BaiduMap: () => import('../base/map.vue')
    },
    mounted() {
        this.browser = true;
    },
    filters: {
      timezoneconvert
    }
  };
</script>
<style src="../base/other-type.css">
</style>