<template>
	<div><textarea name="" id="" cols="30" rows="10" placeholder="请输入详情" v-model="detailText"></textarea></div>
	
</template>
<script>
    /** 
     * 
     * @author wxw
     * @since 2018-06-27 11:44
     */
    export default {
    	data(){
    		return {
    			detailText:''
    		}
    	}
    }
</script>
<style scoped>
div{
	overflow: hidden;
	width: 530px;
		height: 180px;
}
	textarea{
		width: 100%;
		height: 100%;
		resize: none;
		padding: 10px 1em;
		font-family: 'Microsoft YaHei'
	}
	textarea::-webkit-input-placeholder{
		font-size: 16px;
		color: #ccc;
	}
</style>