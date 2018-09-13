<template>
  <!-- 新闻列表 -->
  <div class="new_list">

    <div class="news-list-item clearfloat" v-for="msg in msgList" :key="msg.mmId">

      <!-- "mmTitle": "恭喜您抽中了70积分！",
            "mmType": "2",
            "haveCode": "0",
            "isDeleted": "0",
            "mmTypeName": "中奖通知",
            "mmId": "C1485337192350",
            "isRead": "1",
            "inputTime": 1485558633000,
            "mmCode": null -->
      <template>
        <!-- 无图新闻 -->
        <div class="item-headline hide-p">
          <h3>【{{msg.mmTypeName}}】   {{msg.mmTitle}}</span></h3>
          <span class="time">{{msg.inputTime | timezoneconvert}}</span>
          <p>{{msg.mmContent}}</p>
          <!--
          <div class="item-msg" @click="showP($event)">
            <span>查看全文
              <i></i>
            </span>
          </div> -->
        </div>
      </template>
    </div>
  </div>
</template>
<script>
  /** 
       * 新闻列表
       * @author wzw 
       * @author jiemin
       * @date 2017-12-20
       */
  import timezoneconvert from "@/util/filter/timezoneconvert";
  export default {
    props: {
      msgList: {
        default() {
          return []
        }
      }
    },
    data() {
      return {};
    },
    filters: {
      timezoneconvert
    },
    methods: {
      showP(e) {
        var target = e.target;
        if (target.nodeName == "I") {
          target = target.parentNode.parentNode.parentNode;
        } else if (target.nodeName == "SPAN") {
          target = target.parentNode.parentNode;
        } else if (target.nodeName == "DIV") {
          target = target.parentNode;
        }
        var cls = target.getAttribute("class");
        if (!!~cls.indexOf("hide-p")) {
          target.setAttribute("class", "item-headline show-p");
        } else if (!!~cls.indexOf("show-p")) {
          target.setAttribute("class", "item-headline hide-p");
        }
      }
    }
  };
</script>


<style>
  /* 
     * 新闻列表的样式
     */

  .news-list-item {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #f2f2f2;
  }

  .news-list-item img {
    width: 22.727%;
    height:auto;
  }

  .news-list-item .item-headline {
    position: relative;
    width: 100%;
  }

  .news-list-item .item-headline h3 {
    display: inline-block;
    width: 89.4886%;
    height: 20px;
    line-height: 20px;
    margin-bottom: 15px;
    font-size: 18px;
    /* color: #17191a; */
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding-left: 30px;
    background: url("~@/assets/web/system-msg-icon.png") no-repeat top left;
    background-size: 20px 20px;
    color: #0082c6;
  }

  .news-list-item .item-headline .time {
    float: right;
    font-size: 14px;
    color: #999999;
  }

  .news-list-item .item-headline h3 a {
    width: 100%;
    height: 18px;
    line-height: 19px;
    margin-bottom: 15px;
    font-size: 18px;
    color: #17191a;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .news-list-item .item-headline p {
    font-size: 14px;
    line-height: 24px;
    color: #17191a;
    padding-left: 30px;
    overflow: hidden;
  }

  .news-list-item .item-headline.hide-p p {
    max-height: 72px;
  }

  .news-list-item .item-headline .item-msg {
    float: right;
    width: 95.7386%;
    position: relative;
    height: 30px;
    line-height: 15px;
    padding-top: 5px;
  }

  .news-list-item .item-headline .item-msg span {
    float: left;
    display: inline-block;
    height: 15px;
    line-height: 16px;
    font-size: 12px;
    color: #0082c6;
    cursor: pointer;
  }

  .news-list-item .item-headline .item-msg i {
    float: none;
    display: inline-block;
    width: 9px;
    height: 100%;
    margin-left: 6px;
    background-color: #000;
    vertical-align: sub;
  }

  .news-list-item .item-headline.show-p .item-msg i {
    background: url("~@/assets/web/hide-p.png") no-repeat center center;
    background-size: 9px 6px;
  }

  .news-list-item .item-headline.hide-p .item-msg i {
    background: url("~@/assets/web/show-p.png") no-repeat center center;
    background-size: 9px 6px;
  }
</style>