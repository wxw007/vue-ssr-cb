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
		margin: .3rem;
		.btn{
			width: 100%;
			height: .88rem;
			background: #149ea4;
			color: #fff;
			font-size: .32rem;
			text-align: center;
			line-height: .88rem;
			border-radius: 4px;
		}
		.agreement{
			margin-top: .12rem;
			font-size: .28rem;
			color: #879399;
			text-align: center;
			a{
				color: #149ea4;
			}
		}
	}
</style>
