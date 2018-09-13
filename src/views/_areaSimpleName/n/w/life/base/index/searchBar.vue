<template>
	<div class="search-bar">
		<form action="">
			<input  v-model="searchInfo" type="text" placeholder="请输入搜索内容" @keyup.enter="searchList">
			<span @click="searchList"><cButton :text="searchText"></cButton></span>
		</form>
		<cButton style="float:right" :text="publishText" @click.native="gotoPublish"></cButton>
	</div>
</template>

<script>
import { checkIsLogin } from '@/api/wei'
import { getQueryString } from '@/util/common/getQueryString.js'
import cButton from './cButton.vue'
import { resolveUrl } from "@/util/common/url.js"
	export default{
		components: {
			cButton
		},
		data() {
			return {
				searchText: '搜索',
				publishText: '发布',
				searchInfo:'',
				publishUrl: resolveUrl(this.$store, '/n/w/life/publish')
			}
		},
		mounted(){
			this.infoReset()
		},
		methods: {
			searchList(){
				var that = this;
				if(this.searchInfo){
					window.location.href = resolveUrl(this.$store, '/n/w/life/queryListAllServiceByKeyword?keyword=') + encodeURI(encodeURI(that.searchInfo))
				} else {
					window.location.href = resolveUrl(this.$store, '/n/w/life')
				}
				
			},
			gotoPublish(){
				checkIsLogin().then( response => {
					console.log(response);
					let result = response.data;
					if(result.success && result.msg == '1'){
						this.$router.push(this.publishUrl)
					} else {
						alert('请先登录')
					}
				})
			},
			infoReset(){
				var info = getQueryString('keyword')
				this.searchInfo = info ? decodeURI(info) : ''
				console.log(this.searchInfo)
			}
			
		}
	}
</script>

<style scoped lang="less">
.search-bar{
	width: 100%;
	height: 34px;
	// overflow: hidden;
	form{
		height: 100%;
		width: 86%;
		font-size: 14px;
		float: left;
		input{
			height: 100%;
			width: 85%;
			background: #f5f5f5;
			border-top-left-radius: 2px;
			border-bottom-left-radius: 2px;
			color: #999;
			line-height: 34px;
			border: 1px solid #ebebeb;
			text-indent: 14px;
		}
		.submit-btn{
			border-top-right-radius: 2px;
			border-bottom-right-radius: 2px;
		}
	}
}
</style>