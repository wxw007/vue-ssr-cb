<template>
  <!-- 中间的内容区域 -->
  <div class="life-content-container">
    <bigImgBox v-if="hasImg"></bigImgBox>

    <div class="life-detail-box " :class="{'other-type':!hasImg}">
      <div class="life-info-item money">
        <span>{{foodService.price}}</span>
      </div>
      <div class="life-info-item ">
        <b>地址&nbsp;：</b>
        <span>{{foodService.contacter}}</span>
      </div>
      <div class="life-info-item ">
        <b>营业时间&nbsp;：</b>
        <span>{{foodService.contacter}}</span>
      </div>
      <div class="life-info-item ">
        <b>特殊服务&nbsp;：</b>
        <ul class="special-service-box">
          <li>外卖</li>
          <li>预定</li>
          <li>信用卡</li>
        </ul>
      </div>
      <div class="phone-box" v-if="">
        <b class="phone-icon"></b>
        <span>{{foodService.tel}}</span>
      </div>
    </div>
    
  </div>
</template>
<script>
  import bigImgBox from './bigImgBox.vue'

  export default {
    props: {
      hasImg: {
        //信息展示的类型，1是左图右字，2是上字下图，默认为2
        type: Boolean,
        default: false,
        // default:true,
      },
      foodService: {
        default() {
          return {
            price: "666",
            contacter: "小陈",
            tel: "5555555"
          }
        }

      }
    },
    data() {
      return {
      };
    },
    components: {
      bigImgBox
    }
  };
</script>
<style src="./food-housing.css"></style>
<style>
  

</style>