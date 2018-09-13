<template>
    <div>
        <mine-top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow"></mine-top>
        <div class="list">
            <ul>
                <li v-for="item,index in travelOrderList">
                    <div class="info">
                        <img class="info-img" :src="item.travelImg" alt="" @click="gotoUrl(item)">
                        <div class="info-text">
                            <div class="info-title" @click="gotoUrl(item)">{{item.travelTitle}}</div>
                            <div class="info-time">{{item.inputTime | timezoneconvert}}</div>
                        </div>
                    </div>
                    <div class="operation">
                        <div v-if="item.travelApplyState != '2'" class="status">您的订单还未得到回复</div>
                        <div v-else class="status active" @click="viewReply(item)">商家已回复您的消息,请查看</div>
                        <div class="btn">
                        	<span @click="del(item, index)">取消预订</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
/** 
 * 个人中心-旅游订单
 * @author wxw
 * @since 2018-07-02 16:47
 */
import timezoneconvert from '@/util/filter/timezoneconvert'
import { resolveUrl } from '@/util/common/url.js'
import { getTravelList,delTravelOrder } from '@/api/web/index'
import footTab from "../../base/foot/foot-tab.vue"
import mineTop from "../base/mine-top.vue"

export default {

    components: {
        footTab,
        mineTop
    },
    
    data() {
        return {
            travelOrderList:[],
            mineTop: {
                topTitle: '旅游订单',
                back: true,
                shadow: true
            },
        }
    },
    filters: {
        timezoneconvert
    },
    mounted(){
        this.fetchTravelList()
    },
    methods:{
        fetchTravelList () {
          getTravelList().then(response => {
                    let result = response.data;
                    if(result.success) {
                        this.travelOrderList = result.data.travelapplyList
                    }
                })
        },
        del(item, index){
            var r = confirm('确定取消预订吗?');
            if(r){
                delTravelOrder({id: item.travelApplyId}).then( response => {
                let result = response.data;
                if(result.success){
                    alert('取消成功');
                    this.travelOrderList.splice(index,1)
                } else {
                    alert('操作失败')
                }
            }) 
            } else {
                return 
            }
           
        },
        viewReply(item){
            let str = JSON.stringify(item)
            sessionStorage.setItem('travelItem', str);
            location.href = window.location.href + '/reply';
        },
        gotoUrl(item){
            window.location.href = item.url
        }
    }
}
</script>
<style src="../../base/static/css/base.css"></style>
<style src="../../base/static/css/themes.css"></style>
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

                .info-img {
                    width: 1.72rem; // height: 1.34rem;
                    border-radius: .04rem;
                    float: left;
                    margin-right: .3rem;
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
                    	// position: absolute;
                        font-size: .28rem;
                        color: #879399;
                        bottom: .15rem;
                        text-align: right;
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
                    &.active{
                    	color: #f04c5b;
                    }
                }
                .btn {
                    float: right;
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
</style>