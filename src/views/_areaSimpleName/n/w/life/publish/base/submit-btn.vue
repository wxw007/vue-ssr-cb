<template>
    <div>
        <div class="btn" @click="submit">发布</div>
        <p class="agreement">确认您已阅读并同意此<span>发布协议</span></p>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-05-07 09:12
 */
export default {
	methods: {
		submit(e) {
			this.$emit('submitData',e)
		}
	}
}
</script>
<style scoped>
 .btn{
 	display: block;
 	margin: 40px auto 0 auto;
 	width: 132px;
 	height: 42px;
 	background: #0082c6;
 	border-radius: 2px;
 	text-align: center;
 	line-height: 42px;
 	color: #fff;
 	font-size: 18px;
 	outline: none;
 	border: none;
 	cursor: pointer;

 }
 .agreement{
 	text-align: center;
 	color:  #879399;
 	font-size: 18px;
 	margin-top: 20px;

 }
 .agreement span{
 	color: #0082c6;
 	cursor: pointer;
 }
</style>