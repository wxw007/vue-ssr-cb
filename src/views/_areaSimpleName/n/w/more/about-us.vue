<template>
  <div>
    <pageHeader></pageHeader>
    <div id="index_content" class="content clearfloat">
      <!-- 左边的内容，框框需要继续存在 -->
      <div id="side_left" class="">
        <div class="about-btn-box active">
          <a class="about-btn" :href="aboutUsUrl">关于我们</a>
        </div>
        <div class="about-btn-box">
          <a class="about-btn" :href="contactUsUrl">联系方式</a>
        </div>
      </div>
      <!-- 中间的内容区域 -->
      <div id="content_area" class="">
        <div class="news_content" style="display:block">
          <div class="cooby-intro" v-html="aboutTxt">
          </div>
        </div>
      </div>
      <!-- 右边的内容区域 -->
      <div id="side_right">
        <downloadBox></downloadBox>
      </div>
      <shortcutBtn></shortcutBtn>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import pageHeader from "../base/header/header.vue"
  import shortcutBtn from "../base/common/shortcut_btn.vue"
  import downloadBox from "../base/right-aside/download_box.vue"
  import aboutUs from '@/store/modules/web/more/about-us.js'
  import { resolveUrl } from "@/util/common/url.js"
  export default {
    storeModule() {
      return { aboutUs }
    },
    asyncData({ store }) {
      return store.dispatch("aboutUs/fetchData");
    },
    components: {
      pageHeader,
      shortcutBtn,
      downloadBox
    },
    computed: {
      ...mapState("aboutUs", ["aboutTxt"]),
      aboutUsUrl() {
        return resolveUrl(this.$store, "/n/w/more/about-us")
      },
      contactUsUrl() {
        return resolveUrl(this.$store, "/n/w/more/contact-us")
      }
    }
  };
</script>
<style>
  #side_left {
    float: left;
    width: 10.1667%;
    min-height: 1000px;
    padding-top: 20px;
    /* box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.5); */
  }

  .news_content {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
  }

  .about-btn-box {
    width: 100%;
    padding: 17px 0;
  }

  .about-btn {
    display: block;
    width: 100%;
    height: 31px;
    line-height: 31px;
    color: #000;
    font-size: 16px;
    text-align: center;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
  }

  .about-btn-box.active {
    background: #FAFAFA;
  }

  .about-btn-box.active .about-btn {
    border-left: 3px solid #0082C6;
  }

  /* 
  可比简介
*/

  .cooby-intro {
    text-align: center;
  }

  .cooby-intro p {
    font-size: 15px;
    color: #17191A;
    text-indent: 32px;
    line-height: 25px;
    text-align: left;
    margin-top: 20px;
  }

  .cooby-intro img {
    margin-top: 24px;
  }

  .cooby-intro h2 {
    width: 100%;
    line-height: 1;
    font-size: 18px;
    color: #17191A;
    margin-top: 12px;
    text-align: left;
  }

  .cooby-intro h3 {
    width: 100%;
    line-height: 1;
    font-size: 18px;
    color: #17191A;
    margin-top: 12px;
  }
</style>