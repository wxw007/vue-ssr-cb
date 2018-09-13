<template>
  <div class="selfdefining-list-container ">
    <div v-for="selfdefiningService in selfdefiningServiceList" class="selfdefining-item " :key="selfdefiningService.id">
      <a :href="selfdefiningService.url" target="_blank">
        <img v-lazy="selfdefiningService.titleImgUrl">
      </a>
      <div class="item_right ">
        <div class="item_headline clearfloat">
          <a :href="selfdefiningService.url" target="_blank">
            <h3>
              {{selfdefiningService.title}}
            </h3>
          </a>
          <p>{{selfdefiningService.subContent}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* 
   *自定义服务列表
   */
  export default {
    props: {
      selfdefiningServiceList: {
        default () {
          return [];
        }
      }
    }
  };
</script>

<style scoped>
  .selfdefining-list-container {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
  }
  /* 
   * 列表样式
   */

  .selfdefining-item {
    display: table;
    width: 100%;
    padding: 10px 0;
    border-bottom: 1px solid #f2f2f2;
  }

  .selfdefining-item>a {
    position: relative;
    text-align: center;
    width: 23%;
    height: 109px;
    display: table-cell;
    vertical-align: middle;
  }

  .selfdefining-item a img {
    width: 100%;
    max-height: 126px;
    border-radius: 4px;
  }

  .selfdefining-item .item_right {
    float: none;
    display: table-cell;
    vertical-align: middle;
    padding-left: 15px;
  }

  .selfdefining-item .item_headline {
    position: relative;
    width: 100%;
  }

  .selfdefining-item .item_headline a {
    width: 100%;
    max-height: 30px;
    overflow: hidden;
  }

  .selfdefining-item .item_headline a h3 {
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

  .selfdefining-item .item_headline p {
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
</style>