<template>
  <div class="subscription-box" ref="subscriptionBox">
    <div class="news_list">
      <router-link class="menu_item news_item " :to="indexUrl"  :class="{'active':isCurrentRoute(indexUrl)}">
        <i >新闻</i>
      </router-link>
      <ul class="menu_list">
        <router-link class="menu_item" v-for="infoType in firstInfoTypeList" :key="infoType.infoTypeId" :to="infoType.url" :class="{'active':isCurrentRoute(infoType.url)}">
          {{infoType.infoTypeName}}
        </router-link>
      </ul>
      <span class="menu_item more-hover" v-if="moreInfoTypeList.length > 0" style="overflow: inherit;">
        更多
        <!-- <div class="user-subscription-box clearFloat more-subscription-box" v-show="showMoreSubscription"> -->
        <div class="user-subscription-box clearFloat more-subscription-box">
          <div class="un-subscription-list">
            <span v-for="infoType in moreInfoTypeList" :key="infoType.infoTypeId" @click="routerPush(infoType.url)" :class="{'more-infotype-active':isCurrentRoute(infoType.url)}">
              {{infoType.infoTypeName}}</span>
          </div>
        </div>
      </span>
      <span class="menu_item add_item" style="overflow: inherit;" @click="showSubscriptionBox">
        <i></i>
      </span>
    </div>
    <div class="life_list" v-if="isShowLifeService == '1'">
      <router-link class="menu_item life_item" :to="lifeIndexUrl">
        <i>生活</i>
      </router-link>
    </div>

    <div @click.stop class="user-subscription-box clearFloat bottom" v-show="isSubscription">
      <i class="close-subscription" @click="showSubscriptionBox"></i>
      <h3>已选频道</h3>
      <draggable v-model="copyInfoTypeList" class="subscription-list" style="width:500px;">
        <span v-for="(list,index) in copyInfoTypeList" :infoTypeId="list.infoTypeId" :key="list.infoTypeId">{{list.infoTypeName}}
          <i @click.stop="delSubscriptionItem(index)"></i>
        </span>
      </draggable>
      <h3>更多频道</h3>
      <div class="un-subscription-list">
        <span v-for="(unlist,index) in copyUnSubscriptionList" :infoTypeId="unlist.infoTypeId" :key="unlist.infoTypeId" @click="addSubscriptionItem(index)">
          <i></i>{{unlist.infoTypeName}}</span>
      </div>
      <span class="subscription-btn" @click="confirmSubscription">确定</span>
    </div>
  </div>
</template>
<script>
  import {
    userSubscriptionData
  } from '@/api/web'
  import browser from '@/util/browser'
  import draggable from 'vuedraggable'
  import { resolveUrl } from "@/util/common/url.js"
  export default {
    props: {
      infoTypeList: { //已订阅的生活列表
        default() {
          return [];
        }
      }, //已订阅的生活列表
      unSubscriptionList: {
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
        copyUnSubscriptionList: [],//未订阅列表的第二次复制
        isShowLifeService: null
      }
    },
    created(){
      this.isShowLifeService = this.$store.state.head.curArea.isShowLifeService
    },
    computed: {
      firstInfoTypeList() {
        if (this.infoTypeList != null) {
          let newInfoTypeList = [];
          let length = Math.min(this.infoTypeList.length, 7);
          for (let i = 0; i < length; i++) {
            newInfoTypeList.push(this.infoTypeList[i]);
          }
          return newInfoTypeList;
        }
        return [];
      },
      moreInfoTypeList() {
        if (this.infoTypeList != null && this.infoTypeList.length > 7) {
          let newInfoTypeList = [];
          for (let i = 7; i < this.infoTypeList.length; i++) {
            newInfoTypeList.push(this.infoTypeList[i]);
          }
          return newInfoTypeList;
        }
        return [];
      },
      lifeIndexUrl() {
        return resolveUrl(this.$store, "/n/w/life")
      },
      indexUrl() {
        return resolveUrl(this.$store, "/n/w")
      }
    },
    components: {
      draggable
    },
    methods: {
      showSubscriptionBox() {
        //关闭或显示订阅框
        this.isSubscription = this.isSubscription ? false : true;
        if (this.isSubscription) {
          //显示订阅框
          this.copyInfoTypeList = this.clone(this.infoTypeList); //将数据复制一份
          this.copyUnSubscriptionList = this.clone(this.unSubscriptionList); //将数据复制一份
          this.copyInfoTypeList = this.copyInfoTypeList.filter(infoType => {
            return !infoType.readonly;
          });
        }
      },

      confirmSubscription() {
        //确定修改栏目
        this.isSubscription = this.isSubscription ? false : true;
        this.setSubscriptionData(this.copyInfoTypeList); //保存的时候，将用户的订阅保存在本地
      },
      /**
       * 添加订阅的栏目
       */
      addSubscriptionItem(index) {
        this.copyInfoTypeList.push(
          this.copyUnSubscriptionList.splice(index, 1)[0]
        );
      },
      delSubscriptionItem(index) {
        if (this.copyInfoTypeList.length <= 3) {
          alert("订阅数不能少于3个");
          return;
        }
        //删除订阅的栏目
        this.copyUnSubscriptionList.push(
          this.copyInfoTypeList.splice(index, 1)[0]
        );
      },
      isCurrentRoute(path) {
        return this.$route.fullPath === path;
      },
      routerPush(path) {
        if (browser.isIE()) {
          window.location = path;
        } else {
          this.$router.push(path);
        }
      },
      toLifeIndex() {
        this.$router.push(resolveUrl(this.$store, "/n/w/life"));
      },
      setSubscriptionData(obj) {
        var arr = [];
        for (var i in obj) {
          arr.push(obj[i]["infoTypeId"]);
        }
        var objs = {
          "infoTypeIds": arr
        }
        userSubscriptionData(objs).then(response => {
          let result = response.data;
          if (result.success) {
            this.$store.commit("infoIndexTemplate/setSubscription", response.data.data)
          }
        })
      },
      clone(obj) {
        var newObj;
        if (typeof obj == "object") {
          if (obj === null) {
            obj = null;
          } else {
            if (obj instanceof Array) {
              newObj = [];
              for (var i = 0, len = obj.length; i < len; i++) {
                newObj.push(this.clone(obj[i]));
              }
            } else {
              newObj = {};
              for (var j in obj) {
                newObj[j] = this.clone(obj[j]);
              }
            }
          }
        } else {
          return obj;
        }
        return newObj;
      }
    }
  };
</script>
<style>
  #side_left .menu_item {
    color: #444;
  }
</style>
<!-- <style src="../static/css/left_sidenav.css"></style> -->