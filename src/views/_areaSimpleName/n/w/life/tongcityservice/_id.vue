<template>
  <detailTemplate>
    <div class="life-detail-nav">
      <!-- <a href="/n">首页</a>&nbsp;/&nbsp;
      <a href="/n/w/life/tongcityservice">推荐</a>&nbsp;/&nbsp;
      <a href="####">正文</a> -->
    </div>
    <h1 class="new-headline">
      {{tongcityService.title}}
    </h1>
    <div class="news-msg">
      <!-- <a class="news-form" href="###">环球新闻网</a> -->
      <span class='news-time'>{{tongcityService.startTime| timezoneconvert}}</span>
      <i class="food-type">{{tongcityService.price}}</i>
    </div>
    <div class="life-detail-info other-type clearfloat">
      <div class="life-info-item" v-if="tongcityService.contact">
        <b>联系人&nbsp;：</b>
        <span>{{tongcityService.contact}}</span>
      </div>
      <div class="life-info-item" v-if="tongcityService.tel">
        <b>联系电话&nbsp;：</b>
        <span>{{tongcityService.tel}}</span>
      </div>
      <div class="life-info-item" v-if="tongcityService.absoluteAddress">
        <b>工作地点&nbsp;：</b>
        <span>{{tongcityService.absoluteAddress}}</span>
      </div>
      <div class="life-info-item" v-if="tongcityService.genderLimitName">
        <b>性别限制&nbsp;：</b>
        <span>{{tongcityService.genderLimitName}}</span>
      </div>
      <div class="life-info-item" v-if="tongcityService.ageLimit">
        <b>年龄限制&nbsp;：</b>
        <span>{{tongcityService.ageLimit}}</span>
      </div>
      <div class="life-info-item" v-if="tongcityService.isFullTimeName!=null">
        <b>是否全职&nbsp;：</b>
        <span>{{'全职'|tongcityService.isFullTimeName}}</span>
      </div>
    </div>
    <otherTypeImgBox v-if="!!tongcityService.imgList" :imgList="tongcityService.imgList" :bigImgList="tongcityService.bigImgList"></otherTypeImgBox>


    <template v-if="tongcityService.serviceContent != null && tongcityService.serviceContent != ''">
      <blueHeadline :text="'详情介绍'" style="margin-top: 10px;"></blueHeadline>
      <div class="lifeservice-detail-intro" v-html="tongcityService.serviceContent">
      </div>
    </template>
    <baidu-map  v-if="browser && center.lng!='' && center.lat!=''" :center="center">
       <blueHeadline :text="'详细地址'" style="margin-top: 20px;"></blueHeadline>
     </baidu-map>
  </detailTemplate>
</template>
<script>
  /** 
   * 求职招聘详情页
   * 
   * @author jiemin
   * @author wzw 
   * @since 2017-12-27
   */
  import { mapState } from 'vuex'

  import detailTemplate from '../base/layouts/detail-template.vue'
  import blueHeadline from "../../base/common/blue-headline.vue"
  // import showDetail from '../base/other-type-detail.vue'
  import otherTypeImgBox from '../base/other-type-img-box.vue'

  import tongcityServiceDetail from '@/store/modules/web/life/tongcityservice/_id.js'

  import timezoneconvert from '@/util/filter/timezoneconvert'

  export default {
    storeModule() {
      return { tongcityServiceDetail };
    },
    asyncData({ store, route }) {
      let params = {};
      if (route.params.id) {
        params.id = route.params.id;
      }
      return store.dispatch("tongcityServiceDetail/fetchTongcityService", params);
    },
    data() {
      return {
        browser: false
      }
    },
    computed: {
      ...mapState("tongcityServiceDetail", ["tongcityService", "center"]),
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