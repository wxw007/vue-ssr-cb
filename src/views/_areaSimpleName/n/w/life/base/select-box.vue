<template>
    <div>
        <div class="item-box wrap" v-for="serviceType,index in content.list" :key="serviceType.sqtValue">
            <div class="title"><span v-for="text in serviceType.titleArr" >{{text}}</span></div>
            <select name="" id="" v-model="typeSelectVal[index]">
            	<option value="">请选择</option>
                <option v-for="type in serviceType.sqtdList" :value="type.sqtdValue" :key="type.sqtdValue">{{type.sqtdName}}</option>
            </select>
        </div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-07-06 11:32
 */
export default {
    props: {
        content: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            typeSelectVal: this.content.reset
        }
    },
    computed:{
        
        reset(){
            return this.content.reset
        }
    },
    watch:{
        reset(newVal){
            this.typeSelectVal = newVal
        }
    }
  
   
    
}
</script>
<style scoped lang="less">
.wrap {
     min-width: 630px;
        height: 48px;
        margin-top: 20px;
        .title{
            font-size: 16px;
            float: left;
            color: #17191a;
            width: 70px;
            margin-right: 30px;
            text-align: right;
            line-height: 48px;
        }
    select {
        padding-left: 15px;
        width: 145px;
        color: #17191a;
        font-size: 16px;
        display: block;
        height: 48px;
        border: 1px solid #ccc;
    }
}
</style>