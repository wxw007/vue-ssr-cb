<template>
    <div class="wrap">
        <div class="title"><span v-for="item in titleArr">{{item}}</span></div>
        <div class="radio-box">
            <div v-for="item in content.list" :key="item.value" :class="{checked: item.value == currentChecked}" @click="checked(item.value)"><i></i>{{item.label}}</div>
            
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
            currentChecked: this.content.reset
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
            this.currentChecked = newVal
        }
    },
    methods:{
        checked(value){
            this.currentChecked = value
        }
    }


}
</script>
<style scoped lang="less">
.wrap {
    -webkit-tap-highlight-color: transparent;
    margin: .25rem .3rem;
    border: 1px solid #ccc; // height: .9rem;
    padding: .22rem 0;
    overflow: hidden;
    .title {
        font-size: .32rem;
        float: left;
        color: #17191a;
        width: 1.8rem;
        border-right: #e0e0e0 1px solid;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 .17rem 0 .25rem;
        margin-right: .25rem;
        text-align-last: justify;
    }
    .radio-box {
        font-size: 0;
        display: flex;
        align-items: center;
        &.h {
            height: .76rem;
        }
        div {
            vertical-align: middle;
           font-size: .32rem;
           display: inline-block;
           margin-right: .3rem;
           padding-right: .3rem;
           i{
            vertical-align: middle;
                display: inline-block;
                width: .33rem;
                height: .33rem;
                background: url(~@/assets/m/images/check.png) no-repeat;
                background-size: contain;
                margin-right: .05rem;

           }
           &.checked i{
               background: url(~@/assets/m/images/checked.png) no-repeat;
               background-size: contain;
           }
        }
    }
}
</style>