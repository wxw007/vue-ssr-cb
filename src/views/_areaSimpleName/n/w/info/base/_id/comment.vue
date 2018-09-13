<template>
    <div class="comment">
        <div class="comment-num">
            评论
            <span>({{commentCount}}条)</span>
        </div>
        <div class="input-box">
            <div class="user-msg">
                <img :src="member.memberSmallImg" v-if="member">
                <img src="~@/assets/web/user-img.png" v-else>
            </div>
            <div class="input-div">
                <textarea v-model="commentContent" v-if="member" cols="30" rows="10" placeholder="写下您的评论..."></textarea>
                <div class="user-unlogin" @click="loginFn" v-else>
                    您需要登录后才能评论，点击此处进行登录。
                </div>
                <div class="sub-box">
                    <!-- 先不做 -->
                    <!-- <div class="emoji"></div> -->
                    <span @click="addComment" class="sub-btn" v-if="member">发表评论</span>
                    <span @click="loginFn" class="sub-btn" v-else>登录后评论</span>
                </div>
            </div>
        </div>
        <div class="comment-box" v-for="comment in commentList" :key="comment.commentId">
            <div class="comment-item">
                <div class="comment-msg-box">
                    <div class="comment-user-img">
                        <img :src="comment.memberSmallImg">
                    </div>
                    <div class="comment-msg">
                        <span class="comment-name">{{comment.memberPetName}}</span>
                        <span class="news-time">{{comment.inputTime | timezoneconvert}}</span>
                        <i class="reply" @click="showReplyBox(comment)">回复</i>
                        <i class="up" @click="praise(comment)" :class="{'active':comment.isVote != undefined && comment.isVote != 0}">{{comment.voteNum}}</i>
                    </div>
                </div>
                <div class="comment-content">
                    <pre>{{comment.commentContent}}</pre>
                    <div class="reply-box" v-if="comment.replyList != null && comment.replyList.length > 0">
                        <div class="reply-item" v-for="reply in comment.replyList" :key="reply.replyId">
                            <div class="reply-msg">
                                <span class="replay-name1">{{reply.memberPetName}}</span>
                                <template v-if="reply.parentReplyId != 0">
                                    <span class="reply-a">回复</span>
                                    <span class="reply-name2">
                                        {{reply.rMemberPetName}}</span>
                                </template>
                                <i class="reply-btn" @click="showReplyBox(comment, reply)">回复</i>
                            </div>
                            <pre>{{reply.commentContent}}</pre>
                        </div>
                        <div class="more-reply" v-if="comment.haveMore" @click="fetchReplyList(comment)">查看更多回复</div>
                    </div>
                    <div class="reply-input" v-if="replyCommentId == comment.commentId">
                        <textarea ref="commentInput" cols="30" rows="10" :placeholder="replyPlaceholder" v-model="replyContent"></textarea>
                        <div class="sub-box">
                            <!-- <div class="emoji">
                            </div> -->
                            <span @click="addReply(comment)" class="sub-btn" v-if="member">回复</span>
                            <span @click="loginFn" class="sub-btn" v-else>登录后回复</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="more-comment" v-if="haveMoreComment" @click="fetchCommentList">
            查看更多评论
        </div>
    </div>
