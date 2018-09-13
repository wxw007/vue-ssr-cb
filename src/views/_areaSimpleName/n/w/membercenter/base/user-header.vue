<template>
  <div id="user-header">
    <div class="hrtt-bg">
      <!-- <img src="~@/assets/web/user-center-bg.png" alt=""> -->
    </div>
    <div class="content">
      <div class="user-info">
        <div class="user-img">
          <div class="user-img-box">
            <img :src="member.memberSmallImg" alt="">
          </div>
        </div>
        <div class="user-msg-box">
          <h2 class="user-name">{{member.memberPetName}}</h2>
          <p class="user-intro">{{member.signature}}</p>
        </div>
        <a class="edit-user-data" :href="editUrl" target="_blank">
          编辑个人资料
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex"
  import { resolveUrl } from "@/util/common/url.js"
  export default {
    name: "web-user-header",
    computed: {
      ...mapState("head", ["member"]),
      editUrl() {
        return resolveUrl(this.$store, "/n/w/membercenter/edit")
      }
    }
  };
</script>
<style scoped>
  /* 
     *页面顶部导航条样式
     */

  #user-header {
    width: 100%;
  }

  .hrtt-bg {
    height: 180px;
    /* background-color: #0082c6; */
    background: url("~@/assets/web/user-center-bg.png") no-repeat center center;
    background-size: cover;
  }

  .user-info {
    position: relative;
    height: 94px;
    background-color: #fafafa;
  }

  .user-img {
    float: left;
    position: relative;
    width: 12%;
    height: 100%;
  }

  .user-img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .user-img .user-img-box {
    position: absolute;
    width: 91px;
    height: 91px;
    left: 0;
    right: 0;
    top: -22px;
    margin: 0 auto;
    border: 4px solid #fff;
    border-radius: 50%;
    background-color: #fff;
  }

  .user-msg-box {
    float: right;
    width: 88%;
  }

  .user-msg-box .user-name {
    line-height: 1;
    font-size: 18px;
    color: #17191a;
    margin-top: 17px;
  }

  .user-msg-box .user-intro {
    height: 48px;
    font-size: 14px;
    color: #17191a;
    line-height: 24px;
    overflow: hidden;
    margin-top: 10px;
  }

  .edit-user-data {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 19px;
    margin: auto 0;
    width: 111px;
    height: 36px;
    line-height: 36px;
    background: #0082C6;
    font-size: 16px;
    color: #fff;
    text-align: center;
  }
</style>