<template>
  <div class="travel-content ">
    <div v-for="travelStrategy in travelStrategyList" :key="travelStrategy.strategyId" class="travel-item">
      <a :href="travelStrategy.url" target="_blank" class="">
        <img :src="travelStrategy.titleImage">
      </a>
      <div class="item_right ">
        <div class="item_headline clearfloat">
          <a :href="travelStrategy.url" target="_blank">
            <h3>
              {{travelStrategy.strategyTitle }}
            </h3>
          </a>
          <p>{{travelStrategy.subContent }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      travelStrategyList: {
        default () {
          return [];
        }
      }
    }
  };
</script>
<style scoped>
  .travel-content {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
  }
  /* 
   * 新闻列表的样式
    */

  .travel-item {
    display: table;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #f2f2f2;
  }

  .travel-item>a {
    position: relative;
    text-align: center;
    width: 23%;
    height: 109px;
    display: table-cell;
    vertical-align: middle;
  }

  .travel-item a img {
    width: 100%;
    max-height: 126px;
    border-radius: 4px;
  }

  .travel-item .item_right {
    float: none;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
  }

  .travel-item .item_headline {
    position: relative;
    width: 100%;
  }

  .travel-item .item_headline a {
    width: 100%;
    max-height: 30px;
    overflow: hidden;
  }

  .travel-item .item_headline a h3 {
    color: #333;
    font-size: 18px;
    line-height: 1.1;
    overflow: hidden;
    text-decoration: none;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    margin-bottom: 10px;
    -webkit-box-orient: vertical;
  }


  .travel-item .item_headline p {
    font-size: 15px;
    color: #666;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
  }

  .travel-item .item_headline .item_msg {
    position: relative;
    height: 25px;
    line-height: 15px;
    padding-top: 10px;
  }

  .travel-item .item_headline .item_msg span {
    float: left;
    display: inline-block;
    height: 15px;
    line-height: 16px;
    font-size: 12px;
  }

  .travel-item .item_headline .item_msg .travel-type {
    font-size: 15px;
    color: #666;
  }

  .travel-item .item_headline .item_msg .money-or-call {
    float: right;
    color: #ed4242;
    font-size: 18px;
  }

  .travel-item .item_headline .item_msg span:nth-of-type(1) {
    margin-right: 20px;
  }
</style>