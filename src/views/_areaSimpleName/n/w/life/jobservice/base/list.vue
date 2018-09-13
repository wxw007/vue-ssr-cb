<template>
  <div class="job-list-container ">
    <div v-for="jobService in jobServiceList" :key="jobService.id" class="job-item">
      <div class="item_headline clearfloat">
          <a :href="jobService.url" target="_blank">{{jobService.title}}</a>
        <div class="item_msg" v-if="jobService.jobName&&jobService.wageDemand">
          <span class="job-addr">{{jobService.jobName}}</span>
          <span class="money-or-call">{{jobService.wageDemand}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* 
   *求职列表样式
   */
  export default {
    props: {
      jobServiceList: {
        default () {
          return []
        }
      }
    }
  };
</script>
<style scoped>
  .job-list-container {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
  }
  /* 
   * 列表的样式
   */

  .job-item {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #f2f2f2;
  }

  .job-item a {
    display: table-cell;
    width: 14.9%;
    vertical-align: middle;
  }

  .job-item img {
    width: 100%;
    height: auto;
    /* max-height: 109px; */
    max-height: 124px;
  }

  .job-item .item_right {
    float: none;
    width: 50%;
    vertical-align: middle;
    display: table-cell;
    padding-top: 0;
    padding-left: 2.9%;
  }

  .job-item .item_headline {
    position: relative;
    width: 100%;
  }


  .job-item .item_headline a {
    width: 100%;
    height: 21px;
    line-height: 20px;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight:600;
    color: #17191a;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .job-item .item_headline p {
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

  .job-item .item_headline .item_msg {
    position: relative;
    height: 25px;
    line-height: 15px;
    padding-top: 10px;
  }

  .job-item .item_headline .item_msg span {
    float: left;
    display: inline-block;
    height: 15px;
    line-height: 16px;
    font-size: 12px;
  }

  .job-item .item_headline .item_msg .job-addr {
    font-size: 15px;
    color: #666;
  }

  .job-item .item_headline .item_msg .money-or-call {
    float: right;
    color: #ed4242;
    font-size: 18px;
  }
</style>