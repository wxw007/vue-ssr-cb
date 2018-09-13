<template>
    <editTemplate>
        <div id="content_area" class="" style="margin-left:0;width:88%" v-if="!isLessOrEqualIE9">
            <div class="user-img" style="">
                <div class="uploading-box">
                    <div class="uploading-img">
                        <img v-if="nowImg.memberSmallImg==''" src="~@/assets/web/upload-bg.png" alt="" @click="upImg">
                        <img v-else :src="nowImg.memberSmallImg" alt="">
                        <!-- <input type="file" ref="upInput" @change="form['fileModel.att'] = fileChange($event)" > -->
                        <input type="file" ref="upInput" @change="uploadImg($event)">
                    </div>
                    <div v-if="nowImg.memberSmallImg!=''" class="do-img">
                        <span class="reset-uploading" @click="upImg">
                            重新上传
                        </span>
                        <!-- <i class="rotate"></i>
                        <i class="scale-big"></i>
                        <i class="scale-small"></i> -->
                    </div>
                    <span class="img-save-btn" @click="saveAvatar">
                        保存
                    </span>
                </div>
                <div class="img-preview">
                    <div class="preview-box">
                        <img v-if="nowImg.memberSmallImg==''" src="~@/assets/web/img-preview.png" alt="">
                        <img v-else :src="nowImg.memberSmallImg" alt="">
                    </div>
                    <span>
                        头像预览
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="ie-error">
            不支持IE9及以下版本, 请切换到更高版本
        </div>
        <alertTips :tips="alertTips"></alertTips>
    </editTemplate>
</template>
<script>
    import {
        mapState
    } from "vuex"
    import {
        uploadUserImg,
        updateAvatar
    } from '@/api/web'
    import editTemplate from './base/layouts/edit-template.vue'
    import alertTips from "../base/common/alert-tips.vue" 
    import messageBox from "../base/common/message-box"
    import memberAvatarEdit from '@/store/modules/web/membercenter/avatar-edit.js'
    import browser from "@/util/browser"
    export default {
        storeModule() {
            return { memberAvatarEdit };
        },
        asyncData({
            store
        }) {
            return store.dispatch("memberAvatarEdit/fetchData");
        },
        data() {
            return {
                nowAboutBtn: "#collect",
                // nowImg:require("~@/assets/web/delete/slide111.png"),
                nowImg: {
                    memberBigImg: '',
                    memberSmallImg: ''
                },
                ie: null,
                alertTips: null,
                isLessOrEqualIE9: false
            };
        },
        components: {
            editTemplate,
            alertTips,
            messageBox
        },
        mounted() {
            if (!browser.isIE()) {
                return;
            }
            let temp = navigator.userAgent.match(/MSIE \d{1,2}/i);
            let ieVersion = temp[0].match(/\d{1,2}/)[0];
            if (parseInt(ieVersion) <= 9) {
                this.isLessOrEqualIE9 = true;
            }
        },
        methods: {
            showTip() {
                // messageBox.tip("???");
                // console.log("到这百年", JSON.stringify(messageBox));
            },
            upImg() {
                var input = this.$refs.upInput;
                this.simulation(input, "click", function () {
                });
            },
            submit() {
                this.$emit("submit", this.search);
            },
            aboutBtn(e) {
                var target = e.target;
                this.nowAboutBtn = target.getAttribute("href");
            },
            uploadImg(e) {
                var imgFile = e.target;
                /* ↓↓↓↓↓↓↓↓↓↓↓↓↓这可能是一堆屎一样的代码 ↓↓↓↓↓↓↓↓↓↓↓*/
                var isIE = navigator.userAgent.match(/MSIE (\d)/i);
                isIE = isIE ? isIE[1] : undefined;
                if (!isIE || isIE == 1) {// 非ie浏览器或ie10浏览器以上
                    imgFile = e.target.files;
                } else if (isIE < 10 && isIE != 1) {
                    imgFile = e.target.value;
                }
                /*↑↑↑↑↑↑↑↑↑↑↑↑↑ 这可能是一堆屎一样的代码↑↑↑↑↑↑↑↑↑↑↑ */
                uploadUserImg({
                    "fileModel.att": imgFile
                }).then(response => {
                    let result = response.data;
                    if (result.success) {
                        this.nowImg = result.data;
                    }
                });
                /* 
                /webapi/member_uploadAvatorImg.do
                */
            },
            saveAvatar() { //保存用户头像
                updateAvatar(this.nowImg).then(response => {
                    let result = response.data;
                    if (result.success) {
                        alert(result.msg);
                        window.location.reload();
                    }
                })
            },
            simulation(obj, type, response) { //事件模拟
                var isIE = navigator.userAgent.match(/MSIE (\d)/i);
                isIE = isIE ? isIE[1] : undefined;
                //给obj绑定事件
                //传统浏览器使用attachEvent 现代浏览器使用addEventListner
                isIE < 9 ? obj.attachEvent("on" + type, response) :
                    obj.addEventListener(type, response, false);
                // 触发自定义事件
                if (isIE <= 9 && isIE != 1) {
                    if (!this.alertTips || this.alertTips == "推荐使用谷歌浏览器或更换高版本的浏览器") {
                        this.alertTips = "推荐使用谷歌浏览器或更换高版本的浏览器 ";
                    } else if (this.alertTips == "推荐使用谷歌浏览器或更换高版本的浏览器 ") {
                        this.alertTips = "推荐使用谷歌浏览器或更换高版本的浏览器";
                    }
                    // this.showTip();
                    return;
                }
                if (isIE < 9 && isIE != 1) {
                    //传统浏览器
                    this.ie = isIE;
                    var event = document.createEventObject(); //创建对象           
                    event.msg = "我是fireEvent触发的"; //给事件对象添加属性              
                    obj.fireEvent("on" + type, event); //触发事件
                } else {
                    //现代浏览器
                    var e = document.createEvent("MouseEvents"); //创建事件对象              
                    e.initEvent(type, false, false); //初始化事件对象initMouseEvent需要更多参数
                    e.msg = "我是despatchEvent触发的"; //给事件对象添加属性
                    obj.dispatchEvent(e); //触发事件          
                }
            }
        }
    };
