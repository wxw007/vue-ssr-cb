<template>
  <div class="house-list-container ">
    <div v-for="housingService in housingServiceList" :key="housingService.id" class="house-item">
      <a :href="housingService.url" target="_blank">
        <img v-lazy="housingService.titleImgUrl">
      </a>
      <div class="item_right ">
        <div class="item_headline clearfloat">
          <a :href="housingService.url" target="_blank">
            <h3>
              {{housingService.title}}
            </h3>
          </a>
          <p>{{housingService.subContent}}</p>
          <div class="item_msg">
            <span class="house-type">{{housingService.rentalTypeName}}</span>
            <span class="money-or-call">{{housingService.price}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* 
   *房屋生活列表的样式
   */
  export default {
    props: {
      housingServiceList: {
        default () {
          return []
        }
      }
    }
  };
</script>
<style scoped>
  .house-list-container {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
  }
  /* 
   * 列表的样式
   */

  .house-item {
    display: table;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f2;
  }


  .house-item>a {
    position: relative;
    text-align: center;
    width: 23%;
    height: 109px;
    display: table-cell;
    vertical-align: middle;
  }

  .house-item a img {
    width: 100%;
    max-height: 126px;
    border-radius: 4px;
  }

  .house-item .item_right {
    float: none;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
  }

  .house-item .item_headline {
    position: relative;
    width: 100%;
  }

  .house-item .item_headline a {
    width: 100%;
    max-height: 30px;
    overflow: hidden;
  }

  .house-item .item_headline a h3 {
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

  .house-item .item_headline p {
    font-size: 15px;
    color: #666;
    line-height: 20px;
    max-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .house-item .item_headline .item_msg {
    position: relative;
    height: 25px;
    line-height: 15px;
    padding-top: 10px;
  }

  .house-item .item_headline .item_msg span {
    float: left;
    display: inline-block;
    height: 15px;
    line-height: 16px;
    font-size: 12px;
  }

  .house-item .item_headline .item_msg .house-type {
    font-size: 15px;
    color: #666;
  }

  .house-item .item_headline .item_msg .money-or-call {
    float: right;
    color: #ed4242;
    font-size: 18px;
  }

  .house-item .item_headline .item_msg span:nth-of-type(1) {
    margin-right: 20px;
  }
</style>