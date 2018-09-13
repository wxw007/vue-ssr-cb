<template>
    <div>
        <div class="login-box" ref="loginBox" @click.stop.prevent="hideLogin">
            <div class="login-form" @click.stop="" @keydown="userLoginBtn($event)">
                <!-- <span class="login-warn">{{loginwarn}}</span> -->
                <div class="login-item">
                    <label for="">国家/地区</label>
                    <select name="" id="" v-model="selectedZone">
                        <option v-for="a in phoneAreaCodeList" :key="a.name" :value="a.zone">{{a.name}}</option>
                    </select>
                </div>
                <div class="login-item" :class="{'input-err':loginErr.phone}">
                    <label for="">手机号码</label>
                    <div class="mobile-phone-box">
                        <span>{{selectedZone}}</span>
                        <b>{{loginErr.phoneMsg}}</b>
                        <input type="text" v-model="loginData.mobilePhone" placeholder="请输入手机号码" ref="loginMobilePhone">
                    </div>
                </div>
                <div class="login-item" :class="{'input-err':loginErr.pwd}">
                    <label for="">密码</label>
                    <div class="pwd-box">
                        <input type="password" v-model="loginData.memberPassword" placeholder="请输入6~20位密码">
                        <b>{{loginErr.pwdMsg}}</b>
                    </div>
                </div>
                <div class="login-btn" @click="userLoginBtn">立即登录</div>
                <div class="login-ps clearfloat">
                    <u class="forget-pwd" @click="forgetBtn" :class="{'active':forget}">忘记密码？</u>
                    <span v-show="forget" class="forget-msg">请使用手机APP找回密码</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /** 
     * 登录框
     * 
     * @author wzw
     * @since 2018-05-24 10:23
     */
    import MessageBox from "../common/message-box"

    export default {
        props: ["phoneAreaCodeList"],
        data() {
            return {
                selectedZone: '86', //当前选择的区域
                loginData: {
                    zone: '',
                    mobilePhone: '',
                    memberPassword: '',
                },
                loginErr: {
                    phone: false,
                    phoneMsg: '',
                    pwd: false,
                    pwdMsg: '',
                },
                forget: false,
            }
        },
        mounted() {
            this.$refs.loginMobilePhone.focus();
        },
        methods: {
            userLoginBtn(e) {
                var code = e.keyCode;
                var type = e.type;
                if (code == "13" || type == "click") {
                    this.loginData.zone = this.selectedZone + '';
                    this.loginErr = {
                        phone: false,
                        phoneMsg: '',
                        pwd: false,
                        pwdMsg: ''
                    }
                    if (this.loginData.mobilePhone == '') {
                        this.loginErr.phone = true;
                        this.loginErr.phoneMsg = "格式有误";
                    } else if (this.loginData.memberPassword == '') {
                        this.loginErr.pwd = true;
                        this.loginErr.pwdMsg = "密码有误";
                    } else {
                        this.$store.dispatch("head/login", this.loginData)
                            .then(response => {
                                let result = response.data;
                                if (result.success) {
                                    this.$store.commit("head/setMember", result.data)
                                    this.hideLogin();
                                    MessageBox.tip("登录成功");
                                } else {
                                    if (result.msg == "用户不存在") {
                                        this.loginErr.phone = true;
                                        this.loginErr.phoneMsg = "没有找到";
                                    } else if (result.msg == "密码错误") {
                                        this.loginErr.pwd = true;
                                        this.loginErr.pwdMsg = "密码错误";
                                    }
                                }
                            });
                    }
                }
            },
            forgetBtn() {
                this.forget = true;
            },
            hideLogin() { //隐藏登录框
                this.$store.commit("head/setShowLoginBox", false);
            }
        }
    }
</script>

