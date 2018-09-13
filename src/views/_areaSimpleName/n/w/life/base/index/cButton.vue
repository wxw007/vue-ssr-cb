<template>
	<span class="c-button">{{text}}</span>
</template>
<script>
	export default{
		props:[
			'text'
		]
	}
</script>
<style scoped lang="less">
	.c-button{
		display: inline-block;
		width: 70px;
		height: 34px;
		color: #fff;
		background: #0082c6;
		text-align: center;
		line-height: 34px;
		cursor: pointer;
		font-size: 14px;
		border-radius: 2px;
	}
</style>