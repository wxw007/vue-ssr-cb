<template>
    <div>
        <mine-top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow"></mine-top>
        <div class="login-box">
            <ul>
                <li>
                    <div class="left">国家/地区</div>
                    <div class="text area" @click="selectArea"><span>{{curAreaName}}</span></div>
                </li>
                <li>
                    <div class="left">手机号</div>
                    <div class="text"><span class="prefix-num">+{{this.curAreaNum}}</span>
                        <input type="number" placeholder="请输入手机号码" v-model="loginData.mobilePhone" autocomplete="off">
                    </div>
                </li>
                <li>
                    <div class="left">密码</div>
                    <div class="text">
                        <input v-model="loginData.memberPassword" type="password" placeholder="请输入密码" autocomplete="off">
                    </div>
                </li>
                <li class="err-info">
                    <div v-show="errInfo"><span>{{errInfo}}</span></div>
                </li>
            </ul>
            <div class="login-btn" :class="{active: loginData.mobilePhone!=''&& loginData.memberPassword!=''}" @click="userLoginBtn">立即登录</div>
            <div class="other"><span class="left" @click="downLoad">注册</span><span class="right"  @click="downLoad">忘记密码?</span></div>
        </div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-07-03 14:56
 */
 import login from '@/store/modules/m/mine/login.js'
import mineTop from "./base/mine-top.vue"
import { resolveUrl } from '@/util/common/url.js'
export default {
   storeModule() {
        return { login };
    },
    components: {
        mineTop
    },
    data() {
        return {
            errInfo: '',
            curAreaNum: '', //当前选择的区域
            curAreaName: '',
            loginData: {
                zone: '',
                mobilePhone: '',
                memberPassword: '',
            },
            loginErr: {
                phone: false,
                pwd: false,
            },
            mineTop: {
                topTitle: '登录',
                back: true,
                shadow: true
            }

        }
    },
    mounted(){
        this.curAreaNum = localStorage.curAreaNum ? localStorage.curAreaNum : '86'
        this.curAreaName = localStorage.curAreaName ? localStorage.curAreaName : '中国'
    },
    methods: {
        selectArea() {
            //跳转选择区域
            // window.location.href = resolveUrl(this.$store, '/n/m/mine/areaSelect')
            this.$router.push({ path: resolveUrl(this.$store, '/n/m/mine/areaSelect') });
        },
        userLoginBtn(e) {
            if (!this.loginData.mobilePhone) {
                this.loginErr.phone = true;

                this.errInfo = '手机号码不能为空';
                return
            }
            if (!this.loginData.memberPassword) {
                this.loginErr.pwd = true;

                this.errInfo = '密码不能为空';
                return
            }
            var type = e.type;

            this.loginData.zone = this.curAreaNum;
            this.loginErr = {
                phone: false,
                pwd: false,
            }

            this.$store.dispatch("login/login", this.loginData)
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        this.$store.commit("login/setMember", result.data)
                        let preUrl = document.referrer.toString();
                        if(preUrl.indexOf('life') > -1){
                            this.$router.push({ path: resolveUrl(this.$store, '/n/m/life') })
                        } else {
                            this.$router.push({ path: resolveUrl(this.$store, '/n/m/mine') })
                        }

                    } else if (result.msg == "用户不存在") {
                        this.loginErr.phone = true;
                        this.errInfo = "用户不存在";
                    } else if (result.msg == "密码错误") {
                        this.loginErr.pwd = true;
                        this.errInfo = "密码错误";
                    }
                });
        },

        downLoad() {
            var browser = {
                versions: function() {
                    var u = navigator.userAgent,
                        app = navigator.appVersion;
                    return {
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                        qq: u.match(/\sQQ/i) == " qq" //是否QQ
                    };
                }(),
                language: (navigator.browserLanguage || navigator.language).toLowerCase()//检测浏览器语言，暂时不用
            }

            if (browser.versions.weixin) {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.cooby.news'
            }
             if (browser.versions.ios) {
                window.location.href = 'https://itunes.apple.com/cn/app/id955684615?mt=8'
            }
            if (browser.versions.android) {
                window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.cooby.news'
            }


        }

    }
}
</script>
<style src="../base/static/css/base.css"></style>
<style src="../base/static/css/themes.css"></style>
<style scoped lang="less">
body{
    background: #fff;
}
input {
    border: none;
    outline: none;
    vertical-align: baseline;
    font-size: .3rem;
}

input::-webkit-input-placeholder {
    font-size: .3rem;
}

.login-box {
    padding: 0 .4rem;
    margin-top: .18rem;
    ul {

        li {
            padding: .45rem 0 .22rem 0;
            height: 1.06rem;
            border-bottom: 1px solid #e6e6e6;
            font-size: .3rem;
            .left {
                float: left;
                color: #17191a;
                width: 1.6rem;
            }
            .area {
                position: relative;
            }
            .text {
                overflow: hidden;
                &.area::after {
                    position: absolute;
                    right: .2rem;
                    top: 50%;
                    transform: translateY(-50%);
                    content: '';
                    width: .07rem;
                    height: .14rem;
                    display: block;
                    background: url(~@/assets/m/images/s.png) no-repeat;
                    background-size: .08rem .14rem;
                }
                input{
                    width: 55%;
                }
                .prefix-num {
                    margin-right: .34rem;
                }
            }
        }
        .err-info {
            text-align: center;
            color: #ee6060;
            font-size: .28rem;
            border: none;
            span {
                &::before {

                    content: '';
                    display: inline-block;
                    width: .24rem;
                    height: .24rem;
                    background: url(~@/assets/m/images/err.png) no-repeat;
                    background-size: cover;
                    margin-top: .02rem;
                    margin-right: .05rem;
                }
            }
        }
    }
    .login-btn {

        height: .88rem;
        border-radius: .08rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .32rem;
        color: #fff;
        background: #e6e6e6;
        &.active {
            background: #149ea4;
        }
    }
    .other {
        overflow: hidden;
        margin-top: .33rem;
        color: #999999;
        font-size: .28rem;
        .left {
            float: left;
        }
        .right {
            float: right;
        }
    }
}
</style>