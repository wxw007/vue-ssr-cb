<template>
    <div>
        <div class="item-box wrap">
            <div class="title"><span v-for="text in titleArr" >{{text}}</span></div>
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
        titleArr() {
            return this.content.text.split('')
        },
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
    margin: .25rem .3rem;
    border: 1px solid #ccc;
    height: .9rem;
    padding: .22rem 0;
    .title {
        font-size: .32rem;
        float: left;
        color: #17191a;
        width: 1.8rem;
        border-right: #e0e0e0 1px solid;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .25rem;
        margin-right: .25rem;
        text-align-last: justify;
    }
    select {
        -webkit-appearance: none;
        background: url(~@/assets/m/images/select-icon.png) no-repeat right center;
        background-size: .2rem;
        outline: none;
        border: none;
        color: #17191a;
        font-size: .32rem;
        overflow: hidden;
        display: block;
        width: 4.7rem;
        -webkit-tap-highlight-color: transparent;
        &::-webkit-input-placeholder {
            color: #ccc;
        }
    }
}
</style>