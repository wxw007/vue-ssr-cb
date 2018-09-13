<template>
  <div id="side_left">
    <leftLogo></leftLogo>

    <!-- <img src="~@/assets/web/delete/2121.png" alt=""> -->
    <affix>
      <div class="news_list">
        <span class="menu_item news_item " @click="routerPush(indexUrl)">
          <i>新闻</i>
        </span>
      </div>
      <div class="life_list">
        <router-link class="menu_item life_item " :to="lifeIndexUrl"  :class="{'active':isCurrentRoute(lifeIndexUrl)}">
          <i>生活</i>
        </router-link>
        <ul class="menu_list">
          <router-link class="menu_item" v-for="lifeModule in firstLifeModuleList" :key="lifeModule.lmId" :to="lifeModule.url" :class="{'active':isCurrent(lifeModule.lmId)}">
            {{lifeModule.lmName}}
          </router-link>
        </ul>
        <span class="menu_item more-hover" v-if="moreLifeModuleList.length > 0" style="overflow: inherit;">
          更多
          <!-- <div class="user-subscription-box clearFloat more-subscription-box" v-show="showMoreSubscription"> -->
          <div class="user-subscription-box clearFloat more-subscription-box">
            <div class="un-subscription-list">
              <span v-for="lifeModule in moreLifeModuleList" :key="lifeModule.lmId" @click="routerPush(lifeModule.url)" :class="{'more-infotype-active':isCurrent(lifeModule.lmId)}">
                {{lifeModule.lmName}}</span>
            </div>
          </div>
        </span>
      </div>
    </affix>
  </div>
</template>
<script>
  import leftLogo from "../../base/left-aside/left-logo.vue"
  import browser from '@/util/browser'
  import affix from '../../base/common/affix.vue'
  import { resolveUrl } from "@/util/common/url.js"

  export default {
    props: {
      lifeModuleList: {
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        showMoreSubscription: false,
        isSubscription: false,
        copyInfoTypeList: [], //已订阅列表的第二次复制
        copyUnSubscriptionList: [] //未订阅列表的第二次复制
      };
    },
    computed: {
      firstLifeModuleList() {
        if (this.lifeModuleList != null) {
          let newLifeModuleList = [];
          let length = Math.min(this.lifeModuleList.length, 7);
          for (let i = 0; i < length; i++) {
            newLifeModuleList.push(this.lifeModuleList[i]);
          }
          return newLifeModuleList;
        }
        return [];
      },
      moreLifeModuleList() {
        if (this.lifeModuleList != null && this.lifeModuleList.length > 7) {
          let newLifeModuleList = [];
          for (let i = 7; i < this.lifeModuleList.length; i++) {
            newLifeModuleList.push(this.lifeModuleList[i]);
          }
          return newLifeModuleList;
        }
        return [];
      },
      indexUrl(){
        return resolveUrl(this.$store, "/n/w")
      },
      lifeIndexUrl() {
        return resolveUrl(this.$store, "/n/w/life")
      }
    },
    components: {
      leftLogo,
      affix
    },
    methods: {
      isCurrentRoute(url) {
        return this.$route.fullPath == url;
      },
      isCurrent(lmId) {
        return this.$route.query.lmId == lmId
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
  #side_left .menu_item {
    color: #444;
  }
</style>