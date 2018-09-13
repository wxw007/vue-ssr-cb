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
    min-width: 630px;
    height: 48px;
    margin-top: 20px;
    .title {
            font-size: 16px;
            float: left;
            color: #17191a;
            width: 70px;
            margin-right: 30px;
            text-align: right;
    }
    .btn-group{
        padding-top: 10px;
    
        &.h{
        height: 48px;

        }
		span{
            display: inline-block;
            cursor: pointer;
			color: #17191a;
			font-size: 16px;
            margin: 0 15px;
            &::before{
                float: left;
                margin-top: 3px;
                margin-right: 5px;
                display: inline-block;
                content: '';
                width: 16px;
                height: 16px;
                background: url('./img/no-checked.png') no-repeat;
                background-size: cover;

            }
			&.active{
                &::before{
                    background: url('./img/checked.png') no-repeat;
                    background-size: cover;
                }
                
			}			

		}
    }
}
</style>