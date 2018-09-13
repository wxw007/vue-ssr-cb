<template>
    <div>
        <mine-top :topTitle="mineTop.topTitle" :back="mineTop.back" :shadow="mineTop.shadow" :clear="mineTop.clear" @clearContent="clear"></mine-top>
        <info-list :infoList='infoList'></info-list>
    </div>
</template>
<script>
import { getCollectionList,clearCollectionList } from '@/api/wei'
import infoList from '../base/infoList.vue'
import mineTop from "../base/mine-top.vue"
import scrolling from "../base/scrolling.vue"
export default {
    components: {
        infoList,
        scrolling,
        mineTop
    },
    data() {
        return {
            infoList: [],
            mineTop: {
                topTitle: '文章收藏',
                back: true,
                shadow: true,
                clear: true
            },
        }
    },
    mounted() {
        // this.infoList = localStorage.historyList ? JSON.parse(localStorage.historyList) : [];
        getCollectionList().then( response => {
        		let result = response.data;
        		if(result.success){
        			this.infoList = result.data;
        		}
        	})
    },
    methods:{
        clear(){
            var r = confirm('确定删除数据吗?');
            if(r){
               this.clearList()
            } else {
                return
            }
            
        },
        freshData(){
        	getCollectionList().then( response => {
        	})
        },
        clearList(){
        	clearCollectionList().then( response => {
        		let result = response.data;
        		if(result.success){
        			alert('删除成功')
        			this.infoList = [];
        		}
        	})
        },

    }
}
</script>
<style src="../../base/static/css/base.css"></style>
<style src="../../base/static/css/themes.css"></style>
<style>
</style>