</template>
<script>
    /** 
     * 新闻详情页-评论模块
     * 
     * @author jiemin
     * @author wzw 
     * @since 2017-12-20
     */
    import { mapState } from 'vuex'
    import timezoneconvert from '@/util/filter/timezoneconvert'
    import { getCommentList, addCommentPraise, addComment, getReplyList, addReply } from '@/api/web'

    export default {
        data() {
            return {
                commentList: [], // 评论列表
                commentContent: "", // 用户输入的评论内容
                haveMoreComment: false, // 是否还有更多评论
                replyPlaceholder: "写下您的评论...",
                replyCommentId: null,// 回复的评论id
                parentReplyId: null, // 被回复的回复id
                replyContent: "",// 回复内容
                isLogin: true,
                activedReplyInput: null,//当前存在回复输入框的元素，方便之后清除
                commentCount: 0
            };
        },
        computed: {
            ...mapState("head", ["member"])
        },
        filters: {
            timezoneconvert
        },
        beforeMount() {
            this.fetchCommentList();
        },
        methods: {
            /**
             *  加载评论列表(包括加载更多)
             */
            fetchCommentList() {
                let params = { infoCentreId: this.$route.params.id };
                if (this.isNotEmpty(this.commentList)) {
                    params.lastId = this.getLast(this.commentList).commentId;
                }
                getCommentList(params).then(response => {
                    let result = response.data;
                    if (result.success) {
                        let data = result.data;
                        let commentList = data.commentList;
                        if (this.isNotEmpty(commentList)) {
                            this.pushArray(this.commentList, commentList);
                        }
                        if (data.commentCount != null) {
                            this.commentCount = data.commentCount;
                        }
                        this.haveMoreComment = data.haveMore;
                    }
                });
            },
            /**
             *  获取回复列表(加载更多)
             */
            fetchReplyList(comment) {
                let params = { commentId: comment.commentId };
                params.lastId = this.getLast(comment.replyList).replyId;
                getReplyList(params).then(response => {
                    let result = response.data;
                    if (result.success) {
                        let data = result.data;
                        let replyList = data.replyList;
                        if (this.isNotEmpty(replyList)) {
                            this.pushArray(comment.replyList, replyList);
                        }
                        comment.haveMore = data.haveMore;
                    }
                });
            },
            // 显示回复框
            showReplyBox(comment, reply) {
                if (!this.member) {
                    this.loginFn();
                    return;
                }
                this.replyCommentId = comment.commentId;
                if (reply) {
                    this.parentReplyId = reply.replyId;
                    this.replyPlaceholder = "回复：" + reply.memberPetName;
                } else {
                    this.parentReplyId = null;
                    this.replyPlaceholder = "回复：" + comment.memberPetName;
                }
            },
            /**
             *  提交新闻评论
             */
            addComment() {
                if (!this.commentContent) {
                    alert("评论内容不能为空");
                    return;
                }
                addComment({ infoCentreId: this.$route.params.id, commentContent: this.commentContent })
                    .then(response => {
                        let result = response.data;
                        if (result.success) {
                            this.commentContent = "";
                            this.commentCount++;
                            this.commentList.splice(0, 0, result.data);
                        } else {
                            alert(result.msg);
                        }
                    })
            },
            /**
             *  回复别人
             */
            addReply(comment) {
                if (!this.replyContent) {
                    alert("回复内容不能为空");
                    return;
                }

                addReply({
                    infoCentreId: this.$route.params.id, commentId: comment.commentId,
                    parentReplyId: this.parentReplyId, commentContent: this.replyContent
                }).then(response => {
                    let result = response.data;
                    if (result.success) {
                        this.replyContent = "";
                        if (!comment.replyList) {
                            comment.replyList = [];
                        }
                        comment.replyList.push(result.data);
                        this.replyCommentId = null;
                        this.commentCount++;
                    } else {
                        alert(result.msg);
                    }
                })
            },
            /**
             *  评论点赞
             */
            praise(comment) {
                //评论点赞前，要先判断用户登录了没有
                if (!this.member) {
                    this.loginFn();
                    return;
                }
                let params = { commentId: comment.commentId };
                if (comment.isVote == 0) {
                    params.operFlag = "add";
                } else {
                    params.operFlag = "cancel";
                }
                addCommentPraise(params).then(response => {
                    let result = response.data;
                    if (result.success) {
                        comment.isVote = comment.isVote == 0 ? 1 : 0;
                        if (comment.isVote == 0) {
                            comment.voteNum--;
                        } else {
                            comment.voteNum++;
                        }
                    }
                });
            },
            loginFn() {
                this.$store.commit("head/showLoginBox");
            },
            // addLike(e) {//添加对该评论的喜欢
            //     var target = e.target;
            //     var cls = target.getAttribute("class");
            //     if (!!~cls.indexOf("active")) {//有点赞
            //         cls = cls.replace('active', "");
            //         target.setAttribute("class", cls);
            //     } else {//没有点赞
            //         target.setAttribute("class", cls + " active");
            //     }
            // },
            // addReply(e) {//添加回复
            //     var target = e.target, replyBox;
            //     if (this.activedReplyInput) {
            //         this.activedReplyInput.innerHTML = "";
            //     }
            //     if (target.getAttribute("class") == "reply-btn") {//回复的回复
            //         var parent = target.parentNode;
            //         var name1 = parent.getElementsByClassName("replay-name1")[0];
            //         var input = this.createReplyInput(name1.innerHTML);
            //     } else if (target.getAttribute("class") == "reply") {//回复某评论
            //         var parent = target.parentNode;
            //         var name1 = parent.getElementsByClassName("comment-name")[0];
            //         var input = this.createReplyInput(name1.innerHTML);
            //     }
            //     replyBox = target.parentNode.parentNode.parentNode.parentNode;
            //     replyBox = replyBox.getElementsByClassName("reply-input")[0];
            //     this.activedReplyInput = replyBox;
            //     replyBox.appendChild(input);
            //     this.activedReplyInput.getElementsByTagName("textarea")[0].focus();
            //     this.subReply(this.activedReplyInput.getElementsByClassName("sub-btn")[0]);

            // },
            // subReply(ele) {//用来绑定事件，之后提交回复
            //     var _this = this;
            //     ele.addEventListener("click", function () {//点击之后，提交评论，之后移除输入框
            //         var val = _this.activedReplyInput.getElementsByTagName("textarea")[0].value;
            //         console.log("提交的评论为" + val);
            //         _this.activedReplyInput.innerHTML = "";
            //     });
            // },
            // createReplyInput(name) {//这个函数用来生成回复框
            //     var doc = document;
            //     var frag = doc.createDocumentFragment();
            //     var text = doc.createElement("textarea");
            //     text.setAttribute("placeholder", "回复：" + name);
            //     frag.appendChild(text);
            //     var subBox = doc.createElement("div");
            //     subBox.setAttribute("class", "sub-box");
            //     var emoji = doc.createElement("div");
            //     emoji.setAttribute("class", "emoji");
            //     subBox.appendChild(emoji);
            //     var span = doc.createElement("span");
            //     span.setAttribute("class", "sub-btn");
            //     span.innerHTML = "回复";
            //     subBox.appendChild(span);
            //     frag.appendChild(subBox);
            //     return frag;
            // },
            isNotEmpty(list) {
                if (list != null && list.length > 0) {
                    return true;
                } else {
                    return false;
                }
            },
            getLast(list) {
                return list[list.length - 1];
            },
            pushArray(srcList, tgtList) {
                tgtList.forEach(tgt => {
                    srcList.push(tgt);
                });
            },
            prePushArray(srcList, tgtList) {
                tgtList.forEach(tgt => {
                    srcList.splice(0, 0, tgt);
                });
            }
        }
    }
