<template>
		<div class="box">
			<div class="tips">{{option.tips}}</div>
			<div class="info">{{option.info}}</div>	
			<div class="yes" @click="handle(true)">{{option.yes}}</div>
			<div class="no" @click="handle(false)">{{option.no}}</div>
	</div>
</template>
<script>
    /** 
     * 弹窗组件
     * @author wxw
     * @since 2018-07-27 15:00
     */
    export default {
    	props:{
    		option:{
    			type: Object,
    			default: {
    				
    			}
    		},
    		handleObj:{
    			type: Object,
    			default:{}
    		}
    	},
    	data(){
    		return{
    			handleOption:{}
    		}
    	},
    	methods:{
    		handle(t){

    			this.handleOption.result = t;
    			this.handleOption.handleObj = this.handleObj;
    			this.$emit('handle', this.handleOption)
    		}
    	}
    }
</script>
<style scoped lang='less'>
*{
	margin: 0;
	padding: 0;
}
	div{
		font-size: 16px;
		text-align: center;
	}
	.box{
		
		.tips{
			padding-top: 5px;
			font-weight: bold;
		}
		.info{
			padding: 10px 0;
		}
		.no{
			float: left;
			border-right: 1px solid #aaa;
		}
		.yes{
			float: right;
			margin-left: -1px;
		}
		.no, .yes{
			width: 50%;
			border-top: 1px solid #aaa;
			padding: 8px 0;
		}
	}
</style>