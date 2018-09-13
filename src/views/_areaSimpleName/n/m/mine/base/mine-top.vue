<template>
    <div>
        <div class="top" :class="{shadow:shadow}">
            <img @click="goback()" v-if="back" class="back" src="@/assets/m/images/back.png" alt="">
            <span class="text">{{topTitle}}</span>
            <span class="clear" v-if="clear" @click="cls">清空</span>
        </div>
        <div class="pd"></div>
    </div>
    
</template>
<script>
/** 
 * 个人中心-头部栏
 * @author wxw
 * @since 2018-07-03 14:24
 */
import { resolveUrl } from '@/util/common/url.js'

export default {
    props: ['topTitle', 'back', 'shadow','clear'],
    methods:{
        goback(){
            let host = window.location.href.toString();
            let publishOrderHost = '/life-publish-order',
                collectionHost = '/collection',
                historyHost = '/history',
                travelOrdernHost = '/travel-order',
                loginHost = '/login';
            if(host.indexOf(publishOrderHost)>-1){
                let a = host.split(publishOrderHost)
                window.location.href = a[0]
            } else if( host.indexOf(collectionHost)>-1){
                let a = host.split(collectionHost)
                window.location.href = a[0]
            } else if( host.indexOf(historyHost)>-1){
                let a = host.split(historyHost)
                window.location.href = a[0]
            } else if( host.indexOf(travelOrdernHost)>-1){
                let a = host.split(travelOrdernHost)
                window.location.href = a[0]
            } else if( host.indexOf(loginHost)>-1){
                let a = host.split(loginHost)
                window.location.href = a[0]
            }
            else {
                window.history.go(-1)
            }
        },
        cls(){
            this.$emit('clearContent')
        }
    }
}
</script>
<style scoped lang="less">
.top {
    -webkit-tap-highlight-color: transparent;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: .89rem;
    background: #fff;
    text-align: center;
    font-size: .36rem;
    line-height: 0.89rem;
    color: #149ea4;
    .back {
        position: absolute;
        box-sizing: content-box;
        display: block;
        width: .2rem;
        margin-top: .16rem;
        margin-left: .26rem;
        padding: .1rem;
    }
    .text{
        font-weight: 400;
        display: inline-block;
        max-width: 3.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
    .clear{
        position: absolute;
        right: .26rem;
        margin-right: .26rem;
        font-weight: 400;
        display: inline-block;
        max-width: 3.5rem;
    }
}
.pd{
    height: .89rem;
}

.shadow {
    box-shadow: 0px 0px 4px 0px rgba(34, 23, 20, 0.1);
}
</style>