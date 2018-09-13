<template>
    <div id="header_nav">
        <div class="content">
            <!-- 区域选择 -->
            <div class="area_change">
                <div class="area_show" v-if="curArea != null">
                    <img class="area_flag" :src="curArea.flag" @click="toIndex()">
                    <span class="area_name" style="cursor: pointer" @click="toIndex()">{{curArea.areaName}}</span>
                </div>
                <i @click="switchContinents()"></i>
                <div class="area_box" v-show="isShowContinents">
                    <!--
                        推荐暂时隐藏
                        <div class="rec_area">
                        <span v-for="(a,index) in area.rec">
                            {{a}}
                        </span> 
                    </div> -->
                    <!--  <div class="area_select">
                        <ul class="area_continent">
                            <li v-for="continent in continents" :class="{'active':selectedContinent.dataName == continent.dataName}" :key="continent.dataName" @click.stop="selectContinent(continent)">{{continent.dataName}}</li>
                        </ul>
                        <div class="area_detail" v-if="selectedContinent != null">
                            <a v-for="area in selectedContinent.areas" :key="area.areaId" :href="area.url" :class="{'active':area.areaId == curArea.areaId}">
                                {{area.areaName}}
                            </a>
                        </div>
                    </div> -->
                    
                    <div class="area-select-new">
                        <div class="area-item" v-for="continent in continents" :key="continent.dataName">
                            <p class="area-title">{{continent.name}}</p>
                            <ul class="area-name">
                                <a v-for="areas in continent.areas" :key="areas.areaName" :href="areas.url" @click.stop="selectContinent(areas)" :class="{'active':areas.areaId == curArea.areaId}">{{areas.areaName}}</a>
                            </ul>
                        </div>
                        <div class="area-name-2" v-show="currentArea.length!=0">
                            <a v-for="area in currentArea" :key="area.areaId" :href="area.url" :class="{'active':area.areaId == curArea.areaId}">{{area.areaName}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 功能选择 -->
            <div class="header_nav_menu">
                <a :href="topHrttAdminUrl" target="_blank">华人号</a>
                <i></i>
                <span @click="showLogin" v-if="member == null">登录</span>
                <template v-else>
                    <a :href="memberCenterUrl" class="header-user-msg" target="_blank">{{member.memberPetName}}
                        <img :src="member.memberSmallImg" alt="" class="user-avatar">
                        <em class="login-out" @click.stop.prevent="loginOut">退出</em>
                    </a>
                </template>
                <i></i>
                <span>更多
                    <b></b>
                    <div class="more_product">
                        <a :href="aboutUsUrl" target="_blank">关于我们</a>
                        <i></i>
                        <a :href="contactUsUrl" target="_blank">联系方式</a>
                    </div>
                </span>
                <i></i>
                <a href="http://www.52hrtt.com/download" target="_blank">下载App</a>
            </div>
        </div>
        <loginBox :phoneAreaCodeList="areaSelectList" v-if="showLoginBox"></loginBox>
    </div>
</template>
<script>
/** 
 * 顶部组件
 * @author jiemin
 * @author wzw
 * @since 2017-12-20
 */
import {
    mapState,
    mapMutations
} from 'vuex'
import head from '@/store/modules/web/base/header/head.js'
import { resolveUrl } from "@/util/common/url.js"
import MessageBox from "../common/message-box"
export default {
    storeModule() {
        return { head };
    },
    data() {
        return {
            // selectedContinent: {}, // 选中的大洲
            isShowContinents: false, // 是否显示大洲列表框
            currentArea:[] // 当前显示的大洲下的区域

        }
    },
    computed: {
        ...mapState("head", ["curArea", "member", "topHrttAdminUrl", "showLoginBox", "areaSelectList", "continents"]),
        aboutUsUrl() {
            return resolveUrl(this.$store, "/n/w/more/about-us")
        },
        contactUsUrl() {
            return resolveUrl(this.$store, "/n/w/more/contact-us")
        },
        memberCenterUrl() {
            return resolveUrl(this.$store, "/n/w/membercenter")
        }
    },
    components: {
        loginBox: () =>
            import ("./login-box.vue")
    },
    mounted() {
        // this.selectedContinent = this.continents[0];
    },
    methods: {
        /**
         *  选择大洲
         */
        // selectContinent(continent) {  //原先的js
        //     this.selectedContinent = continent;
        // },
        selectContinent(areas) {
            if(areas.isArea==0){
                this.currentArea = areas.areas
            } else {
                this
            }
        },
        /**
         * 显示登录框
         */
        showLogin() {
            this.$store.commit("head/showLoginBox");
        },
        /**
         * 用户退出登录
         */
        loginOut() {
            this.$store.dispatch("head/loginOut").then(response => {
                let result = response.data;
                if (result.success) {
                    MessageBox.tip("退出成功");
                    this.$store.commit("head/setMember", null);
                    if (this.$route.path.indexOf("/n/w/membercenter") >= 0) {
                        window.location.reload();
                    }
                }
            });
        },
        /**
         *  切换显示大洲列表框
         */
        switchContinents() {
            this.isShowContinents = !this.isShowContinents;
        },
        /**
         * 跳转到首页
         */
        toIndex() {
            window.location = "/";
        },

    }
}
</script>
<style src="../static/css/base.css"></style>
<style scoped>
/* 
     *页面顶部导航条样式
     */

#header_nav {
    position: relative;
    z-index: 11;
    width: 100%;
    height: 44px;
    background-color: #0082C6;
}

#header_nav .area_change {
    position: relative;
    float: left;
    height: 100%;
}

#header_nav .area_change .area_show {
    float: left;
    height: 100%;
}


#header_nav .area_change .area_show .area_flag {
    cursor: pointer;
}