</script>


<style>
    .comment {
        margin-top: 30px;
        padding-bottom: 40px;
    }

    .comment-num {
        font-size: 22px;
        color: #17191A;
        margin-bottom: 30px;
    }

    .comment-num span {
        font-size: 14px;
        color: #999999;
    }

    .input-box:after {
        content: '';
        display: block;
        clear: both;
        height: 0;
    }

    .user-msg {
        float: left;
        display: inline-block;
        width: 6.534%;
        height: 150px;
    }

    .user-msg img {
        float: left;
        width: 100%;
        height: auto;
        border-radius: 50%;
    }

    .input-div {
        float: right;
        display: inline-block;
        width: 90.90%;
        height: 150px;
        border: 2px solid #f3f3f3;
        border-radius: 3.5px;
        background: #FAFAFA;
    }

    .input-div textarea {
        width: 100%;
        height: 106px;
        font-size: 14px;
        padding: 10px 7px;
        resize: none;
        border: none;
        background: #fff;
    }

    .input-div .user-unlogin {
        width: 100%;
        height: 106px;
        line-height: 106px;
        font-size: 14px;
        padding: 10px 7px;
        resize: none;
        border: none;
        background: #fff;
        text-align: center;
        cursor: pointer;
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
        评论显示的样式
     */

    .comment-box {
        /* height:1000px; */
    }

    .comment-item {
        padding: 30px 0;
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
        width: 6.534%;
        border-radius: 50%;
        overflow: hidden;
    }

    .comment-user-img img {
        width: 100%;
        height: auto;
    }

    .comment-msg {
        position: relative;
        float: right;
        width: 90.90%;
        height: 46px;
        padding: 6px 0;
    }

    .comment-msg span {
        line-height: 1;
    }

    .comment-msg .comment-name {
        display: block;
        font-size: 15px;
        color: #666666;
        margin-bottom: 6px;
    }

    .comment-msg .news-time {
        font-size: 12px;
        color: #666666;
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
        height: 46px;
        line-height: 46px;
        top: 0;
        right: 0;
        color: #666;
    }

    .comment-msg .up {
        position: absolute;
        display: block;
        top: 0;
        right: 55px;
        height: 46px;
        line-height: 46px;
        font-size: 15px;
        padding-right: 22px;
        background: url("~@/assets/web/up-icon.png") no-repeat center right;
        background-size: 17px 16px;
    }

    .comment-msg .up:hover {
        color: #0082C6;
        background: url("~@/assets/web/up-hover.png") no-repeat center right;
        background-size: 17px 16px;
    }

    .comment-msg .up.active {
        color: #0082C6;
        background: url("~@/assets/web/up-active.png") no-repeat center right;
        background-size: 17px 16px;
    }

    .comment-content {
        width: 90.90%;
        float: right;
    }

    .comment-content>pre {
        font-size: 15px;
        margin-top: 15px;
        white-space: pre-wrap;
        word-break: break-all;
    }

    .reply-box {
        background: #FAFAFA;
        padding: 10px 20px;
        margin-top: 20px;
    }

    .reply-item {
        position: relative;
        font-size: 15px;
        margin: 10px 0;
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
        font-weight: 800;
    }

    .reply-msg .reply-a {
        margin: 0 8px;
        font-weight: normal;
    }

    .reply-item pre {
        margin-top: 5px;
        display: inline-block;
        white-space: pre-wrap;
        word-break: break-all;
    }

    .more-reply {
        font-size: 15px;
        color: #666;
        cursor: pointer;
    }

    /* 评论里面的回复框 */

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