<style>
    /* 
        登录窗口
     */

    .login-box {
        /* display: none; */
        position: fixed;
        z-index: 30;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0, 0, 0, .5);
    }

    .login-box .login-form {
        position: absolute;
        width: 460px;
        /* height: 440px; */
        height: 390px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: #fff;
        border-radius: 6px;
        padding: 50px 60px;
        overflow: hidden;
    }

    .login-warn {
        position: absolute;
        top: 11px;
        left: 0;
        line-height: 20px;
        width: 100%;
        font-size: 14px;
        color: red;
        text-align: center;
    }

    .login-item {
        margin-bottom: 20px;
    }

    .login-item.input-err div {
        border: 1px solid #f74a4a;
    }

    .login-item.input-err div b {
        color: #f74a4a;
        font-size: 14px;
        background: url("~@/assets/web/err-icon.png") no-repeat left center;
        background-size: 16px 16px;
    }

    .login-item select {
        position: relative;
        display: inline-block;
        width: 258px;
        height: 42px;
        padding: 0 10px;
        font-size: 14px;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
        appearance: none;
        -ms-appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background: url("~@/assets/web/select-icon.png") no-repeat 237px center;
        background-size: 8px 5px;
    }

    select::-ms-expand {
        display: none;
    }

    .login-item .mobile-phone-box {
        display: inline-block;
        width: 258px;
        height: 44px;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
    }

    .login-item .mobile-phone-box span {
        display: inline-block;
        width: 45px;
        height: 42px;
        line-height: 42px;
        font-size: 14px;
        color: #17191A;
        text-align: center;
    }

    .login-item .mobile-phone-box input {
        float: right;
        display: inline-block;
        width: 123px;
        height: 42px;
        line-height: 42px;
    }

    .login-item .mobile-phone-box b {
        float: right;
        display: inline-block;
        width: 88px;
        height: 42px;
        line-height: 42px;
        font-weight: normal;
        padding-left: 23px;
        font-size: 0;
    }

    .login-item label {
        display: inline-block;
        width: 81px;
        height: 44px;
        line-height: 44px;
        font-size: 16px;
        color: #17191A;
    }

    .login-item .pwd-box {
        display: inline-block;
        width: 258px;
        height: 42px;
        border: 1px solid #CCCCCC;
        border-radius: 4px;
    }

    .login-item .pwd-box input {
        display: inline-block;
        width: 168px;
        height: 42px;
        padding-left: 10px;
        border-radius: 4px;
    }

    .login-item .pwd-box b {
        float: right;
        display: inline-block;
        width: 88px;
        height: 42px;
        line-height: 42px;
        font-size: 0;
        font-weight: normal;
        padding-left: 23px;
    }

    .login-ps {
        margin: 10px 0;
        padding: 10px 0;
        text-align: center;
    }

    .login-ps u {
        display: block;
        line-height: 1;
        font-size: 14px;
    }

    .login-ps span {
        display: block;
        line-height: 1;
        font-size: 14px;
    }

    .login-ps .id-login {
        float: left;
        cursor: pointer;
    }

    .login-ps .forget-pwd {
        cursor: pointer;
        /* color: #00BCC4; */
        color: #f74a4a;
        margin-bottom: 17px;
    }

    .login-ps .forget-pwd.active {
        color: #ccc;
    }

    .login-ps .forget-msg {
        cursor: pointer;
        color: #F48F8F;
    }

    .login-btn {
        width: 100%;
        height: 48px;
        line-height: 48px;
        font-size: 18px;
        text-align: center;
        color: #fff;
        background: #00BCC4;
        border-radius: 4px;
        margin-top: 30px;
        cursor: pointer;
    }

    .login-tip {
        position: relative;
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }

    .login-tip:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto 0;
        width: 100%;
        height: 1px;
        background: #ccc;
    }

    .login-tip span {
        position: relative;
        z-index: 3;
        display: inline-block;
        line-height: 14px;
        font-size: 12px;
        color: #999;
        padding: 5px;
        background: #fff;
    }

    .other-login {
        margin-top: 20px;
        text-align: center;
    }

    .other-login i {
        display: inline-block;
        width: 50px;
        height: 50px;
    }

    .other-login i:nth-of-type(1) {
        float: left;
        margin-left: 30px;
        background: url("~@/assets/web/weibo-icon.png") no-repeat center center;
        background-size: 100% 100%;
    }

    .other-login i:nth-of-type(2) {
        background: url("~@/assets/web/weibo-icon.png") no-repeat center center;
        background-size: 100% 100%;
    }

    .other-login i:nth-of-type(3) {
        float: right;
        margin-right: 30px;
        background: url("~@/assets/web/twitter-icon.png") no-repeat center center;
        background-size: 100% 100%;
    }
</style>