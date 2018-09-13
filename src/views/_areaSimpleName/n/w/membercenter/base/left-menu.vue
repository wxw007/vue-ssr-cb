<template>
  <div>
    <div v-for="menu in userMenuList" class="about-btn-box" :class="{'active':isCurrentRoute(menu.url)}" :key="menu.userTypeId" @click="routerPush(menu.url)">
      <span class="about-btn">{{menu.menuTypeName}}</span>
    </div>
  </div>
</template>
<script>
  import browser from '@/util/browser'
  import { resolveUrl } from "@/util/common/url.js"
  export default {
    props: {
      userMenuList: {
        default() {
          return [
            { userTypeId: "1", menuTypeName: "新闻收藏", url: resolveUrl(this.$store, "/n/w/membercenter") },
            { userTypeId: "2", menuTypeName: "生活订单", url: resolveUrl(this.$store, "/n/w/membercenter/order") },
            { userTypeId: "3", menuTypeName: "消息中心", url: resolveUrl(this.$store, "/n/w/membercenter/message") }
          ];
        }
      }
    },
    methods: {
      isCurrentRoute(path) {
        return this.$route.fullPath === path;
      },
      routerPush(path) {
        if (browser.isIE()) {
          window.location = path;
        } else {
          this.$router.push(path);
        }

      }
    }
  };
</script>
<style>
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
    cursor: pointer;
  }

  .about-btn-box.active {
    background: #fafafa;
  }

  .about-btn-box.active .about-btn {
    border-left: 3px solid #0082c6;
  }
</style>