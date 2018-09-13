<template>
    <indexTemplate>
         <div class="msg-nav-tab">
                <ul class="tab_btn">
                    <li v-for="(navTab,index) in navTabList" :class="{'active':navTab==nowTab}" @click="changeTab(navTab, index)">{{navTab}}</li>
                </ul>
            </div>
        <infiniteScroll @loadMore="loadMore" ref="infiniteScroll">
            <orderList style="margin-top:-20px" v-show="nowTab=='生活发布'" :serviceList="serviceList"></orderList>
            <travelList style="margin-top:-20px" v-show="nowTab=='旅游订单'" :travelList="travelApplyList"></travelList>
        </infiniteScroll>
      
       
    </indexTemplate>
</template>
<script>
    import { mapState } from 'vuex'

    import orderList from "./base/order-list.vue"
    import travelList from "./base/travel-order-list.vue"

    import indexTemplate from './base/layouts/index-template.vue'

    import memberLifeService from '@/store/modules/web/membercenter/order.js'
    export default {
        storeModule() {
            return { memberLifeService };
        },
        asyncData({ store }) {
            return store.dispatch("memberLifeService/fetchData");
        },
        data() {
           return {
            navTabList: [
                "生活发布",
                "旅游订单"
            ],
            nowTab: "生活发布",
            firstClick: true
           }
        },
        computed: {
            ...mapState("memberLifeService", ["serviceList", "travelApplyList"])
        },
        components: {
            indexTemplate,
            orderList,
            travelList,
            infiniteScroll: () => import('../base/common/infinite-scroll.vue')
        },
        methods: {
            changeTab(name, index) {
                this.nowTab = name;
                if(index == 1 && this.firstClick){
                    this.$store.dispatch("memberLifeService/fetchTravelList");
                    this.firstClick = false
                }
                this.$refs.infiniteScroll.reset();
            },
            loadMore(callback) {
                if (this.nowTab == "生活发布") {
                    callback(this.$store.dispatch("memberLifeService/fetchMore"), this.serviceList);
                }
                //  else {  旅游订单不分页
                //     console.log('旅游订单加载更多... ')
                //     callback(this.$store.dispatch("memberLifeService/fetchMoreTravelList"), this.travelApplyList);
                // }
            }
        }
    };
</script>

<style>
    /* 
          分页面的tab切换按钮样式
      */

    .msg-nav-tab {
        width: 100%;
        font-size: 16px;
        margin-bottom: 18px;
    }

    .msg-nav-tab .tab_btn {
        display: block;
        width: 100%;
        height: 36px;
        border-bottom: 2px solid #0082c6;
    }

    .msg-nav-tab .tab_btn li {
        float: left;
        display: block;
        width: 120px;
        height: 36px;
        line-height: 38px;
        color: #0082c6;
        text-align: center;
        cursor: pointer;
    }

    .msg-nav-tab .tab_btn .active {
        color: #fff;
        background-color: #0082c6;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .msg-nav-tab .life_nav_classify {
        font-size: 12px;
        color: #666;
    }

    .msg-nav-tab .life_nav_classify span {
        display: inline-block;
        float: left;
        width: 7.244%;
        height: 31px;
        line-height: 31px;
        text-align: left;
    }

    .msg-nav-tab .life_nav_classify ul {
        float: right;
        width: 92.755%;
        display: inline-block;
        font-size: 0;
    }

    .msg-nav-tab .life_nav_classify ul li {
        float: left;
        width: 12.863%;
        height: 31px;
        line-height: 31px;
        text-align: left;
        font-size: 12px;
        overflow: hidden;
    }
</style>