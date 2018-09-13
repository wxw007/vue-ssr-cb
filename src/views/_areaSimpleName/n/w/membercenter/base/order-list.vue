<template>
  <div class="order-content ">
    <div v-for="service in serviceList" :key="service.id" class="order-item">
      <img :src="service.titleImgUrl">
      <div class="item_right ">
        <div class="item_headline clearfloat">
          <h3>
            <a :href="service.url" target="_blank">
              {{service.title}}
            </a>
          </h3>
          <p>{{service.inputTime | timezoneconvert}}</p>
          <div class="item_msg">
            <span class="state-type" v-if="service.serviceState=='1'">待审核</span>
            <span class="state-type" v-else-if="service.serviceState=='2'">审核不通过</span>
            <span class="state-type" v-else-if="service.serviceState=='3'">审核通过</span>
            <span class="do-btn" @click="edit(service)">编辑</span>
            <span class="do-btn" @click="del(service)">删除</span>

            <template v-if="service.serviceState=='3'">
              <span v-if="service.isPut == '0'" class="do-btn" @click="up(service)">
                上架
              </span>
              <span v-else class="do-btn" @click="down(service)">
                下架
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { resolveUrl } from '@/util/common/url.js'
  import timezoneconvert from '@/util/filter/timezoneconvert'
  export default {
    props: {
      serviceList: {
        default() {
          return [];
        }
      }
    },
    data() {
      return {
      };
    },
    filters: {
      timezoneconvert
    },
    methods: {
      up(service) {
        this.$store.dispatch("memberLifeService/up", service)
          .then(response => {
            let result = response.data;
            if (result.success) {
              service.isPut = '1';
            }
          })
      },
      down(service) {
        this.$store.dispatch("memberLifeService/down", service).then(response => {
          let result = response.data;
          if (result.success) {
            service.isPut = '0';
          }
        })
      },
      edit(service) {
            switch (service.moduleId) {
                case '1': //美食天地
                    window.location.href = resolveUrl(this.$store, '/n/w/life/foodservice/addView?id=') + service.id
                    break;
                case '4': //招聘
                    window.location.href = resolveUrl(this.$store, '/n/w/life/recruitservice/addView?id=') + service.id
                    break;
                case '5': //求职
                    window.location.href = resolveUrl(this.$store, '/n/w/life/jobservice/addView?id=') + service.id
                    break;
                case '6': //房产信息
                    window.location.href = resolveUrl(this.$store, '/n/w/life/housingservice/addView?id=') + service.id
                    break;
                case '8': //同城服务
                    window.location.href = resolveUrl(this.$store, '/n/w/life/tongcityservice/addView?id=') + service.id
                    break;
                case '9': //自定义
                    window.location.href = resolveUrl(this.$store, '/n/w/life/selfdefiningservice/addView?id=') + service.id
                    break;
                default:
                    break;
            }
        },
      del(service) {
        this.$store.dispatch("memberLifeService/del", service)
          .then(response => {
            this.serviceList.splice(this.serviceList.indexOf(service), 1)
          })
      }
    }
  };
</script>
<style scoped>
  .order-content {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
  }

  /* 
     * 新闻列表的样式
     */

  .order-item {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #f2f2f2;
  }

  .order-item img {
    /* width: 22.727%; */
    width: 160px;
    height: 124px;
  }

  .order-item .item_right {
    position: relative;
    float: right;
    width: 74.29%;
    height: 124px;
    padding-top: 6px;
  }

  .order-item .item_headline {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .order-item .item_headline h3 {
    width: 100%;
    height: 52px;
    line-height: 26px;
    font-size: 18px;
    color: #17191a;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .order-item .item_headline h3 a {
    width: 100%;
    height: 52px;
    line-height: 26px;
    font-size: 18px;
    color: #17191a;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .order-item .item_headline p {
    font-size: 14px;
    color: #666;
    line-height: 23px;
    height: 23px;
    overflow: hidden;
  }

  .order-item .item_headline .item_msg {
    position: absolute;
    width: 100%;
    height: 24px;
    line-height: 15px;
    /* padding-top: 10px; */
    bottom: 10px;
  }

  .order-item .item_headline .item_msg span {
    float: left;
    display: inline-block;
    height: 15px;
    line-height: 16px;
    font-size: 12px;
  }

  .order-item .item_headline .item_msg .state-type {
    font-size: 15px;
    margin-top: 10px;
    color: #0082C6;
  }

  .order-item .item_headline .item_msg .do-btn {
    float: right;
    display: block;
    width: 64px;
    height: 24px;
    line-height: 24px;
    font-size: 15px;
    color: #fff;
    background: #0082C6;
    text-align: center;
    margin-left: 17px;
    border-radius: 2px;
    cursor: pointer;
  }
</style>