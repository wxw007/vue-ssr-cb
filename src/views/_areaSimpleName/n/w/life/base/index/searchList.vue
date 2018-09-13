<template>
    <div class="food-list-container ">
        <div v-show="searchList.length>0" class="food-list-item clearfloat" v-for="item in searchList" :key="item.serviceId">
            <a @click="gotoUrl(item.gotoUrl)" target="_blank">
                <img v-lazy="item.titleImgUrl">
            </a>
            <div class="item_right">
                <div class="item_headline">
                    <a  @click="gotoUrl(item.gotoUrl)" target="_blank">
                        <h3 v-html="item.title">
                           
                        </h3>
                    </a>
                    <p>{{item.subContent}}</p>
                </div>
            </div>
        </div>
        <div v-show="searchList.length == 0" class="no-info">
            <img src="../img/no-info.png" alt="">
            <p class="t1">没有找到相关的内容~</p>
            <p class="t2">换成其他关键词试试</p>
        </div>
    </div>
</template>
<script>
    /* 
     *搜索结果列表(借用了美食列表的样式)
     */
    export default {
        props: {
            searchList: {
                default () {
                    return [];
                }
            }
        },
        data(){
            return{
              pageSearchList: []
            }
        },
        methods:{
            gotoUrl(url){
                window.open(url);
            }
        }
    }
</script>
<style scoped>
a{
    cursor: pointer;
}
    .food-list-container {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: all 0.8s ease-in-out;
    }
    /* 生活服务列表样式 */

    .food-list-item {
        display: table;
        width: 100%;
        padding: 10px 0;
        border-bottom: 1px solid #f2f2f2;
    }


    .food-list-item>a {
        position: relative;
        text-align: center;
        width: 23%;
        height: 109px;
        display: table-cell;
        vertical-align: middle;
      }
    
      .food-list-item a img {
        width: 100%;
        max-height: 126px;
        border-radius: 4px;
      }
    
      .food-list-item .item_right {
        float: none;
        display: table-cell;
        vertical-align: middle;
        padding-left: 15px;
      }
    
      .food-list-item .item_headline {
        position: relative;
        width: 100%;
      }
    
      .food-list-item .item_headline a {
        width: 100%;
        max-height: 30px;
        overflow: hidden;
      }
    
      .food-list-item .item_headline a h3 {
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

    .food-list-item .item_headline p {
        font-size: 14px;
        line-height: 20px;
        color: #666;
        max-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .food-list-item .item_headline .item_msg {
        position: relative;
        height: 30px;
        line-height: 15px;
        padding-top: 15px;
    }

    .food-list-item .item_headline .item_msg i {
        float: left;
        display: inline-block;
        width: 31px;
        height: 15px;
        margin-right: 20px;
    }

    .food-list-item .item_headline .item_msg span {
        float: left;
        display: inline-block;
        height: 15px;
        line-height: 16px;
        font-size: 14px;
    }

    .food-list-item .item_headline .item_msg span:nth-of-type(1) {
        margin-right: 20px;
    }

    .food-list-item .item_headline .item_msg span.right {
        float: right;
        color: #ed4242;
        font-size: 16px;
        font-weight: 800;
        margin-right: 0;
    }
    .no-info{
        margin-top: 130px;
        text-align: center;
    }
    .no-info img{
        width: 268px;
    }
    .no-info p{
        font-size: 18px;
    }
    .no-info .t1{
        color: #4aafe1;
    }
    .np-info .t2{
        color: #ccc;
    }
</style>