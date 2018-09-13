<template>
    <div class="news_section copy-right" style="display:block">
        <alertTips :tips="alertTips"></alertTips>
        <!-- 新闻列表 -->
        <div class="news-detail-nav">
            <a href="/">首页</a>&nbsp;/&nbsp;
            <a v-if="infoType != null" :href="infoType.url">{{infoType.infoTypeName}}&nbsp;/&nbsp;</a>
            <a>正文</a>
        </div>
        <h1 class="new-headline">
            {{info.infoTitle}}
        </h1>
        <div class="news-msg">
            <a class="news-form" v-if="info.quoteUrl && info.quoteUrl != ''" :href="info.quoteUrl" target="_blank">{{info.quoteFrom}}</a>
            <a class="news-form" v-else-if="info.quoteFrom && info.quoteFrom != ''">{{info.quoteFrom}}</a>
            <span class='news-time'>{{info.infoStartTime | timezoneconvert('yyyy-MM-dd hh:mm')}}</span>
        </div>
        <div class="news-content" v-if="info.hasImg == '1'">
            <swiper class="picture-box" v-if="info.imgsList != null" ref="swiperTop" :options="swiperOption">
                <ul class="swiper-wrapper">
                    <li v-for="img in info.imgsList" class="swiper-slide">
                        <div class="img-box">
                            <img :src="img.imgUrl">
                        </div>
                    </li>
                </ul>
                <div class="swiper-button-prev">
                    <i></i>
                </div>
                <div class="swiper-button-next">
                    <i></i>
                </div>
            </swiper>
            <div class="picture-box-desc">
                <div class="pictrue-num">
                    <span class="now-num">{{nowIndex}}</span>
                    <span>/</span>
                    <span class="pictrue-sum">{{info.imgsList.length}}</span>
                </div>
                <swiper :options="swiperOption2" ref="swiperBottom" style="margin-left:120px;">
                    <div class="swiper-wrapper">
                        <div v-for="(img, index) in info.imgsList" class="swiper-slide desc">{{img.text}}</div>
                    </div>
                </swiper>
            </div>
        </div>

        <!-- 视频新闻 -->
        <div class="news-content info-content" v-else-if="info.infoType == '2'">
            <div class="video-box">
                <div v-html="info.infoContent"></div>
            </div>
        </div>

        <!-- 普通新闻 -->
        <div class="news-content info-content" v-else v-html="info.infoContent" ></div>


        <div class="hrtt_statement">
            <div class="title">
                <span>免责申明</span>
            </div>
            <p> 本站刊载的文章所有权归属原作者。华人头条仅提供信息发布平台，不代表同意原文章作者的观点和立场。部分内容经网络转载，如有侵权烦请联系我们（邮箱：hrtt@52hrtt.com)，以便及时删除。 </p>
        </div>
        <div class="new-operation">
            <!-- 详情页标签S -->
            <div class="tag">
                <a v-for="tag in info.tags" :key="tag.keywordsId" :href="tag.url" target="_blank">{{tag.keywords}}</a>
                <!-- <a href="">标签1</a>
                <a href="">标签1</a>
                <a href="" class="active">标签2</a> -->
            </div>
            <div class="operation">
                <span @click="showInformBox" class="inform" v-if="!info.isInform">举报</span>
                <span @click="addOrDelMemark" class="collect" :class="{'active':info.isMark == 1}">收藏</span>
                <span @click="addInfoPraise" class="like" :class="{'active':info.isPraise == 1}">点赞</span>
            </div>

        </div>
        <div v-show="isShowInformBox" class="inform-pop">
            <div class="inform-box">
                <span class="inform-headline">举报原因</span>
                <i @click="isShowInformBox = false" class="close-inform"></i>
                <div v-for="infoReason in informReasons" :key="infoReason.dataValue" @click="selectedInformReason = infoReason" class="inform-item" :class="{'active':selectedInformReason.dataValue == infoReason.dataValue}">
                    <span>{{infoReason.dataName}}</span>
                    <i></i>
                </div>
                <textarea cols="30" rows="10" v-model="informExplain" placeholder="举报说明"></textarea>
                <div class="inform-btn">
                    <span class="error" v-show="informError"> 举报内容不能为空</span>
                    <span @click="subInformMsg" class="sub-btn">确认</span>
                    <span @click="isShowInformBox = false" class="close-btn">取消</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /** 
     * 新闻详情页-内容模块
     * 
     * @author jiemin
     * @author wzw 
     * @since 2017-12-20
     */
    import {
        mapState
    } from 'vuex'
    import timezoneconvert from '@/util/filter/timezoneconvert'
    import {
        getInformReasonList,
        submitInform,
        addMembermark,
        delMembermark,
        addInfoPraise
    } from '@/api/web'
    import alertTips from "../../../base/common/alert-tips.vue"
    import MessageBox from "../../../base/common/message-box"

    export default {
        props: ["info", "infoType"],
        data() {
            const _this = this;
            return {
                swiperOption: {
                    navigation: {
                        nextEl: '.picture-box .swiper-button-next',
                        prevEl: '.picture-box .swiper-button-prev'
                    },
                    on: {
                        slideChange(swiper) {
                            let tempIndex = _this.nowIndex;
                            if (swiper) { // swiper2的东西
                                _this.nowIndex = swiper.activeLoopIndex + 1;
                            } else if (this) {
                                _this.nowIndex = this.activeIndex + 1;
                            }

                            if (tempIndex == _this.info.imgsList.length && _this.nowIndex == 1) {
                                _this.$refs.swiperBottom.slideNext();
                            } else if (tempIndex == 1 && _this.info.imgsList.length == _this.nowIndex) {
                                _this.$refs.swiperBottom.slidePrev();
                            } else if (tempIndex < _this.nowIndex) {
                                _this.$refs.swiperBottom.slideNext();
                            } else if (tempIndex > _this.nowIndex) {
                                _this.$refs.swiperBottom.slidePrev();
                            }
                        }
                    }
                },
                swiperOption2: {
                    on: {
                        slideChange(swiper) {
                            let tempIndex = _this.nowIndex;
                            if (swiper) { // swiper2的东西
                                _this.nowIndex = swiper.activeLoopIndex + 1;
                            } else if (this) {
                                _this.nowIndex = this.activeIndex + 1;
                            }

                            if (tempIndex == _this.info.imgsList.length && _this.nowIndex == 1) {
                                _this.$refs.swiperTop.slideNext();
                            } else if (tempIndex == 1 && _this.info.imgsList.length == _this.nowIndex) {
                                _this.$refs.swiperTop.slidePrev();
                            } else if (tempIndex < _this.nowIndex) {
                                _this.$refs.swiperTop.slideNext();
                            } else if (tempIndex > _this.nowIndex) {
                                _this.$refs.swiperTop.slidePrev();
                            }
                        }
                    }
                },
                informReasons: [], // 举报类型列表
                selectedInformReason: {}, // 举报类型
                informExplain: "", // 举报理由
                isShowInformBox: false, // 是否显示举报框
                nowIndex: 1,
                alertTips: null,
                informError: false
            };
        },
        computed: {
            ...mapState("head", ["member"]),


        },
        components: {
            alertTips,
            swiper: () =>
                import('../../../base/common/swiper-container.vue')
        },
        filters: {
            timezoneconvert
        },
        beforeMount() {
            // this.copyRight();
        },
        mounted() {
            this.initVideoIframe();
        },
        methods: {
            /**
             * 显示举报框
             */
            showInformBox() {
                // 这里需要先判断会员是否登录
                if (!this.member) {
                    this.$store.commit("head/showLoginBox");
                    return;
                }
                this.isShowInformBox = true;
                getInformReasonList().then(response => {
                    let result = response.data;
                    if (result.success) {
                        this.informReasons = result.data;
                        this.selectedInformReason = this.informReasons[this.informReasons.length - 1];
                    }
                });
            },
            /**
             * 提交举报信息
             */
            subInformMsg() {
                if (this.informExplain != null && this.informExplain == "") {
                    this.informError = true;
                    setTimeout(() => {
                        this.informError = false;
                    }, 3000)
                    return;
                }
                submitInform({
                    informTagId: this.info.infoCentreId,
                    informExplain: this.informExplain,
                    informReason: this.selectedInformReason.dataValue
                })
                    .then(response => {
                        let result = response.data;
                        if (result.success) {
                            this.info.isInform = true;
                        }
                        this.isShowInformBox = false;
                        MessageBox.tip(result.msg);
                        // this.alertTips = result.msg;
                    });
            },
            /**
             *  添加或删除收藏
             */
            addOrDelMemark() {
                if (!this.member) { //如果还未登录，就让它登录
                    this.$store.commit("head/showLoginBox");
                    return;
                }
                if (this.info.isMark == 1) {
                    delMembermark({
                        infoCentreId: this.info.infoCentreId
                    })
                        .then(response => {
                            let result = response.data;
                            if (result.success) {
                                this.info.isMark = 0;
                                this.alertTips = "取消收藏成功";
                            }
                        })
                } else {
                    addMembermark({
                        infoCentreId: this.info.infoCentreId,
                        infoTitle: this.info.infoTitle
                    })
                        .then(response => {
                            let result = response.data;
                            if (result.success) {
                                this.info.isMark = 1;
                                this.alertTips = "收藏成功";
                            }
                        })
                }
            },
            /**
             *  新闻点赞
             */
            addInfoPraise() {
                if (!this.member) { //如果还未登录，就让它登录
                    this.$store.commit("head/showLoginBox");
                    return;
                }
                if (this.info.isPraise == 0) {
                    addInfoPraise({
                        infoCentreId: this.info.infoCentreId
                    })
                        .then(response => {
                            let result = response.data;
                            if (result.success) {
                                this.info.isPraise = 1;
                                this.alertTips = "点赞成功";
                            }
                        })
                }
            },
            copyRight() {
                var body = document.querySelector("body");
                body.setAttribute("ms-controller", "infoList");
                body.setAttribute("oncontextmenu", "return false");
                body.setAttribute("ondragstart", "return false");
                body.setAttribute("onselectstart", "return false");
                body.setAttribute("onselect", "document.selection.empty()");
                body.setAttribute("onbeforecopy", "return false");
                body.setAttribute("onmouseup", "document.selection.empty()");
            },
            initVideoIframe() {
                let iframes = document.querySelectorAll(".news-content iframe");
                if (iframes == null) {
                    return;
                }
                for (let i = 0; i < iframes.length; i++) {
                    let iframe = iframes[i];
                    let src = iframe.getAttribute("src");
                    if (src == null || src == '' || src.indexOf("&wmode=transparent") >= 0) {
                        continue;
                    }
                    if (src.indexOf("?") > 0) {
                        iframe.setAttribute("src", src + "&wmode=transparent")
                    } else {
                        iframe.setAttribute("src", src + "?wmode=transparent")
                    }
                }
            }
        }
    }
