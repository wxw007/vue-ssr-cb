<template>
    <div>
        <mine-top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow"></mine-top>
            <div class="list">
                <ul>
                    <li v-for="service,index in serviceList" :key="service.id">
                        <div class="info" @click.stop="gotoDetail(service)">
                            <div class="info-img-box">
                                <img class="info-img" :src="service.titleImgUrl" alt="">
                            </div>
                            <div class="info-text">
                                <a class="info-title">
                              {{service.title}}
                            </a>
                                <div class="info-time">{{service.inputTime | timezoneconvert}}</div>
                            </div>
                        </div>
                        <div class="operation">
                            <div class="status" v-if="service.serviceState=='1'">待审核</div>
                            <div class="status" v-else-if="service.serviceState=='2'">审核不通过</div>
                            <div class="status" v-else-if="service.serviceState=='3'">审核通过</div>
                            <div class="btn">
                                <div v-if="service.serviceState=='3'">
                                    <span v-if="service.isPut == '0'" @click="up(service)">上架</span>
                                    <span v-else @click="down(service)">下架</span>
                                </div>
                                <span @click="del(service,index)">删除</span>
                                <span @click="edit(service)">编辑</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        <confirm class="confirm-box" :option='confirmOption' :handleObj="handleObj" @handle="confirmHandle" v-if="isShowConfirm"></confirm>
        <div class="tips" v-show="isShowTips">{{loadingText}}</div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-07-02 16:47
 */
import timezoneconvert from '@/util/filter/timezoneconvert'
import { resolveUrl } from '@/util/common/url.js'
import {
    lifePublishOrder

} from '@/api/wei'
import {
    upLifeService,
    downLifeService,
    delLifeService
} from '@/api/web'
// import lifePublishOrderModule from '@/store/modules/m/mine/life-publish-order.js'
import footTab from "../base/foot/foot-tab.vue"
import confirm from "./confirm.vue"
import mineTop from "./base/mine-top.vue"

