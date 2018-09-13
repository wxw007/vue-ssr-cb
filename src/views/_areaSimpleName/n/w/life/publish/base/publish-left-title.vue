<template>
    <div class="title-box">
        <div class="left-title"><span :class='{icon:must}'>{{titleText}}</span></div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-03-23 15:08
 */
export default {
    props:{
        titleText:{
            type: String
        },
        must:{
            typee: Number
        }
    },

    data() {
    	return {
    		
    	}
    }
}
</script>
<style scoped>
.title-box{
	width: 80px;
	height: 48px;
	float: left;
	margin-right: 25px;
}
.left-title {
    display: table-cell;
    width: 80px;
    height: 48px;
    font-size: 16px;
    
    color: #222;
    cursor: default;
    vertical-align: middle;
    text-align: right;
}

.left-title>span {
    display: inline-block;
    vertical-align: middle;
}
.icon::before{
	content: '* ';
	color: #ed1a23;
}
</style>