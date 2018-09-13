<template>
    <div>
        <mine-top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow" :clear="mineTop.clear" @clearContent="clear"></mine-top>
        <info-list :infoList='infoList'></info-list>
    </div>
</template>
<script>
import infoList from '../base/infoList.vue'
import mineTop from "../base/mine-top.vue"
export default {
    components: {
        infoList,
        mineTop
    },
    data() {
        return {
            infoList: [],
            mineTop: {
                topTitle: '历史记录',
                back: true,
                shadow: true,
                clear: true
            },
        }
    },
    mounted() {
        this.infoList = localStorage.historyList ? JSON.parse(localStorage.historyList) : []
    },
    methods:{
        clear(){
            var r = confirm('确定删除记录吗?');
            if(r){
                this.infoList = [];
                localStorage.removeItem('historyList')
            } else {
                return
            }
            
        }
    }
}
</script>
<style src="../../base/static/css/base.css"></style>
<style src="../../base/static/css/themes.css"></style>
<style>
</style>