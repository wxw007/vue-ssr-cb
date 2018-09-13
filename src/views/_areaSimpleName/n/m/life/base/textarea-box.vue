<template>
 <div class="wrap" :class='{warning: content.warning}'>
 	<div class="title"><span v-for="item in titleArr">{{item}}</span></div>
 	<textarea cols="30" rows="10" :placeholder="content.placeHolder" v-model="inputVal"></textarea>
 </div>
</template>
<script>
    /** 
     * 
     * @author wxw
     * @since 2018-07-06 11:32
     */
    export default {
    	props:{
    		content:{
    			type: Object,
    			default: ''
    		}
    	},
    	data() {
    		return {
    			inputVal: this.content.reset
    		}
    	},
    	computed:{
    		titleArr() {
    			return this.content.text.split('')
    		},
    		reset(){
    			return this.content.reset
    		}
    	},
    	watch:{
    		reset(newVal){
    			this.inputVal = newVal
    		}
    	}
    }
</script>
<style scoped lang="less">
*{

}
	.wrap{
		margin: .25rem .3rem;
		border: 1px solid #ccc;
		height: 2.2rem;
		padding: .22rem 0;
		.title{
			font-size: .32rem;
			float: left;
			color: #17191a;
			width: 1.8rem;
			height: 1.5rem;
			border-right: #e0e0e0 1px solid;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 .25rem;
			margin-right: .25rem;
		}
		textarea{
			width: 4.9rem;
			height: 1.5rem;
			border:none;
			outline: none;
			resize:none;
			color: #17191a;
			font-size: .32rem;
			overflow: auto;
			display: block;
			width: 4.7rem;
			-webkit-tap-highlight-color:transparent;
			&::-webkit-input-placeholder{
				color: #ccc;
			}
		}
		&.warning>textarea{
			&::-webkit-input-placeholder{
				color: #f00;
			}
		}
	}
</style>