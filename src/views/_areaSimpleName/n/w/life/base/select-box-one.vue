<template>
    <div>
        <div class="item-box wrap">
            <div class="title"><span>{{content.text}}</span></div>
            <select name="" id="" v-model="selectVal">
            	<option value="">请选择</option>
                <option v-for="item in content.list" :value="item.value" :key="item.value">{{item.label}}</option>
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
            selectVal: this.content.reset
        }
    },
    computed:{
        reset(){
            return this.content.reset
        }
    },
    watch:{
        reset(newVal){
            this.selectVal = newVal
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