<template>
    <div>
        <mine-top :topTitle="mineTop.topTitle" :back="mineTop.back"></mine-top>
        <div class="user-wrap">
            <div class="user-img">
                <img v-if="userInfo" :src="userInfo.memberBigImg" alt="">
                <img v-else src="@/assets/m/images/user-img.png" alt="">
            </div>
            <div class="login-text"><a :href="loginUrl" v-if="!userInfo">点击登录</a><a v-else>{{userInfo.memberPetName}}</a></div>
        </div>
        <div class="user-list">
            <ul>
                <li v-for="(item, index) in userList" :key="index"><a @click="gotoUrl(item.url)">{{item.text}}</a></li>
            </ul>
            <div v-if="userInfo" class="loginout" @click='userLoginOut'>退出登录</div>
        </div>
        <footTab :isShowLifeService="member.isShowLifeService"></footTab>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-07-02 16:47
 */
import { loginOut } from '@/api/web'
import { mapState } from 'vuex'
import { resolveUrl } from '@/util/common/url.js'
import footTab from "../base/foot/foot-tab.vue"
import mineTop from "./base/mine-top.vue"
import mineIndex from '@/store/modules/m/mine/index.js'

export default {
    storeModule() {
        return { mineIndex };
    },
    asyncData({ store }) {
        return store.dispatch("mineIndex/fetchData");
    },
    components: {
        footTab,
        mineTop
    },
    computed: {
        ...mapState("mineIndex", ["member"])
    },
    created() {
        this.userInfo = this.member.memberexpand || null;
    },
    data() {
        return {
            userInfo: null,
            isShowLifeService: null,
            mineTop: {
                topTitle: '华人头条',
                back: false
            },
            userList: [{
                    text: '文章收藏',
                    url: resolveUrl(this.$store, '/n/m/mine/collection')
                },
                {
                    text: '阅读历史',
                    url: resolveUrl(this.$store, '/n/m/mine/history')
                },
                {
                    text: '生活发布',
                    url: resolveUrl(this.$store, '/n/m/mine/life-publish-order')
                },
                {
                    text: '旅游订单',
                    url: resolveUrl(this.$store, '/n/m/mine/travel-order')

                },
            ],
            loginUrl: resolveUrl(this.$store, '/n/m/mine/login')
        }
    },
    methods: {
        gotoUrl(url) {
            if (this.userInfo) {
                window.location.href = url
            } else {
                window.location.href = this.loginUrl
            }
        },
        userLoginOut() {
            loginOut().then(response => {
                let result = response.data;
                if (result.success) {
                    alert('退出成功');
                    this.userInfo = null
                } else {
                    alert(result.msg)
                }
            })
        },
        

    }

}
</script>
<style src="../base/static/css/base.css"></style>
<style src="../base/static/css/themes.css"></style>
<style scoped lang="less">
* {
    padding: 0;
    margin: 0;
}

.user-wrap {
    width: 100%;
    height: 3rem;
    background: url('~@/assets/m/images/mine-bg.jpg') no-repeat;
    background-size: cover;
    .user-img {
        margin: .25rem .2rem 0 .3rem;
        box-sizing: content-box;
        float: left;
        padding: .3rem;
        border-radius: 50%;
        width: 1.3rem;
        height: 1.3rem;
        background: #3494c7;
        border: .3rem solid #2088c3;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .login-text {
        overflow: hidden;
        height: 100%;
        position: relative;
        a {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: .32rem;
            color: #fff;
        }
    }
}

.user-list {
    width: 100%;
    ul {
        margin: 0 .5rem;
        li {
            border-bottom: 1px solid #f0f0f0;
            font-size: .3rem;
            color: #17191a;
            position: relative;
            &::after {
                content: '';
                display: inline-block;
                width: .2rem;
                height: .2rem;
                border-top: .02rem solid #bbd4d5;
                border-right: .02rem solid #bbd4d5;
                position: absolute;
                right: .15rem;
                top: 50%;
                transform: rotate(45deg) translateY(-50%);
            }
            a {
                padding: .27rem 0;

                width: 100%;
                display: block;
                height: 100%;
            }
        }
    }
}

.loginout {
    text-align: center;
    font-size: .32rem;
    margin-top: .25rem
}
</style>