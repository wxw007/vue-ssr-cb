<template>
  <detailTemplate>
    <div class="life-detail-nav">
      <!-- <a href="/n">首页</a>&nbsp;/&nbsp;
      <a href="/n">推荐</a>&nbsp;/&nbsp;
      <a>正文</a> -->
    </div>
    <h1 class="life-detail-title">
      {{housingService.title}}
    </h1>
    <div class="life-detail-title-extra">
      <!-- <span class="from" >{{housingService.startTime}}</span> -->
      <span class='time'>{{housingService.startTime | timezoneconvert}}</span>
      <span class="right-type-blue">{{housingService.rentalTypeName}}</span>
    </div>
    <div class="life-content-container">
      <bigImgBox v-if="haveImg" :imgList="housingService.imgList" :bigImgList="housingService.bigImgList"></bigImgBox>
      <div class="life-detail-box " :class="{'other-type':!haveImg}">
        <div class="life-info-item money" v-if="housingService.personalOnsumption">
          <span>{{housingService.personalOnsumption}}</span>
        </div>
        <div class="life-info-item " v-if="housingService.price">
          <b>价格&nbsp;：</b>
          <span>{{housingService.price}}</span>
        </div>
        <div class="life-info-item " v-if="housingService.contact">
          <b>联系人&nbsp;：</b>
          <span>{{housingService.contact}}</span>
        </div>
        <div class="life-info-item " v-if="housingService.absoluteAddress">
          <b>地址&nbsp;：</b>
          <span>{{housingService.absoluteAddress}}</span>
        </div>
        <div class="life-info-item " v-if="housingService.flatType">
          <b>户型&nbsp;：</b>
          <span>{{housingService.flatType}}</span>
        </div>
        <div class="life-info-item " v-if="housingService.totalArea">
          <b>面积&nbsp;：</b>
          <span>{{housingService.totalArea}}</span>
        </div>
        <div class="life-info-item " v-if="housingService.decoration">
          <b>配置&nbsp;：</b>
          <span>{{housingService.decoration}}</span>
        </div>
        <div class="life-info-item " v-if="housingService.operationCost">
          <b>管理费&nbsp;：</b>
          <span>{{housingService.operationCost}}</span>
        </div>
        <div class="life-info-item " v-if="housingService.email">
          <b>邮箱&nbsp;：</b>
          <span>{{housingService.email}}</span>
        </div>
        <!-- <div class="life-info-item " v-if="haveSpecialService">
          <b>面积&nbsp;：</b>
          <ul class="special-service-box">
            <li v-for="service in housingService.specialService" :key="service">{{service}}</li>
          </ul>
        </div> -->

        <template v-if="housingService.tel">
          <div class="phone-box" v-if="haveImg">
            <b class="phone-icon"></b>
            <span>{{housingService.tel}}</span>
          </div>
          <div class="life-info-item " v-else>
            <b>联系电话&nbsp;：</b>
            <span>{{housingService.tel}}</span>
          </div>
        </template>
      </div>
    </div>

    <template v-if="housingService.serviceContent != null && housingService.serviceContent != ''">
      <blueHeadline :text="'详情介绍'" style="margin-top: 10px;"></blueHeadline>
      <div class="lifeservice-detail-intro" v-html="housingService.serviceContent"></div>
    </template>
    <baidu-map  v-if="browser && center.lng!='' && center.lat!=''" :center="center">
       <blueHeadline :text="'详细地址'" style="margin-top: 20px;"></blueHeadline>
     </baidu-map>

  </detailTemplate>
</template>
<script>
  /** 
   * 美食天地详情页
   * 
   * @author jiemin
   * @author wzw 
   * @since 2017-12-27
   */
  import { mapState } from 'vuex'

  import detailTemplate from '../base/layouts/detail-template.vue'
  import blueHeadline from "../../base/common/blue-headline.vue"
  import bigImgBox from '../base/bigImgBox.vue'

  import housingServiceDetail from '@/store/modules/web/life/housingservice/_id.js'

  import timezoneconvert from '@/util/filter/timezoneconvert'

  export default {
    storeModule() {
      return { housingServiceDetail };
    },
    asyncData({ store, route }) {
      let params = {};
      if (route.params.id) {
        params.id = route.params.id;
      }
      return store.dispatch("housingServiceDetail/fetchHousingService", params);
    },
    data() {
      return {
        browser: false
      }
    },
    computed: {
      ...mapState("housingServiceDetail", ["housingService", "center"]),
      haveImg() {
        return this.housingService.imgList != null && this.housingService.imgList.length > 0;
      },
      haveSpecialService() {
        return this.housingService.specialService != null && this.housingService.specialService.length > 0;
      }
    },
    mounted() {
      this.browser = true;

    },
    components: {
      blueHeadline,
      detailTemplate,
      bigImgBox,
      BaiduMap: () => import('../base/map.vue')

    },
    filters: {
      timezoneconvert
    }
  };
</script>

<style src="../base/food-housing.css"></style>
<style>
  /** 特殊服务 */

  .special-service-box {
    font-size: 14px;
    color: #0082c6;
    font-weight: bold;
    display: inline-block;
  }

  .special-service-box li {
    display: inline-block;
    padding: 0px 3px;
    border: 1px solid;
  }

  .special-service-box li {
    margin-left: 10px;
  }

  /** 特殊服务 */
</style>