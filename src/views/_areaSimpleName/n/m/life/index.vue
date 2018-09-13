<template>
    <div class="container">
        <!--生活首页-->
        <div class="life">
            <div class="float-title-height"></div>
            <div class="float-top" v-once>
                <div class="common-main-title cborder-bg">
                    <touch-link class="top-address clearfix" :to="areaUrl">
                        <div class="logo fl">
                            <img src="~@/assets/m/images/13.png">
                        </div>
                        <div class="address fl">{{curArea.areaName}}</div>
                    </touch-link>
                    <div class="main-title">
                        <b>{{topTitle}}</b>
                    </div>
                    <touch-link class="common-search-btn" :to="searchPageUrl">
                        <img src="~@/assets/m/images/6.png">
                    </touch-link>
                </div>
            </div>
            <!--焦点位-->
            <!--  <swiper class="point-warp disable-tap-highlight" :options="swiperOptions">
                <div class="swiper-wrapper">
                    <div class="point-part swiper-slide clearfix " v-for="lifeModuleList in lifeModuleListList" :key="lifeModuleList[0].lmId">
                        <touch-link class="point-box fl" v-for="lifeModule in lifeModuleList" :key="lifeModule.lmId" :to="lifeModule.url">
                            <div class="point-img">
                                <img :src="lifeModule.lmImg">
                            </div>
                            <div class="point-title">{{lifeModule.lmName}}</div>
                        </touch-link>
                    </div>
                </div>
            </swiper>
            <div class="point-num-warp" v-show="showDot"></div>
            <div style="height:0.7rem;width:100%;" v-show="!showDot"></div> -->
             <swiper :options="loopInfoSwiperOptions" class="life-loop-info-box" style="margin-top: .18rem;">
                    <div class="swiper-wrapper ">
                        <div class="loop-info  swiper-slide" v-for="loopInfo in loopInfoList" :key="loopInfo">{{loopInfo}}</div>
                    </div>
                </swiper>
            <div class="lifeModele-box">
                <div class="lifeModuleList" v-for="lifeModule in lifeModuleList">
                    <div class="title">{{lifeModule.tlmName}}</div>
                    <ul>
                        <li v-for="item in lifeModule.childList" :key="item.lmId" @click="gotoUrl(item.url)">
                            <img :src="item.lmImg" alt="">
                            <span>{{item.lmName}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="inner">
               <!--  <touch-link v-for="banner in bannerList" :key="banner.img" :href="banner.url" class="life-banner-box ads-img">
                    <img :src="banner.img" />
                </touch-link> -->
                <!-- <div class="ads-left fl">晴天 26℃（26℃~30℃）</div> -->
               <!--  <swiper :options="loopInfoSwiperOptions" class="life-loop-info-box">
                    <div class="swiper-wrapper ">
                        <div class="loop-info  swiper-slide" v-for="loopInfo in loopInfoList" :key="loopInfo">{{loopInfo}}</div>
                    </div>
                </swiper> -->
                <div v-for="lifeTopInfo in lifeTopInfoList">
                    <div class="middle-title">
                        <div class="same-town">
                            {{lifeTopInfo.infoType.typeName}}
                            <!-- <div class="same-town-line"></div> -->
                        </div>
                        <router-link tag="div" class="left-title-more" :to="lifeTopInfo.url">更多</router-link>
                    </div>
                    <template v-if="isLifeService(lifeTopInfo)">
                        <template v-if="lifeTopInfo.infoType.moduleId == MODULE_ID_FOODSERVICE">
                            <foodList :list="lifeTopInfo.infoList"></foodList>
                        </template>
                        <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_RECRUITSERVICE">
                            <!-- 这里招聘使用自定义生活服务样式 -->
                            <selfdefiningList :list="lifeTopInfo.infoList"></selfdefiningList>
                        </template>
                        <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_JOBSERVICE">
                            <!-- 这里求职使用自定义生活服务样式 -->
                            <selfdefiningList :list="lifeTopInfo.infoList"></selfdefiningList>
                        </template>
                        <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_HOUSINGSERVICE">
                            <housingList :list="lifeTopInfo.infoList"></housingList>
                        </template>
                        <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_TONGCITYSERVICE">
                            <tongcityList :list="lifeTopInfo.infoList"></tongcityList>
                        </template>
                        <template v-else-if="lifeTopInfo.infoType.moduleId == MODULE_ID_SELFDEFININGSERVICE">
                            <selfdefiningList :list="lifeTopInfo.infoList"></selfdefiningList>
                        </template>
                    </template>
                    <template v-else-if="isTravel(lifeTopInfo)">
                        <travelList :list="lifeTopInfo.infoList"></travelList>
                    </template>
                </div>
            </div>
            <div class="shadow" :class='{active: publishisShow}' @click="publishHide"></div>
            <img class="icon" :class='{active: publishisShow}' src="@/assets/m/images/publish-btn.png" alt="" @click="publishShow">
            <div class="publish-box" :class='{active: publishisShow}'>
                <ul>
                    <li v-for="item in publishTypeList">
                        <a @click='gotoPublish(item)'>
                                <img :src="item.moduleLogo" alt="">
                                <span>{{item.moduleName}}</span>
                            </a>
                    </li>
                </ul>
                <div class="cancle" @click="publishHide">取消</div>
            </div>
        </div>
        <footTab></footTab>
        <css></css>
    </div>
</template>
<script>
/** 
 * 
 * @author wzw
 * @since 2018-02-05 20:05
 */
import { mapState } from "vuex"
import { resolveUrl } from "@/util/common/url.js"
import { getPublishType } from '@/api/web'
import { checkIsLogin } from '@/api/wei'
import lifeIndex from "@/store/modules/m/life/index.js"
import footTab from "../base/foot/foot-tab.vue"
import bannerList from "../base/index/banner-list.vue"
import foodList from './foodservice/base/list.vue'
import recruitList from './recruitservice/base/list.vue'
import jobList from './jobservice/base/list.vue'
import housingList from './housingservice/base/list.vue'
import tongcityList from './tongcityservice/base/list.vue'
import selfdefiningList from './selfdefiningservice/base/list.vue'
import travelList from './travel/base/list.vue'
import '../base/common/global.js'
import '../base/common/swiper.js'
import '../base/common/list.js'

export default {
    storeModule() {
        return { lifeIndex };
    },
    asyncData({ store, route, params, query }) {
        return store.dispatch("lifeIndex/fetchData");
    },
    data() {
        return {
            publishisShow: false,
            prefixUrl: resolveUrl(this.$store, '/n/m/life/'),
            loginUrl: resolveUrl(this.$store, '/n/m/mine/login'),
            swiperOptions: {
                pagination: {
                    el: '.point-num-warp',
                }
            },
            loopInfoSwiperOptions: {
                loop: true,
                direction: 'vertical',
                autoplay: {
                    delay: 3000
                }
            },
            publishTypeList: [],
            MODULE_ID_FOODSERVICE: 1, // 美食天地
            MODULE_ID_RECRUITSERVICE: 4, // 招聘
            MODULE_ID_JOBSERVICE: 5, // 求职
            MODULE_ID_HOUSINGSERVICE: 6, // 房产信息
            MODULE_ID_TONGCITYSERVICE: 8, // 同城服务
            MODULE_ID_SELFDEFININGSERVICE: 9 // 自定义服务
        }
    },
    computed: {
        ...mapState("lifeIndex", ["nativeData","lifeModuleList", "bannerList", "lifeTopInfoList", "loopInfoList", "curArea", "topTitle"]),
        lifeModuleListList() {
            const lifeModuleList = this.lifeModuleList;
            if (lifeModuleList.length == 0) {
                return [];
            }
            const divideCount = 8;
            const arrCount = Math.ceil(lifeModuleList.length / divideCount);
            let newLifeModuleList = [];
            for (let i = 0; i < arrCount; i++) {
                let startIndex = i * divideCount;
                let endIndex = Math.min(startIndex + divideCount, lifeModuleList.length);
                newLifeModuleList.push(lifeModuleList.slice(startIndex, endIndex));
            }

            return newLifeModuleList;
        },
        showDot() {
            return this.lifeModuleList != null && this.lifeModuleList.length > 8;
        },
        areaUrl() {
            return resolveUrl(this.$store, "/n/m/area")
        },
        searchPageUrl() {
            return resolveUrl(this.$store, "/n/m/life/search")
        }
    },
    components: {
        footTab,
        bannerList,
        foodList,
        recruitList,
        jobList,
        housingList,
        tongcityList,
        selfdefiningList,
        travelList
    },
    mounted() {
        this.setPublishTypeData()
    },
    methods: {
        /**
         * 是否是生活服务
         */
        isLifeService(lifeModule) {
            return lifeModule.infoType.type == 1;
        },
        /**
         * 是否旅游
         */
        isTravel(lifeModule) {
            return lifeModule.infoType.type == 2;
        },
        to(url) {
            if (url == null) {
                return;
            }
            window.open(url);
        },
        gotoUrl(url) {
            this.$router.push(url)
        },
        publishShow() {
            this.publishisShow = true
        },
        publishHide() {
            this.publishisShow = false
        },
        setPublishTypeData() {
            var that = this;
            getPublishType().then(response => {
                let result = response.data;
                if (result.success) {
                    let arr = result.data;
                    arr.forEach(function(item) {
                        switch (item.moduleId) {
                            case '1':
                                item.gotoUrl = that.prefixUrl + 'foodservice/addView?moduleName=' + item.moduleName
                                break;
                            case '4':
                                item.gotoUrl = that.prefixUrl + 'recruitservice/addView?moduleName=' + item.moduleName
                                break;
                            case '5':
                                item.gotoUrl = that.prefixUrl + 'jobservice/addView?moduleName=' + item.moduleName
                                break;
                            case '6':
                                item.gotoUrl = that.prefixUrl + 'housingservice/addView?moduleName=' + item.moduleName
                                break;
                            case '8':
                                item.gotoUrl = that.prefixUrl + 'tongcityservice/addView?moduleName=' + item.moduleName
                                break;
                            case '9':
                                item.gotoUrl = that.prefixUrl + 'selfdefiningservice/addView?moduleName=' + item.moduleName + '&selfdefiningTypeId=' + item.relId
                                break;
                            default:
                                break;
                        }
                    })
                    this.publishTypeList = arr;
                }

            })
        },
        gotoPublish(item) {
            var that = this;
            checkIsLogin().then( response => {
                let result = response.data;
                if(result.success){
                    if(result.msg == '1'){
                        window.location.href = item.gotoUrl;
                    } else {
                        window.location.href = that.loginUrl;
                    }
                }
            })
        }

    }
}
</script>
<style lang="less">
.point-num-warp .swiper-pagination-bullet {
    background: #879399;
    margin-right: .2rem;
    width: .06rem;
    height: .06rem;
}

.life {
    padding-bottom: .6rem;
    -webkit-tap-highlight-color: transparent;
}

.life-banner-box {
    margin-bottom: .1rem;
    display: block;
}

.life-loop-info-box {
    color: #149ea4;
    font-size: .22rem;
    /* padding: .22rem 0 .15rem 0; */
    height: .30rem;
    line-height: .30rem;
}

.life-loop-info-box .loop-info {
    padding-right: .3rem;
    text-align: right;
}

.swiper-wrapper {
    display: flex;
}

.swiper-slide {
    flex-shrink: 0;
}

.life {
    .shadow {
        z-index: 100;
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: none;
        background: rgba(0, 0, 0, .2);
        transition: all .3s;
        opacity: 0;
        &.active {
            opacity: 1;
            display: block;
        }
    }
    .icon {
        position: fixed;
        width: 1rem;
        height: 1rem;
        bottom: 1.36rem;
        right: .3rem;
        transition: all .3s;
        &.active {
            transform: translateX(-7.5rem);
        }
    }
    .publish-box {
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        transition: all .3s;
        background: #fff;
        z-index: 100;
        transform: translateX(100%);
        opacity: 0;
        &.active {
            transform: translateX(0);
            opacity: 1;
        }
        ul {
            padding: .22rem 0;
            box-sizing: content-box;

            overflow: hidden;
            background: #fff;
            position: absolute;
            bottom: .88rem;
            max-height: 7rem;
            overflow: auto;
            -webkit-overflow-scrolling: touch;

            li {
                float: left;
                width: 2.5rem;
                margin: .2rem 0;
                a {
                    display: block;
                    margin: 0 auto;
                    width: 1.44rem;
                    height: 1.36rem;
                }
                img {
                    width: .88rem;
                    height: .88rem;
                    margin: 0 auto;
                    margin-bottom: .16rem;
                }
                span {
                    font-size: .24rem;
                    text-align: center;
                    display: block;
                    color: #0b0d0c;
                }
            }
        }
        .cancle {
            position: absolute;
            background: #fff;
            bottom: 0;
            left: 0;
            border-top: 1px solid #f5f5f5;
            width: 100%;
            height: .88rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .32rem;
            color: #0b0d0c;
        }
    }
}

.lifeModele-box {
    font-size: 0;
    width: 100%;
    .lifeModuleList {
        padding-top: .35rem;
        box-sizing: content-box;

        .title {
            font-size: .36rem;
            color: #17191a;
            box-sizing: content-box;
            text-indent: .3rem;
            margin-bottom: .24rem;
            font-weight: 500;
        }
        ul {
            overflow: hidden;
            li {
                float: left;
                width: 25%;
                margin-bottom: .24rem;
                img {
                    width: .9rem;
                    height: .9rem;
                    display: block;
                    margin: 0 auto .12rem auto;
                }
                span {
                    display: block;
                    width: 100%;
                    font-size: .22rem;
                    text-align: center;
                }
            }
        }
    }
}

</style>