<template>
    <div class="wrap">
        <div class="title" v-if="content.ps">{{content.text}}<br>{{content.ps}}</div>
        <div class="title"v-if="!content.ps">{{content.text}}</div>
        <div class="btn-group" :class="{h: content.ps}">
            <span class="btn-item"  :class='{active: selectList[item.service]=="1"}' v-for="item in content.list" :key="item.service" @click="serversChecked(item.service)">{{item.label}}</span>
        </div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-07-06 11:32
 */
export default {
    props: {
        content: {
            type: Object,
            default: {}
        }
    },
    data(){
    	return{
    		selectList: this.content.reset
    	}
    },
    computed:{
        reset(){
            return this.content.reset
        }
    },
    watch:{
        reset(newVal){
            this.selectList = newVal
        }
    },
    methods: {
    	serversChecked(id) {
    		if(this.selectList[id] == "0" || !this.selectList[id]){
    			this.$set(this.selectList, id, "1")
    		} else {
    			this.selectList[id] = "0"
    		}
    	}
    }

}
</script>
<style scoped lang="less">
.wrap {
    margin: .25rem .3rem;
    border: 1px solid #ccc;
    // height: .9rem;
    padding: .22rem 0;
    overflow: hidden;
    .title {
        font-size: .32rem;
        float: left;
        color: #17191a;
        width: 1.8rem;
        border-right: #e0e0e0 1px solid;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .17rem 0 .25rem;
        margin-right: .25rem;
        text-align-last: justify;
    }
    .btn-group{
    	font-size: 0;
    	display: flex;
    	align-items: center;
        &.h{
        height: .76rem;

        }
		span{
			background: #f5f5f5;
			padding: .05rem .25rem;
			margin-right: .4rem;
			border-radius: 2px;
			color: #149EA4;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: .32rem;
			&.active{
				background: #149EA4;
				color: #fff;
			}			

		}
    }
}
</style>