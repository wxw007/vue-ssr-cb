<template>
  <!-- 推荐栏目的新闻 -->
  <!-- recommended-column-news -->
  <div class="recommended-column-box">
    <ul class="link-continent clearfloat">
      <template v-for="(subscription,index) in subscriptionList">
        <i v-if="index!=0"></i>
        <li :class="{'active':subscription.infoTypeName == selected.infoTypeName}" :key="subscription.infoTypeName" @click.stop="select(subscription)">{{subscription.infoTypeName}}</li>
      </template>
    </ul>
    <div class="recommended-column-detail">
      <!-- 轮播 -->
      <div class="recommended-slider-box" v-if="selected.hotBannerInfoList">
        <swiper :options="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="hotBannerInfo in selected.hotBannerInfoList" :key="hotBannerInfo.infoCentreId">
              <a :title="hotBannerInfo.infoTitle" :href="hotBannerInfo.url" target="_blank">
                <img :src="hotBannerInfo.infoImage" style="width:100%;">
              </a>
              <div class="tips">
                <a>{{hotBannerInfo.infoTitle}}</a>
              </div>
            </div>
          </div>
          <div class="swiper-pagination" style="position:absolute;left:0px;bottom:8px;width:100%;text-align: center;"></div>
        </swiper>
      </div>
      <!-- 新闻列表 -->
      <div class="recommended-news-list" :class="{'full':selected.hotBannerInfoList == null}">
        <a v-for="(info, index) in selected.infoList" :href="info.url" :class="{'first-news':index==0}" target="_blank">{{info.infoTitle}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["subscriptionList"],
    data() {
      return {
        selected: {},
        swiperOption: {
          loop: true,
          speed: 300,
          autoplay: {
            delay: 3000
          },
          pagination: {
            el: '.recommended-slider-box .swiper-pagination',
            clickable: true
          },
        }
      };
    },
    components: {
      swiper: () => import('../../../base/common/swiper-container.vue')
    },
    created() {
      this.selected = this.subscriptionList[0];
    },
    methods: {
      select(subscription) {
        this.selected = subscription;
      }
    }
  };
</script>
<style>
  .recommended-column-box {
    width: 100%;
    margin-top: 17px;
    border: 1px solid #E6E6E6;
  }


  .link-continent {
    display: block;
    border-bottom: 0px;
    background: #F5F5F5;
  }

  .link-continent li {
    float: left;
    width: 16.52%;
    height: 42px;
    line-height: 40px;
    font-size: 14px;
    background: #F5F5F5;
    color: #666666;
    cursor: pointer;
    text-align: center;
    border-top: 2px solid transparent;
    border-bottom: 1px solid #E6E6E6;
  }

  .link-continent i {
    float: left;
    width: 1px;
    height: 42px;
    background: #F0F0F0;
  }

  .link-continent .active {
    background: #fff;
    color: #0082c6;
    border-top: 2px solid #0082c6;
    border-bottom: 1px solid #fff;
  }


  .recommended-column-detail {
    padding-top: 7px;
    padding: 30px 20px 30px 26px;
  }

  .recommended-column-detail:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }

  .recommended-column-detail .recommended-slider-box {
    display: inline-block;
    width: 48.72%;
    height: 230px;
    line-height: 1;
    text-align: left;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    background: #ccc;
  }

  .recommended-column-detail .recommended-slider-box>div {
    height: 100%;
  }

  .recommended-column-detail .recommended-slider-box .tips {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 42px;
    background-color: rgba(0, 0, 0, .7);
    overflow: hidden
  }

  .recommended-column-detail .recommended-slider-box .tips a {
    color: #fff;
    font-size: 15px;
    line-height: 30px;
    overflow: hidden;
    height: 25px;
    display: inline-block;
    text-decoration: none;
    padding: 0 5px;
  }

  .recommended-slider-box .swiper-pagination-bullet {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: #fff;
    text-indent: -99999px;
    margin: 3px 4.5px 0;
    opacity: .7;
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
  }

  .recommended-slider-box .swiper-pagination-bullet-active {
    background: #fff;
    -webkit-transform: scale(1.5);
    -ms-transform: scale(1.5);
    transform: scale(1.5);
    opacity: 1;
  }

  .recommended-column-detail .recommended-news-list {
    float: right;
    width: 48%;
    height: 230px;
  }

  .recommended-column-detail .recommended-news-list a {
    position: relative;
    display: block;
    font-size: 16px;
    color: #17191A;
    line-height: 25px;
    padding-left: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recommended-column-detail .recommended-news-list a:after {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto 0;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #000;
  }

  .recommended-column-detail .recommended-news-list .first-news {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 13px;
    padding-left: 0px;
  }

  .recommended-column-detail .recommended-news-list .first-news:after {
    content: '';
    display: none;
  }


  .recommended-news-list.full {
    width: 100%;
  }
</style>