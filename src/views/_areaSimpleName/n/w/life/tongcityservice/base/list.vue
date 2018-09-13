<template>
  <div class="house-content ">
    <div v-for="tongcityService in tongcityServiceList" class="tongcity-item" :key="tongcityService.id">
      <a :href="tongcityService.url" target="_blank">
        <img v-lazy="tongcityService.titleImgUrl">
      </a>
      <div class="item_right ">
        <div class="item_headline clearfloat">
          <a :href="tongcityService.url" target="_blank">
            <h3>
              {{tongcityService.title}}
            </h3>
          </a>
          <p>{{tongcityService.subContent}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      tongcityServiceList: {
        default () {
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

  .tongcity-item {
    display: table;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #f2f2f2;
  }

  .tongcity-item>a {
    position: relative;
    text-align: center;
    width: 23%;
    height: 109px;
    display: table-cell;
    vertical-align: middle;
  }

  .tongcity-item a img {
    width: 100%;
    max-height: 126px;
    border-radius: 4px;
  }

  .tongcity-item .item_right {
    float: none;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
  }

  .tongcity-item .item_headline {
    position: relative;
    width: 100%;
  }

  .tongcity-item .item_headline a {
    width: 100%;
    max-height: 30px;
    overflow: hidden;
  }

  .tongcity-item .item_headline a h3 {
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

  .tongcity-item .item_headline p {
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
</style>