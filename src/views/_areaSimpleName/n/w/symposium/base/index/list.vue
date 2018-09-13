<template>
  <div class="hot_news_area clearfloat">
    <div class="special-news-list">
      <div class="special-item" v-for="symposium in symposiumList" :key="symposium.symposiumId" :title="symposium.title">
        <a class="special-img" :href="symposium.url" target="_blank">
          <img v-lazy="symposium.imgUrl">
        </a>
        <a class="special-h2" :href="symposium.url">{{symposium.symposiumTitle }}</a>
        <span class="special-time">{{symposium.symposiumStartTime | timezoneconvert}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import timezoneconvert from '@/util/filter/timezoneconvert'

  export default {
    props: {
      symposiumList: {
        default() {
          return [];
        }
      }
    },
    filters: {
      timezoneconvert
    }
  };
</script>


<style>
  /* 
     *热点新闻区域，即轮播图范围
     */

  .news_content {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
  }

  .hot_news_area {
    /* height: 252px; */
  }

  .hot_news_area .hot_slide_area {
    /* float: left; */
    width: 48.31%;
    height: 252px;
    box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.5);
    /*热点新闻的轮播样式区域*/
  }

  .special_slide_area {
    position: relative;
    overflow: hidden;
    /*轮播的图片样式*/
  }

  .swiper-btn {
    position: absolute;
    z-index: 3;
    width: 18px;
    height: 68px;
    top: 114px;
    cursor: pointer;
  }

  .swiper-btn-left {
    left: 29px;
    background: url("~@/assets/web/swiper-left.png");
  }

  .swiper-btn-right {
    right: 29px;
    background: url("~@/assets/web/swiper-right.png");
  }

  .special_slide_area div.tips {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 42px;
    background-color: #000;
    overflow: hidden;
  }

  .special_slide_area div.title {
    width: 100%;
    text-align: left;
    position: absolute;
    left: 0px;
    bottom: 0;
    height: 42px;
    padding-left: 20px;
  }

  .special_slide_area div.title a {
    display: block;
    width: 100%;
    height: 42px;
    color: #fff;
    font-size: 15px;
    line-height: 42px;
    text-decoration: none;
    overflow: hidden;
  }

  .special_slide_area div.title a:hover {
    text-decoration: underline !important;
  }

  .special_slide_area .swiper-container-horizontal>.swiper-pagination-bullets {
    width: 30%;
    left: 70%;
    bottom: 18px;
    text-align: right;
    padding-right: 20px;
  }

  .special_slide_area .swiper-pagination-bullet {
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: #fff;
    text-indent: -99999px;
    margin: 3px 4.5px 0px;
    opacity: 0.7;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
  }

  .special_slide_area .swiper-pagination-bullet-active {
    background: white;
    transform: scale(1.3);
    opacity: 1;
  }

  /* 
    专题列表新闻
 */

  /* .special-news-list { */

  /* margin-top: 20px; */

  /* } */

  .special-news-list>div:nth-child(2n-1) {
    float: left;
  }

  .special-news-list>div:nth-child(2n) {
    float: right;
  }

  .special-item {
    display: inline-block;
    width: 48.58%;
    height: 240px;
    margin-bottom: 20px;
    border: 1px solid #ebebeb;
  }

  .special-item:hover {
    border: 1px solid #0082c6;
  }

  .special-item .special-img {
    display: block;
    width: 100%;
    height: 172px;
  }

  .special-img img {
    width: 100%;
    height: 100%;
  }

  .special-h2 {
    display: block;
    width: 290px;
    height: 28px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 28px;
    font-size: 18px;
    color: #000;
    font-weight: 800;
    margin-top: 10px;
    padding-left: 10px;
  }

  .special-time {
    display: block;
    width: 100%;
    height: 19px;
    line-height: 19px;
    font-size: 12px;
    color: #666666;
    padding-left: 10px;
  }
</style>