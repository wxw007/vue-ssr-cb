<template>
	<div>
		<div class="more" @click="show" :class='{active: isShow}'>
		    <p>填写完整信息</p>
		    <span class="down"></span>
		</div>
		<div class="more-msg-box" v-show="isShow">
		    <slot></slot>
		</div>
	</div>
</template>
<script>
    /** 
     * 
     * @author wxw
     * @since 2018-07-06 17:17
     */
    export default {
    	data() {
    		return {
    			isShow: false
    		}
    	},
    	methods:{
    		show() {
    			this.isShow = !this.isShow
    		}
    	}
    }
</script>
<style scoped lang="less">
.more {
    text-align: center;
    height: .9rem;
    -webkit-tap-highlight-color: transparent;
    font-size: 0;
    span {
        width: .27rem;
        height: .23rem;
        display: inline-block;
        background: url(~@/assets/m/images/more-down.png) no-repeat;
        background-size: .18rem .23rem
    }
    p {
        color: #999;
        font-size: .31rem;
        margin-bottom: .033rem;
    }
    &.active{
    margin-top: -.25rem;
    height: .65rem;

    }
    &.active span {
        background: url(~@/assets/m/images/more-up.png) no-repeat;
        background-size: .18rem .23rem;
        margin-top: .33rem
    }
    &.active p {
        display: none
    }
}

</style>