<template>
  <div class="house-content ">
    <a v-for="travel in travelList" :key="travel.travelId" class="house-item" :href="travel.url" target="_blank">
      <img :src="travel.titleImgUrl" alt="">
      <div class="item_right ">
        <div class="item_headline clearfloat">
          <h3>
            {{travel.title}}
          </h3>
          <p>{{travel.subContent}}</p>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
  export default {
    props: {
      travelList: {
        default() {
          return [];
        }
      }
    }
  };
</script>
<style scoped>
  .house-content {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
  }

  /* 
     * 新闻列表的样式
     */

  .house-item {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #f2f2f2;
    display: block;
  }

  .house-item img {
    width: 22.727%;
    height:auto;
  }

  .house-item .item_right {
    float: right;
    width: 74.29%;
    height: 100%;
    padding-top: 2%;
  }

  .house-item .item_headline {
    position: relative;
    width: 100%;
  }

  .house-item .item_headline h3 {
    width: 100%;
    height: 21px;
    line-height: 20px;
    margin-bottom: 4%;
    font-size: 18px;
    color: #17191a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }


  .house-item .item_headline p {
    font-size: 15px;
    color: #666;
    line-height: 20px;
    height: 40px;
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