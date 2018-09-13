<template>
    <!-- 中间的内容区域 -->
    <!-- 热点新闻，放轮播和新闻 -->
    <div class="comment">
        <div class="comment-box">
            <template v-for="info in infoListData.msgList">
                <div class="comment-item" v-if="info.returnType=='1'">
                    <div class="comment-msg-box">
                        <div class="comment-user-img">
                            <img :src="info.headImage" alt="">
                        </div>
                        <div class="comment-msg">
                            <span class="comment-name">{{info.memberName}}</span>
                            <span class="comment-state">评论你</span>
                            <span class="news-time">02-05 14:09</span>
                        </div>
                    </div>
                    <div class="comment-content">
                        <pre>{{info.commentContent}}</pre>
                        <div class="reply-box">
                            <a class="reply-article" :href="info.url" target="_blank">
                                <div v-if="info.infoImage" class="article-msg">
                                    <img :src="info.infoImage" alt="">
                                </div>
                                <h3>{{info.infoTitle}}</h3>
                            </a>

                        </div>
                        <div class="reply-input">
                        </div>
                    </div>
                </div>
                <div class="comment-item" v-if="info.returnType=='2'">
                    <div class="comment-msg-box">
                        <div class="comment-user-img">
                            <img :src="info.headImage" alt="">
                        </div>
                        <div class="comment-msg">
                            <span class="comment-name">{{info.memberName}}</span>
                            <span class="comment-state up">点赞了你</span>
                            <span class="news-time">02-05 14:09</span>
                        </div>
                    </div>
                    <div class="comment-content">
                        <div class="reply-box">
                            <a class="reply-article" :href="info.url" target="_blank">
                                <div v-if="info.infoImage" class="article-msg">
                                    <img :src="info.infoImage" alt="">
                                </div>
                                <h3>{{info.infoTitle}}</h3>
                            </a>

                        </div>
                        <div class="reply-input">
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="more-comment" @click="loadMoreComment" v-show="!isLoading&&infoListData.msgList.length>0">
            {{infoListData.over?"没有更多了":"加载更多"}}
        </div>
        <loading v-show="isLoading" :color="'#0082c6'"></loading>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { getMsgList, getMemberMsgList, getInfoMsgList } from '@/api/web'
    import loading from "../../../base/common/loading.vue"
    export default {
        props: {
            infoListData: {
                default() {
                    return { msgList: [] }
                }
            },
        },
        components: {
            loading
        },
        data() {
            return {
                isLoading: false,
                isLogin: true,
                activedReplyInput: null,//当前存在回复输入框的元素，方便之后清除
            };
        },
        methods: {
            loginFn() {
                // console.log("调用登录的方法");
            },
            loadMoreComment() {//加载更多评论数据
                if (!this.infoListData.over) {
                    this.isLoading = true;
                    getInfoMsgList({
                        parameterJson: this.infoListData.parameterJson
                    }).then(response => {
                        this.isLoading = false;
                    });
                }
            },
            addLike(e) {//添加对该评论的喜欢
                var target = e.target;
                var cls = target.getAttribute("class");
                if (!!~cls.indexOf("active")) {//有点赞
                    cls = cls.replace('active', "");
                    target.setAttribute("class", cls);
                } else {//没有点赞
                    target.setAttribute("class", cls + " active");
                }
            },
        }
    }
</script>


<style>
    .comment {
        padding-bottom: 40px;
    }


    .comment-item {
        padding: 20px 0;
        border-bottom: 1px solid #F2F2F2;
    }

    .comment-item:after {
        content: '';
        display: block;
        height: 0;
        clear: both;
    }

    .comment-user-img {
        display: inline-block;
        width: 5.3977%;
        border-radius: 50%;
    }

    .comment-user-img img {
        width: 100%;
        height: auto;
        border-radius: 50%;
    }

    .comment-msg {
        position: relative;
        float: right;
        width: 92.89%;
        height: 46px;
        /* padding:6px 0; */
    }

    .comment-msg span {
        line-height: 1;
    }

    .comment-msg .comment-name {
        font-size: 14px;
        color: #666666;
        margin-bottom: 6px;
        margin-right: 15px;
    }

    .comment-msg .comment-state {
        font-size: 14px;
        color: #666666;
    }

    .comment-msg .comment-state.up {
        font-size: 14px;
        color: #0082C6;
    }

    .comment-msg .news-time {
        display: block;
        font-size: 14px;
        color: #666666;
        margin-top: 10px;
    }

    .comment-msg i {
        float: right;
        display: block;
        font-style: normal;
        cursor: pointer;
    }

    .comment-msg .reply {
        position: absolute;
        font-size: 15px;
        height: 15px;
        line-height: 15px;
        top: 0;
        right: 0;
        color: #0082C6;
    }

    .comment-content {
        width: 90.90%;
        float: right;
    }

    .comment-content>pre {
        font-size: 15px;
        margin-top: 15px;
        white-space: pre-wrap;
    }

    .reply-box {
        /* padding:10px; */
        padding: 0;
        margin-top: 9px;
    }

    .reply-item {
        position: relative;
        font-size: 15px;
        padding: 10px;
        background: #FAFAFA;
    }

    .reply-msg i {
        position: absolute;
        font-style: normal;
        right: 0;
        font-size: 15px;
        color: #666;
        cursor: pointer;
    }

    .reply-msg span {
        font-size: 16px;
        color: #666666;
        /* font-weight:800; */
    }

    .reply-msg .reply-a {
        margin: 0 8px;
        font-weight: normal;
    }

    .reply-item pre {
        margin-top: 5px;
        font-size: 16;
        color: #666;
        display: inline-block;
        white-space: pre-wrap;
        word-break: break-all;
    }

    .reply-article {
        display: block;
        position: relative;
        padding: 10px;
        margin: 0;
        background: #FAFAFA;
        margin-top: 1px;
    }

    .reply-article:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }

    .article-msg {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }

    .article-msg img {
        width: 100%;
        height: 100%;
    }

    .reply-article h3 {
        width: 94%;
        display: inline-block;
        height: 24px;
        line-height: 24px;
        color: #666;
        font-size: 16px;
        overflow: hidden;
        display: inline-block;
        white-space: pre-wrap;
        word-break: break-all;
        font-weight: normal;
    }

    .more-reply {
        font-size: 15px;
        color: #666;
        cursor: pointer;
    }

    /* 评论里面的回复框 */

    .reply-input {}

    .reply-input textarea {
        width: 100%;
        height: 106px;
        font-size: 14px;
        padding: 10px 7px;
        resize: none;
        border: none;
        background: #fff;
        border: 1px solid #f2f2f2;
    }

    .reply-input .sub-box {
        background: #f2f2f2;
    }

    .sub-box {
        width: 100%;
        height: 40px;
    }

    .emoji {
        float: left;
        width: 20px;
        height: 20px;
        background: #ccc;
        margin: 10px 0 0 14px;
        background: url("~@/assets/web/emoji.png") no-repeat center center;
        background-size: 100% 100%;
        cursor: pointer;

    }

    .sub-btn {
        float: right;
        width: 118px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        background: #0082C6;
        cursor: pointer;
    }

    /* 
        更多评论的框框
    */

    .more-comment {
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #666;
        font-size: 15px;
        background: #FAFAFA;
        cursor: pointer;
    }
</style>