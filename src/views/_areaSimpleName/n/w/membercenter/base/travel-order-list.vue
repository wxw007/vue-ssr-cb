<template>
    <div class="order-content ">
        <div v-for="travelItem in travelList"  class="order-item">
            <img :src="travelItem.travelImg">
            <div class="item_right ">
                <div class="item_headline clearfloat">
                    <h3>
			            <a :href="travelUrl+travelItem.travelId" target="_blank">
			              {{travelItem.travelTitle}}
			            </a>
                   </h3>
                    <p>{{travelItem.inputTime | timezoneconvert}}</p>
                    <div class="item_msg">
                        <span class="state-type no" v-if="!travelItem.replyContent">您的订单未得到回复</span>
                        <span class="state-type reply" v-if="travelItem.replyContent" :class="{active: isShow[travelItem.travelApplyId]}" @click="viewReply(travelItem.travelApplyId)">商家已回复您的消息，请查看</span>
                        <span class="do-btn" @click="delTravelApplyList(travelItem)">取消预订</span>
                    </div>
                </div>
            </div>
            <div class="reply-content"  v-show="isShow[travelItem.travelApplyId]">
                <div class="reply-item">
                   {{travelItem.replyContent}}
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import timezoneconvert from '@/util/filter/timezoneconvert'
 import { resolveUrl } from "@/util/common/url.js"
export default {
    props: {
        travelList: {
            default () {
                return [];
            }
        }
    },
    data() {
        return {
        	isShow:{},
            travelUrl: resolveUrl(this.$store, '/n/w/life/travel/')
        };
    },
    filters: {
        timezoneconvert
    },
    methods: {
        viewReply(id){
        	if(this.isShow[id] == undefined){
				this.$set(this.isShow, id, true)
        	}else{
        		this.isShow[id] = !this.isShow[id];
        	}
        },
        delTravelApplyList(travelItem) {
        	 this.$store.dispatch("memberLifeService/delTravelApplyList", {id:travelItem.travelApplyId})
          .then(response => {
            this.travelList.splice(this.travelList.indexOf(travelItem), 1)
          })

        }
    	
    }
};
</script>
<style scoped>
.order-content {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: all 0.8s ease-in-out;
}





/* 
     * 列表的样式
     */

.order-item {
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #f2f2f2;
}

.order-item img {
    /* width: 22.727%; */
    width: 160px;
    height: 124px;
}

.order-item .item_right {
    position: relative;
    float: right;
    width: 74.29%;
    height: 124px;
    padding-top: 6px;
}

.order-item .item_headline {
    position: relative;
    width: 100%;
    height: 100%;
}

.order-item .item_headline h3 {
    width: 100%;
    height: 52px;
    line-height: 26px;
    font-size: 18px;
    color: #17191a;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.order-item .item_headline h3 a {
    width: 100%;
    height: 52px;
    line-height: 26px;
    font-size: 18px;
    color: #17191a;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.order-item .item_headline p {
    font-size: 14px;
    color: #666;
    line-height: 23px;
    height: 23px;
    overflow: hidden;
}

.order-item .item_headline .item_msg {
    position: absolute;
    width: 100%;
    height: 24px;
    line-height: 15px;
    /* padding-top: 10px; */
    bottom: 10px;
}

.order-item .item_headline .item_msg span {
    float: left;
    display: inline-block;
    height: 15px;
    line-height: 16px;
    font-size: 12px;
}

.order-item .item_headline .item_msg .state-type {
    font-size: 15px;
    margin-top: 10px;
    color: #0082C6;
    vertical-align: middle;
}

.order-item .item_headline .item_msg .state-type.no {
    color: #666;
    cursor: default;
}
.order-item .item_headline .item_msg .state-type.reply {
    cursor: pointer;
}

.order-item .item_headline .item_msg .state-type.reply::after {
    content: '';
    display: inline-block;
    width: 10px;
    height: 5px;
    vertical-align: middle;
    background: url('./icon.png') no-repeat;
    background-size: 10px 5px;
    margin-left: 5px;
    margin-top: -4px;
}

.order-item .item_headline .item_msg .state-type.reply.active::after {
    background: url('./icon2.png') no-repeat;
    background-size: 10px 5px;
}

.order-item .item_headline .item_msg .do-btn {
    float: right;
    display: block;
    width: 80px;
    height: 24px;
    line-height: 24px;
    font-size: 15px;
    color: #fff;
    background: #0082C6;
    text-align: center;
    margin-left: 17px;
    border-radius: 2px;
    cursor: pointer;
}

.order-content .reply-content {
    width: 100%;
    padding: 20px 16px;
    clear: both;
    background: #fafafa;
}

.order-content .reply-content .reply-item {
    padding:0 0 0 30px;
    color: #666;
    font-size: 14px;
    background: url('seller-icon.png') no-repeat 0 2px;
    background-size: 18px 14px;
    margin-bottom: 18px;
}

.order-content .reply-content .reply-item:last-child {
    margin-bottom: 0
}
</style>