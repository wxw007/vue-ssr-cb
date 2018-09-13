<template>
  <detailTemplate>
    <div class="life-detail-nav">
      <!-- <a href="/n">首页</a>&nbsp;/&nbsp;
      <a href="/n">推荐</a>&nbsp;/&nbsp;
      <a>正文</a> -->
    </div>
    <h1 class="life-detail-title">
      {{foodService.title}}
    </h1>
    <div class="life-detail-title-extra">
      <!-- <span class="from" >{{foodService.startTime}}</span> -->
      <span class='time'>{{foodService.startTime | timezoneconvert}}</span>
      <span class="right-type-blue">{{foodService.cookingStyle}}</span>
    </div>
    <div class="life-content-container">
      <bigImgBox v-if="haveImg" :imgList="foodService.imgList" :bigImgList="foodService.bigImgList"></bigImgBox>
      <div class="life-detail-box " :class="{'other-type':!haveImg}">
        <div class="life-info-item money" v-if="foodService.personalOnsumption">
          <span>{{foodService.personalOnsumption}}</span>
        </div>
        <div class="life-info-item " v-if="foodService.absoluteAddress">
          <b>地址&nbsp;：</b>
          <span>{{foodService.absoluteAddress}}</span>
        </div>
        <div class="life-info-item " v-if="foodService.shopHours">
          <b>营业时间&nbsp;：</b>
          <span>{{foodService.shopHours}}</span>
        </div>
        <div class="life-info-item " v-if="haveSpecialService">
          <b>特色服务&nbsp;：</b>
          <ul class="special-service-box">
            <li v-for="service in foodService.specialService" :key="service">{{service}}</li>
          </ul>
        </div>

        <template v-if="foodService.tel">
          <div class="phone-box" v-if="haveImg">
            <b class="phone-icon"></b>
            <span>{{foodService.tel}}</span>
          </div>
          <div class="life-info-item " v-else>
            <b>联系电话&nbsp;：</b>
            <span>{{foodService.tel}}</span>
          </div>
        </template>
      </div>
    </div>

    <template v-if="foodService.serviceContent != null && foodService.serviceContent != ''">
      <blueHeadline :text="'详情介绍'" style="margin-top: 10px;"></blueHeadline>
      <div class="lifeservice-detail-intro" v-html="foodService.serviceContent"></div>
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

  import foodServiceDetail from '@/store/modules/web/life/foodservice/_id.js'

  import timezoneconvert from '@/util/filter/timezoneconvert'

  export default {
    storeModule() {
      return { foodServiceDetail };
    },
    asyncData({ store, route }) {
      let params = {};
      if (route.params.id) {
        params.id = route.params.id;
      }
      return store.dispatch("foodServiceDetail/fetchFoodService", params);
    },
    data() {
      return {
        browser: false
      }
    },
    computed: {
      ...mapState("foodServiceDetail", ["foodService","center", "allData"]),
      haveImg() {
        return this.foodService.imgList != null && this.foodService.imgList.length > 0;
      },
      haveSpecialService() {
        return this.foodService.specialService != null && this.foodService.specialService.length > 0;
      }

    },
    components: {
      blueHeadline,
      detailTemplate,
      bigImgBox,
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