</script>
<style>
    .user-img {
        background: #fafafa;
        padding-top: 30px;
        padding-left: 100px;
        height: 880px;
    }

    .user-img:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }

    .uploading-box {
        float: left;
        display: inline-block;
        width: 260px;
        height: 343px;
    }

    .uploading-img {
        width: 260px;
        height: 260px;
        cursor: pointer;
        overflow: hidden;
    }

    .uploading-img img {
        height: 100%;
    }

    .reset-uploading {
        font-size: 16px;
        color: #0082c6;
        line-height: 1;
    }

    .do-img {
        margin-top: 18px;
    }

    .do-img i {
        float: right;
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-left: 16px;
        cursor: pointer;
    }

    .do-img .rotate {
        background: url("~@/assets/web/rotate.png") no-repeat center center;
        background-size: 100% 100%;
    }

    .do-img .scale-big {
        background: url("~@/assets/web/scale-big.png") no-repeat center center;
        background-size: 100% 100%;
    }

    .do-img .scale-small {
        background: url("~@/assets/web/scale-small.png") no-repeat center center;
        background-size: 100% 100%;
    }

    .img-save-btn {
        display: block;
        width: 120px;
        height: 42px;
        line-height: 42px;
        border-radius: 4px;
        margin: 40px auto 0;
        text-align: center;
        font-size: 16px;
        color: #fff;
        background: #0082c6;
        cursor: pointer;
    }

    .img-preview {
        float: left;
        display: inline-block;
        width: 150px;
        height: 260px;
        margin-left: 50px;
    }

    .preview-box {
        width: 150px;
        height: 150px;
        margin-top: 55px;
        overflow: hidden;
    }

    .preview-box img {
        height: 100%;
        border-radius: 50%;
    }

    .img-preview span {
        display: block;
        width: 100%;
        text-align: center;
        line-height: 1;
        font-size: 16px;
        margin-top: 26px;
    }

    .ie-error {
        font-size: 16px;
        color: red;
        height: 200px;
        width: 100%;
        line-height: 200px;
        text-align: center;
    }
</style>