export default {
    // storeModule() {
    //     return { lifePublishOrderModule };
    // },
    // asyncData({ store }) {
    //     return store.dispatch("lifePublishOrder/fetchData");
    // },
    components: {
        footTab,
        mineTop,
        confirm
    },
    filters: {
        timezoneconvert
    },
 
    data() {
        return {
            isShowTips: true,
            mineTop: {
                topTitle: '生活发布',
                back: true,
                shadow: true
            },
            serviceList: [],
            handleObj: {},
            isShowConfirm: false,
            confirmOption: {
                tips: '提示',
                info: '确定删除吗?',
                yes: '确定',
                no: '取消'
            },
            load:true,
            loadingText: '加载中...'

        }
    },
    mounted() {
        this.getPageData();
        window.addEventListener('scroll', this.loadmore)
    },
    methods: {
        getPageData() {
            var that = this;
            lifePublishOrder()
                .then(response => {
                    let result = response.data;
                    if (result.success) {
                        result.data.forEach(item => {
                            that.insertUrl(item)
                        })
                        this.serviceList = result.data
                    }
                    this.isShowTips = false
                })
        },
        loadmore(){
            if(window.scrollY + window.innerHeight >= document.body.offsetHeight && this.load){
                this.load = false;
                this.isShowTips = true;
                var len = this.serviceList.length;
                var id = this.serviceList[len-1].id;
                lifePublishOrder({'id':id}).then( response => {
                    let result = response.data;
                    if (result.success) {
                        if(result.data.length == 0){
                            this.load = false;
                            this.isShowTips = false;
                            return
                        }
                        result.data.forEach(item => {
                            this.insertUrl(item)
                        })
                        this.serviceList = this.serviceList.concat(result.data)
                        this.load = true;
                    }
                    this.isShowTips = false;
                })

            }
        },
        insertUrl(item) {
            var url = '',
                prefix1 = '/mlifeservice/',
                prefix2 = '_infoView.do?areaId=',
                id = 'Id=',
                food = 'food',
                recruit = 'recruit',
                job = 'job',
                housing = 'housing',
                tongcity = 'tongcity',
                selfdefining = 'selfdefining';
            switch (item.moduleId) {
                case '1':
                    url = prefix1 + food + prefix2 + item.areaId + '&' + food + id + item.id
                    break;
                case '4':
                    url = prefix1 + recruit + prefix2 + item.areaId + '&' + recruit + id + item.id
                    break;
                case '5':
                    url = prefix1 + job + prefix2 + item.areaId + '&' + job + id + item.id
                    break;
                case '6':
                    url = prefix1 + housing + prefix2 + item.areaId + '&' + housing + id + item.id
                    break;
                case '8':
                    url = prefix1 + tongcity + prefix2 + item.areaId + '&' + tongcity + id + item.id
                    break;
                case '9':
                    url = prefix1 + selfdefining + prefix2 + item.areaId + '&' + selfdefining + id + item.id
                    break;
                default:
                    break;
            }
            // item.url = window.location.host + url
            item.url =  url
        },
        gotoDetail(item) {
            // window.location.href = item.url
            this.$router.push(item.url)
        },
        up(service) {
            upLifeService(service).then(response => {
                let result = response.data;
                if (result.success) {
                    service.isPut = '1';
                }
            });
        },
        down(service) {
            downLifeService(service).then(response => {
                let result = response.data;
                if (result.success) {
                    service.isPut = '0';
                }
            });
        },
        // del(service, index) {
        //     let r = confirm("确定要删除?")
        //     if (r == true) {
        //         delLifeService(service).then(res => {
        //             if (res.data.success) {
        //                 alert('删除成功');
        //                 this.serviceList.splice(index, 1)
        //             }
        //         })
        //     } else {
        //         return
        //     }
        // },
        del(service, index) {
            this.handleObj = service;
            this.handleObj.handleIndex = index;
            this.isShowConfirm = true;
        },
        confirmHandle(t) {
            this.isShowConfirm = false;
            var index = t.handleObj.handleIndex;
            var obj = delete t.handleObj.handleIndex;
            if (t.result) {
                delLifeService(t.handleObj).then(res => {
                    if (res.data.success) {
                        alert('删除成功');
                        this.serviceList.splice(index, 1)
                        this.handleObj = {}
                    } else {
                        alert('操作失败');
                        this.handleObj = {}
                    }
                })
            }

        },
        edit(service) {
            switch (service.moduleId) {
                case '1': //美食天地
                    window.location.href = resolveUrl(this.$store, '/n/m/life/foodservice/addView?id=') + service.id
                    break;
                case '4': //招聘
                    window.location.href = resolveUrl(this.$store, '/n/m/life/recruitservice/addView?id=') + service.id
                    break;
                case '5': //求职
                    window.location.href = resolveUrl(this.$store, '/n/m/life/jobservice/addView?id=') + service.id
                    break;
                case '6': //房产信息
                    window.location.href = resolveUrl(this.$store, '/n/m/life/housingservice/addView?id=') + service.id
                    break;
                case '8': //同城服务
                    window.location.href = resolveUrl(this.$store, '/n/m/life/tongcityservice/addView?id=') + service.id
                    break;
                case '9': //自定义
                    window.location.href = resolveUrl(this.$store, '/n/m/life/selfdefiningservice/addView?id=') + service.id
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style src="../base/static/css/base.css"></style>
<style src="../base/static/css/themes.css"></style>
<style scoped lang="less">
@font26: .26rem;
* {
    padding: 0;
    margin: 0;
    box-sizing: content-box;
}

.list {
    ul {

        li {
            padding: 0 .3rem;
            border-bottom: .08rem solid #e8e8e8;
            .info {
                padding: .2rem 0;
                overflow: hidden;
                border-bottom: 1px solid #e8e8e8;
                position: relative;
                .info-img-box {
                    width: 1.72rem;
                    height: 1.34rem;
                    border-radius: .04rem;
                    float: left;
                    margin-right: .3rem;
                    overflow: hidden;
                    .info-img {
                        width: 100%; // height: 100%;
                    }
                }

                .info-text {
                    overflow: hidden;
                    .info-title {
                        font-size: .34rem;
                        color: #17191a;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .info-time {
                        font-size: .28rem;
                        color: #879399;
                        position: absolute;
                        bottom: .15rem;
                        right: 0;
                    }
                }
            }
            .operation {
                overflow: hidden;
                padding: .15rem 0;
                position: relative;
                .status {
                    color: #879399;
                    font-size: @font26;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .btn {
                    float: right;
                    div {
                        float: left;
                    }
                    span {
                        float: right;
                        background: #f2f2f2;
                        border-radius: .08rem;
                        display: flex;
                        width: 1.4rem;
                        height: .6rem;
                        justify-content: center;
                        align-items: center;
                        color: #149ea4;
                        font-size: @font26;
                        margin-left: .1rem;
                    }
                }
            }
        }
    }
}

.confirm-box {
    position: fixed;
    top: 35%;
    left: 24%;
    overflow: hidden;
    width: 52%;
    margin: auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px #999;
}

.tips {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: rgba(0, 0, 0, .5);
    color: #fff;
    font-size: .32rem;
    width: 2.6rem;
    height: 1rem;
    border-radius: .2rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>