</script>


<style>
    .news-detail-nav {
        font-size: 14px;
    }

    .news-detail-nav a {
        color: #666666;
        font-size: 14px;
        line-height: 1;
    }

    .new-headline {
        margin: 15px 0;
        font-size: 28px;
        color: #17191A;
    }

    /* 
        新闻信息
     */

    .news-msg {
        width: 100%;
    }

    .news-form {
        margin-right: 26px;
        font-size: 12px;
        /* color: #666; */
        color: #0082c6;
    }

    .news-time {
        font-size: 12px;
        color: #666;
    }

    /* 
        新闻详情页
      */

    .news-content {
        padding-top: 25px;
        padding-bottom: 25px;
        font-size: 16px;
        line-height: 28px;
    }

    .info-content {
        position: relative;
        z-index: 1;
    }

    .info-content * {
        max-width: 100% !important;
    }

    /* .info-content iframe {
        position: relative;
        z-index: 1;
    } */

    .info-content p {
        margin: 14px 0px;
    }

    .copy-right p {
        position: relative;
    }

    .copy-right p i {
        position: absolute;
        content: "";
        display: block;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }

    .news-content img {
        max-width: 100%;
    }

    .news-content iframe {
        max-width: 100%;
    }

    /* 
        视频新闻样式
      */

    .video-box {
        width: 100%;
        /* height: 435px; */
        margin-bottom: 40px;
        /* box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, .5); */
        text-align: center;
    }

    /* 
        图片新闻的样式
      */

    .picture-box {
        position: relative;
        width: 100%;
        /* height: 594px; */
        overflow: hidden;
        margin-bottom: 40px;
    }

    .picture-box-desc {
        max-height: 100px;
    }


    .picture-box-desc .desc {
        font-size: 16px;
        color: #17191a;
        line-height: 25px;
        margin: 14px 0px;
        overflow: auto;
        max-height: 100px;
    }


    .img-box {
        /* 放置图片地方 */
        max-width: 100%;
        height: 470px;
        line-height: 470px;
        margin-bottom: 25px;
        text-align: center;
    }

    .img-box img {
        max-width: 100%;
        max-height: 100%;
        vertical-align: middle;
    }


    .pictrue-num {
        /* position: absolute;
        left: 0;
        bottom: 0; */
        /* width: 12.784%; */
        height: 100px;
        background: #fff;
        float: left;
    }

    .pictrue-num span {
        font-size: 30px;
        color: #17191A;
        font-weight: 800;
    }

    .pictrue-num .now-num {
        font-size: 46px;
        color: #0082C6;
    }


    .ctrl-move {
        position: absolute;
        top: 0;
        width: 50%;
        height: 469px;
        cursor: pointer;
    }


    .picture-box {
        max-height: 500px;
    }

    .picture-box div>i {
        display: inline-block;
        width: 42px;
        height: 48px;
    }

    .picture-box .swiper-button-next {
        top: 50%;
        right: 0;
        width: 42px;
        height: 48px;
        background: rgba(0, 0, 0, .3);
    }

    .picture-box .swiper-button-next i {
        width: 42px;
        height: 48px;
        background: url("~@/assets/web/next-pictrue.png") center center;
        background-size: 100% 100%;
    }

    .picture-box .swiper-button-prev {
        top: 50%;
        left: 0;
        width: 42px;
        height: 48px;
        background: rgba(0, 0, 0, .3);
    }

    .picture-box .swiper-button-prev i {
        width: 42px;
        height: 48px;
        background: url("~@/assets/web/last-pictrue.png") center center;
        background-size: 100% 100%;
    }

    /* 对文章进行操作 */

    .new-operation {
        font-size: 14px;
        color: #666;
    }

    .new-operation:after {
        content: '';
        display: block;
        height: 0;
        clear: both;
    }

    .new-operation>.tag {
        float: left;
        max-width: 470px;
        overflow: hidden;
        height: 28px;
    }

    .new-operation>.tag>a {
        text-decoration: none;
        display: inline-block;
        height: 26px;
        line-height: 26px;
        color: #17191a;
        font-size: 14px;
        padding: 0 12px;
        cursor: pointer;
        background-color: #f5f5f5;
        border: 1px solid #f5f5f5;
        border-radius: 4px;
        margin-right: 10px;
        margin-bottom: 10px;
     }
   
    .new-operation > .operation{
        float: right;
        height: 28px;
    }

    .new-operation>.operation>span {
        float: right;
        height: 16px;
        line-height: 16px;
        padding-left: 22px;
        margin-left: 25px;
        cursor: pointer;
        margin-top: 7px;
    }

    .collect {
        background: url('~@/assets/web/collect.png') no-repeat center left;
        background-size: 16px 16px;
    }

    .collect.active,
    .collect:hover {
        color: #0082C6;
        background: url('~@/assets/web/collect-active.png') no-repeat center left;
        background-size: 16px 16px;
    }


    .like {
        background: url('~@/assets/web/like.png') no-repeat center left;
        background-size: 16px 16px;
    }

    .like.active,
    .like:hover {
        color: #0082C6;
        background: url('~@/assets/web/like-active.png') no-repeat center left;
        background-size: 16px 16px;
    }

    .inform {
        background: url('~@/assets/web/inform.png') no-repeat center left;
        background-size: 16px 16px;
    }

    .inform:hover {
        color: #0082C6;
        background: url('~@/assets/web/inform-active.png') no-repeat center left;
        background-size: 16px 16px;
    }

    /*  举报弹窗  */

    .inform-pop {
        position: fixed;
        /* z-index: 13; */
        z-index: 99999999 !important;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: rgba(0, 0, 0, .3);
    }

    .inform-pop .inform-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px;
        margin: auto;
        width: 522px;
        height: 420px;
        background: #fff;
    }

    .close-inform {
        position: absolute;
        top: 22px;
        right: 20px;
        width: 12px;
        height: 12px;
        background: url('~@/assets/web/close.png') no-repeat center center;
        background-size: 12px 12px;
        cursor: pointer;
    }

    .inform-headline {
        display: block;
        width: 100%;
        font-size: 18px;
        color: #17191A;
        line-height: 1;
        margin-bottom: 20px;
    }

    .inform-item {
        width: 100%;
        height: 34px;
        cursor: pointer;
    }

    .inform-item span {
        font-size: 14px;
        color: #17191A;
        line-height: 34px;
    }

    .inform-item i {
        position: relative;
        float: right;
        display: block;
        width: 11px;
        height: 11px;
        margin-top: 11px;
        border: 1px solid #879399;
    }

    .inform-item.active i:after {
        content: '';
        position: absolute;
        width: 12px;
        height: 8px;
        top: 0px;
        left: 2px;
        background: url('~@/assets/web/selected.png') no-repeat center center;
        background-size: 100% 100%;
    }

    .inform-box textarea {
        width: 100%;
        height: 82px;
        resize: none;
    }

    .inform-box .error {
        color: #f74a4a;
        font-size: 14px;
        float: left;
        width: auto;
        margin-left: 0px;
        border: 0px;
    }

    .inform-btn {
        width: 100%;
        height: 26px;
    }

    .inform-btn span {
        float: right;
        width: 60px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #ccc;
        border-radius: 2px;
        text-align: center;
        margin-top: 23px;
        margin-left: 18px;
        font-size: 15px;
        cursor: pointer;
    }

    .inform-btn .sub-btn {
        background: #0081C4;
        border: 1px solid #0081C4;
        color: #fff;
    }

    /* 免责声明 */

    .hrtt_statement {
        position: relative;
        width: 100%;
        /* height: 7.3rem; */
        border: 1px solid rgba(135, 147, 153, .6);
        margin: 2rem auto 1.66667rem;
        padding: .9rem 1.1333rem;
        text-align: center;
    }

    .hrtt_statement .title {
        position: absolute;
        width: 100%;
        display: inline-block;
        margin-top: -1.6rem;
        left: 0px;
    }

    .hrtt_statement .title span {
        line-height: 1;
        font-size: 15px;
        padding: .2rem .5rem;
        color: #fff;
        display: inline-block;
        background-color: #879399;
    }

    .hrtt_statement p {
        border-radius: .2rem;
        line-height: 1.3rem;
        color: #879399;
        font-size: .86667rem;
        font-family: PingFangSC-Regular, sans-serif;
        text-align: left;
    }

    /* 免责声明 */
</style>