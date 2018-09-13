<template>
  <!-- 中间的内容区域 -->
  <div class="news_section" style="display:block">
    <!-- 新闻列表 -->
    <div class="news-detail-nav">
      <a href="/">首页</a>&nbsp;/&nbsp;
      <a :href="symposiumUrl">专题</a>&nbsp;/&nbsp;
      <a>正文</a>
    </div>

    <div class="special-img " v-if="symposiumImgList != null && symposiumImgList.length == 1 ">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img :src="symposiumImgList[0].imgUrl">
        </div>
      </div>
    </div>
    <swiper class="special-img " :options="swiperOption" v-else>
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="symposiumImg in symposiumImgList" :key="symposiumImg.imgUrl">
          <img :src="symposiumImg.imgUrl">
        </div>
      </div>
    </swiper>
    <h1 class="new-headline">{{symposium.symposiumTitle}}</h1>
    <div class="news-msg">
      <span class='news-time'>{{symposium.symposiumStartTime | timezoneconvert}}</span>
    </div>
    <div class="special-digest" v-if="isShowSymposiumIllustration">
      <p>
        <i>摘要</i>
        {{symposium.symposiumIllustration }}
      </p>
    </div>
    <div class="tag-classify" v-if="isShowSymposiumClassList">
      <a v-for="symposiumClass in symposiumClassList" :key="symposiumClass.symposiumclassId" :href="'#' + symposiumClass.symposiumclassName">{{symposiumClass.symposiumclassName}}</a>
    </div>
  </div>
</template>
<script>
  import timezoneconvert from '@/util/filter/timezoneconvert'
  import { resolveUrl } from "@/util/common/url.js"

  export default {
    props: {
      symposium: {
        default() {
          return {};
        }
      },
      symposiumClassList: {
        default() {
          return [];
        }
      },
      hotNewsList: {
        default() {
          return [];
        }
      },
      symposiumImgList: {
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        swiperOption: {
          loop: true,
          speed: 300,
          autoplay: {
            delay: 3000
          }
        }
      };
    },
    computed: {
      isShowSymposiumIllustration() {
        return this.symposium.symposiumIllustration != null && this.symposium.symposiumIllustration != '';
      },
      isShowSymposiumClassList() {
        return this.symposiumClassList != null && this.symposiumClassList.length > 1;
      },
      symposiumUrl() {
        return resolveUrl(this.$store, "/n/w/symposium")
      }
    },
    components: {
      swiper: () => import("../../../base/common/swiper-container.vue")
    },
    filters: {
      timezoneconvert
    }
  };
</script>


<style>
  .news-detail-nav {
    font-size: 14px;
    margin-bottom: 30px;
  }

  .news-detail-nav a {
    color: #666666;
    font-size: 14px;
    line-height: 1;
  }

  .special-img {
    width: 100%;
    margin-bottom: 5px;
    /* margin-top: 30px; */
  }

  .special-img img {
    width: 100%;
  }

  .new-headline {
    margin: 15px 0;
    font-size: 28px;
    color: #17191a;
  }

  /* 
        新闻信息
     */

  .news-msg {
    width: 100%;
  }

  .news-time {
    font-size: 12px;
    color: #666;
    line-height: 1;
  }

  /* 
        文章摘要
      */

  .special-digest {
    margin-top: 32px;
    margin-bottom: 20px;
  }

  .special-digest p {
    font-size: 16px;
    line-height: 25px;
  }

  .special-digest p i {
    display: inline-block;
    width: 40px;
    height: 18px;
    line-height: 17px;
    text-align: center;
    border-radius: 2px;
    font-size: 14px;
    color: #0082c6;
    font-style: normal;
    border: 1px solid #0082c6;
  }

  /* 
        标签按钮
      */

  .tag-classify {
    margin-top: 17px;
    margin-bottom: 22px;
  }

  .tag-classify a {
    display: inline-block;
    width: 14.1%;
    height: 36px;
    line-height: 36px;
    background: #0082c6;
    margin: 8px 3.68%;
    border-radius: 4px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
  }

  .tag-classify a:nth-child(5n + 1) {
    margin-left: 0;
  }

  .tag-classify a:nth-child(5n) {
    margin-right: 0;
  }

  /* 
        对文章进行操作
       */

  .new-operation {
    font-size: 14px;
    color: #666;
  }

  .new-operation:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }

  .new-operation span {
    float: right;
    height: 16px;
    line-height: 16px;
    padding-left: 22px;
    margin-left: 25px;
    cursor: pointer;
  }
</style>