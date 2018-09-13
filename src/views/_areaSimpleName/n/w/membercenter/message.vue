<template>
    <indexTemplate>
        <div class="news_content" style="display:block">
            <div class="msg-nav-tab">
                <ul class="tab_btn">
                    <li v-for="(navTab,index) in navTabList" :class="{'active':navTab==nowTab}" @click="changeTab(navTab)">{{navTab}}</li>
                </ul>
            </div>
            <infiniteScroll @loadMore="loadMore" ref="infiniteScroll">
                <commentList :infoListData="infoListData" v-show="nowTab=='新闻消息'"></commentList>
                <systemMsgList :msgList="msgList" v-show="nowTab=='系统通知'"></systemMsgList>
            </infiniteScroll>
        </div>
    </indexTemplate>
</template>
<script>
    /** 
     * 消息中心
     * 
     * @author jiemin 
     * @author wzw 
     * @since 2018-01-25
     */
    import { mapState } from 'vuex'
    import indexTemplate from './base/layouts/index-template.vue'
    import memberCenterMessage from "@/store/modules/web/membercenter/message.js"
    import commentList from "./base/user-message/comment-list.vue";
    import systemMsgList from "./base/user-message/system-msg-list.vue";
    export default {
        storeModule() {
            return { memberCenterMessage }
        },
        asyncData({ store }) {
            return store.dispatch("memberCenterMessage/fetchData")
        },
        data() {
            return {
                navTabList: [
                    "新闻消息",
                    "系统通知"
                ],
                nowTab: "新闻消息"
            };
        },
        computed: {
            ...mapState("memberCenterMessage", ["msgList", "infoListData"])
        },
        components: {
            indexTemplate,
            commentList,
            systemMsgList,
            infiniteScroll: () => import('../base/common/infinite-scroll.vue')
        },
        methods: {
            changeTab(name) {
                this.nowTab = name;
                this.$refs.infiniteScroll.reset();
            },
            loadMore(callback) {
                if (this.nowTab == "新闻消息") {
                    callback(this.$store.dispatch("memberCenterMessage/fetchMoreInfoMsgList"), this.infoListData.msgList);
                } else {
                    callback(this.$store.dispatch("memberCenterMessage/fetchMoreMsgList"), this.msgList);
                }
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