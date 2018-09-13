<template>
	<div class="btn-wrap">
		<div class="btn" @click="submit">发 布</div>
		<div class="agreement">确认您已阅读并同意此 <a @click="gotoAgreeMent">发布协议</a></div>
	</div>
</template>
<script>
    /** 
     * 
     * @author wxw
     * @since 2018-07-09 16:57
     */

    export default {
    	methods:{
    		submit() {
    			this.$emit('submit')
    		},
    		gotoAgreeMent(){
    			// var locationHref = window.location.href.split('life/');
    			// var url = locationHref[0] + 'life/agreeMent'
    			// window.location.href = url
    			this.$emit('gotoAgreeMent')
    		}
    	}
    }
</script>
<style scoped lang="less">
	.btn-wrap{
		margin-top: 46px;
		.btn{
			width: 132px;
			height: 42px;
			margin: 0 auto;
			background: #0082c6;
			color: #fff;
			font-size: 16px;
			text-align: center;
			line-height: 42px;
			border-radius: 4px;
			cursor: pointer;
		}
		.agreement{
			margin-top: 16px;
			font-size: 14px;
			color: #879399;
			text-align: center;
			a{
				color: #0082c6;
				cursor: pointer;
			}
		}
	}
</style>
