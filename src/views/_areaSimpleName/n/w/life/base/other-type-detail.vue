<template>
  <div class="life-detail-info other-type">
    <div class="life-info-item contact">
      <b>联系人&nbsp;：</b>
      <span>小陈</span>
    </div>
    <div class="life-info-item contact">
      <b>联系人&nbsp;：</b>
      <span>小陈</span>
    </div>
    <div class="life-info-item contact">
      <b>联系人&nbsp;：</b>
      <span>小陈</span>
    </div>
    <div class="life-info-item contact">
      <b>联系人&nbsp;：</b>
      <span>小陈</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      hasImg: {
        //信息展示的类型，1是左图右字，2是上字下图，默认为2
        type: Boolean,
        // default:false,
        default: true
      },
      infoObj: {
        default() {
          return {
            infoForm: {
              addr: "福建省福州市鼓楼区福州市鼓楼区福州 市鼓楼区",
              bsnHours: "周一至周六10:00-21:00",
              serve: [{ takeOut: true }, { reserve: true }, { creditCard: true }],
              phone: "50316900"
            }
          };
        }
      }
    },
    data() {
      return {
      };
    },
    beforeMount() {
    },
    methods: {
      /* 
          生活详情的图片列表
       */
    }
  };
</script>


<style>
  /* 
    type2条件，要求等样式
 */

  .life-detail-info.other-type {
    min-height: 0;
    width: 100%;
    margin-top: 40px;

  }

  .other-type .life-info-item {
    display: inline-block;
    width: 50%;
    margin-bottom: 30px;
  }

  .other-type .life-info-item b {
    line-height: 1;
    font-size: 18px;
    color: #17191a;
  }

  .other-type .life-info-item span {
    line-height: 1;
    font-size: 18px;
    color: #17191a;
  }

  /* 
    显示当前被选中的图片的盒子样式
 */

  .other-show-img-box {
    z-index: 15;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .other-show-img-box img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
</style>