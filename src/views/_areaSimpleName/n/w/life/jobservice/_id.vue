<template>
  <detailTemplate>
    <div class="life-detail-nav">
      <a href="/n">首页</a>&nbsp;/&nbsp;
      <a href="/n">推荐</a>&nbsp;/&nbsp;
      <a>正文</a>
    </div>
    <h1 class="life-detail-title">
      {{jobService.title}}
    </h1>
    <div class="life-detail-title-extra">
      <!-- <span class="from" >{{jobService.startTime}}</span> -->
      <span class='time'>{{jobService.startTime | timezoneconvert}}</span>
      <span class="right-type-blue">{{jobService.cookingStyle}}</span>
    </div>
    <div class="life-content-container">
      <div class="life-detail-box " :class="{'other-type':!haveImg}">
        <div class="life-info-item " v-if="jobService.contacter">
          <b>联系人&nbsp;：</b>
          <span>{{jobService.contacter}}</span>
        </div>
        <div class="life-info-item " v-if="jobService.shopHours">
          <b>营业时间&nbsp;：</b>
          <span>{{jobService.shopHours}}</span>
        </div>
        <div class="life-info-item " v-if="haveSpecialService">
          <b>特殊服务&nbsp;：</b>
          <ul class="special-service-box">
            <li v-for="service in jobService.specialService" :key="service">{{service}}</li>
          </ul>
        </div>

        <template v-if="jobService.tel">
          <div class="phone-box" v-if="haveImg">
            <b class="phone-icon"></b>
            <span>{{jobService.tel}}</span>
          </div>
          <div class="life-info-item " v-else>
            <b>联系电话&nbsp;：</b>
            <span>{{jobService.tel}}</span>
          </div>
        </template>
      </div>
    </div>

    <template v-if="jobService.serviceContent != null && jobService.serviceContent != ''">
      <blueHeadline :text="'详情介绍'" style="margin-top: 10px;"></blueHeadline>
      <div class="lifeservice-detail-intro" v-html="jobService.serviceContent"></div>
    </template>
    <baidu-map  v-if="browser && center.lng!='' && center.lat!=''" :center="center">
       <blueHeadline :text="'详细地址'" style="margin-top: 20px;"></blueHeadline>
     </baidu-map>

  </detailTemplate>
</template>
<script>
  /** 
   * 求职详情页
   * 
   * @author jiemin
   * @author wzw 
   * @since 2017-12-27
   */
  import { mapState } from 'vuex'

  import detailTemplate from '../base/layouts/detail-template.vue'
  import blueHeadline from "../../base/common/blue-headline.vue"
  import bigImgBox from '../base/bigImgBox.vue'

  import jobServiceDetail from '@/store/modules/web/life/jobservice/_id.js'

  import timezoneconvert from '@/util/filter/timezoneconvert'

  export default {
    storeModule() {
      return { jobServiceDetail };
    },
    asyncData({ store, route }) {
      let params = {};
      if (route.params.id) {
        params.id = route.params.id;
      }
      return store.dispatch("jobServiceDetail/fetchJobService", params);
    },
    data() {
      return {
        browser: false
      }
    },
    computed: {
      ...mapState("jobServiceDetail", ["jobService","center"]),
      haveImg() {
        return this.jobService.imgList != null && this.jobService.imgList.length > 0;
      },
      haveSpecialService() {
        return this.jobService.specialService != null && this.jobService.specialService.length > 0;
      }
    },
    mounted() {
        this.browser = true;
    },
    components: {
      blueHeadline,
      detailTemplate,
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