<template>
  <detailTemplate>
    <div class="life-detail-nav">
      <!-- <a href="/n">首页</a>&nbsp;/&nbsp;
      <a href="/n">推荐</a>&nbsp;/&nbsp;
      <a href="####">正文</a> -->
    </div>
    <h1 class="new-headline">
      {{recruitService.title}}
    </h1>
    <div class="news-msg">
      <!-- <a class="news-form" href="###">环球新闻网</a> -->
      <span class='news-time'>{{recruitService.startTime| timezoneconvert}}</span>
      <i class="food-type">{{recruitService.wage}}</i>
    </div>
    <div class="life-detail-info other-type clearfloat">
      <div class="life-info-item" v-if="recruitService.contact">
        <b>联系人&nbsp;：</b>
        <span>{{recruitService.contact}}</span>
      </div>
      <div class="life-info-item" v-if="recruitService.tel">
        <b>联系电话&nbsp;：</b>
        <span>{{recruitService.tel}}</span>
      </div>
      <div class="life-info-item" v-if="recruitService.absoluteAddress">
        <b>工作地点&nbsp;：</b>
        <span>{{recruitService.absoluteAddress}}</span>
      </div>
      <div class="life-info-item" v-if="recruitService.genderLimitName">
        <b>性别限制&nbsp;：</b>
        <span>{{recruitService.genderLimitName}}</span>
      </div>
      <div class="life-info-item" v-if="recruitService.ageLimit">
        <b>年龄限制&nbsp;：</b>
        <span>{{recruitService.ageLimit}}</span>
      </div>
      <div class="life-info-item" v-if="recruitService.isFullTimeName!=null">
        <b>是否全职&nbsp;：</b>
        <span>{{'全职'|recruitService.isFullTimeName}}</span>
      </div>
    </div>
    <otherTypeImgBox v-if="!!recruitService.imgList" :imgList="recruitService.imgList" :bigImgList="recruitService.bigImgList"></otherTypeImgBox>


    <template v-if="recruitService.serviceContent != null && recruitService.serviceContent != ''">
      <blueHeadline :text="'详情介绍'" style="margin-top: 10px;"></blueHeadline>
      <div class="lifeservice-detail-intro" v-html="recruitService.serviceContent">
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

  import recruitServiceDetail from '@/store/modules/web/life/recruitservice/_id.js'

  import timezoneconvert from '@/util/filter/timezoneconvert'

  export default {
    storeModule() {
      return { recruitServiceDetail };
    },
    asyncData({ store, route }) {
      let params = {};
      if (route.params.id) {
        params.id = route.params.id;
      }
      return store.dispatch("recruitServiceDetail/fetchRecruitService", params);
    },
    data() {
      return {
        browser: false
      }
    },
    computed: {
      ...mapState("recruitServiceDetail", ["recruitService", "center"]),
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