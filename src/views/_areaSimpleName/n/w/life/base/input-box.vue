<template>
    <div class="wrap" :class='{warning: content.warning}'>
        <div class="title"><span :class="{must: content.must}">{{content.text}}</span></div>
        <input type="text" :placeholder="content.placeHolder" v-model="inputVal" :class="{small: content.size == 'small'}">
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
            inputVal: this.content.reset ? this.content.reset : ''
        }
    },
    mounted() {
        this.inputVal = this.content.reset ? this.content.reset : ''
    },
    computed: {

        reset() {
            return this.content.reset
        }
    },
    watch: {
        reset(newVal) {
            this.inputVal = newVal
        }
    }

}
</script>
<style scoped lang="less">
.wrap {
    min-width: 630px;
    height: 48px;
    margin-top: 20px;
    .title {

        font-size: 16px;
        float: left;
        color: #17191a;
        width: 70px;
        margin-right: 30px;
        text-align: right;
        line-height: 48px;
        span {
            position: relative;
            &.must::before {
                content: '*';
                color: #f00;
                position: absolute;
                left: -10px;
            }
        }
    }
    input {
        font-family: 'Microsoft Yahei';
        outline: none;
        box-sizing: border-box;
        width: 538px;
        height: 48px;
        border: 1px solid #ccc;
        color: #17191a;
        font-size: 16px;
        overflow: hidden;
        display: block;
        padding-left: 15px;
        &.small {
            width: 250px;
        }


        &::-webkit-input-placeholder {
            color: #ccc;
        }
    }
    &.warning>input {
        &::-webkit-input-placeholder {
            color: #f00;
        }
    }
}
</style>