#header_nav .area_change .area_show img {
    float: left;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin-top: 9px;
    margin-right: 9px;
}

#header_nav .area_change .area_show span {
    float: left;
    line-height: 44px;
    font-size: 18px;
    color: #fff;
    cursor: default;
    background: none;
}



/*区域选择的样式*/

#header_nav .area_change .area_box {
    z-index: 3;
    position: absolute;
    top: 56px;
    width: 402px;
    /* height:500px; */
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 7px 4px rgba(0, 0, 0, .1);
}

.area_box:after {
    content: "";
    position: absolute;
    display: none;
    top: -7px;
    left: 25px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #fff;
    /* box-shadow:0px 0px 7px 4px rgba(0,0,0,.1); */
}

.area_box .rec_area {
    position: relative;
    width: 100%;
    height: auto;
    padding: 23.5px 0;
    /* box-shadow:0px 0px 1px 1px rgba(0,0,0,.1); */
}

.rec_area span {
    display: inline-block;
    width: 80px;
    line-height: 1;
    text-align: left;
    font-size: 16px;
    color: #17191A;
    padding: 7.5px 0;
    cursor: pointer;
}

.area_box .rec_area:after {
    content: '推荐';
    position: absolute;
    left: 0;
    top: 0;
    line-height: 1;
    font-size: 16px;
    font-weight: 800;
}



/*大洲选择的样式*/

.area_continent {
    display: block;
    width: 100%;
    height: 22px;
    border-bottom: 1px solid #0082C6;
}

.area_continent li {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    padding: 0 12px;
    font-size: 14px;
    color: #666666;
    cursor: pointer;
}

.area_continent .active {
    background: #0082C6;
    color: #fff;
    border-radius: 2px;
}



/*具体的国家选择*/

.area_detail a {
    display: inline-block;
    width: 80px;
    line-height: 1;
    text-align: left;
    font-size: 16px;
    color: #17191A;
    padding: 7.5px 0;
    cursor: pointer;
    margin-right: 10px;
}

.area_detail a.active {
    color: #0082c6;
}

#header_nav .area_change i {
    float: left;
    width: 37px;
    height: 11px;
    margin: 18px 0 0 4px;
    cursor: pointer;
    background: url("~@/assets/web/index_icon.png") no-repeat -40px -104px;
    background-size: 160px 162px;
}

#header_nav .header_nav_menu {
    display: block;
    height: 44px;
    float: right;
    font-size: 0;
}

.header_nav_menu>a {
    cursor: pointer;
    position: relative;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    display: inline-block;
    font-size: 13px;
    color: #fff;
}

.header_nav_menu span {
    position: relative;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    display: inline-block;
    font-size: 13px;
    color: #fff;
    cursor: pointer;
}

.header_nav_menu span b {
    display: inline-block;
    border-top: 3px solid #fff;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
}

.header_nav_menu .login-out {
    position: absolute;
    display: none;
    bottom: -20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 27px;
    line-height: 27px;
    background: #fff;
    font-style: normal;
    color: #666;
    text-align: center;
    box-shadow: 0px 0px 10px -4px rgba(0, 0, 0, .5);
}

.header_nav_menu span:hover {
    color: #666;
}

.header_nav_menu .header-user-msg:after {
    content: '';
    height: 0;
    display: block;
    clear: both;
}

.header_nav_menu .header-user-msg img {
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: 6px;
    margin-right: 5px;
}

.header_nav_menu .header-user-msg:hover .login-out {
    display: block;
}

.header_nav_menu .header-user-msg .login-out:hover {
    color: #0081C4;
}

.header_nav_menu span:hover b {
    color: #666;
    border-top: 3px solid #666;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
}

.header_nav_menu span:hover .more_product {
    display: block;
}

.header_nav_menu .more_product {
    display: none;
    position: absolute;
    top: 37px;
    left: -10px;
    width: 74px;
    /* height: 84px; */
    background: #fff;
    box-shadow: 0px 0px 10px -4px rgba(0, 0, 0, .5);
}

.more_product a {
    display: block;
    width: 100%;
    line-height: 27px;
    font-size: 12px;
    color: #666666;
    text-align: center;
}

.more_product a:hover {
    color: #0081C4;
}

.more_product>i {
    display: block;
    width: 70px;
    height: 1px;
    background-color: #f3f3f3;
    margin: 0 auto;
}

.header_nav_menu>i {
    display: inline-block;
    width: 1px;
    height: 10px;
    background-color: #fff;
    /* margin: 0; */
}

.area-select-new {}

.area-select-new .area-item {
    margin-top: 26px;
}

.area-select-new .area-item:first-child {
    margin-top: 0;
}

.area-select-new .area-title {
    font-size: 16px;
    color: #17191a;
    font-weight: bold;
    margin-bottom: 10px;
}

.area-select-new .area-name {
    font-size: 16px;
    color: #17191a;
    overflow: hidden;
}

.area-select-new .area-name a {
    display: inline-block;
    float: left;
    width: 90px;
    overflow: hidden;
    margin-bottom: 10px;
    cursor: pointer;
    color: #17191a
}
.area-select-new .area-name a.active{
    color: #0082c6;
}

.area-name-2 {
    position: absolute;
    left: 100%;
    top: 0;
    overflow: hidden;
    width: 126px;
    min-height: 100%;
    background: #fafafa;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.35);
    box-sizing: border-box;
    padding: 20px 0; 
}
.area-name-2 a{
    display: block;
    width: 100%;
    text-align: center;
    font-size: 16px;
    height: 52px;
    line-height: 52px;
    overflow: hidden;
    cursor: pointer;
    color: #17191a
}
.area-name-2 a.active{
    color: #0082c6;
}
</style>