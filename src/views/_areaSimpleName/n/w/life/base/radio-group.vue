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
            currentChecked: ''
        }
    },
    computed: {
        titleArr() {
            return this.content.text.split('')
        },
        reset() {
            return this.content.reset
        }
    },
    watch: {
        reset(newVal) {
            this.currentChecked = newVal
        }
    },
    methods: {
        checked(value) {
            this.currentChecked = value
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
    }
    .radio-box {
        padding-top: 14px;
        font-size: 0;

        &.h {
            height: 48px
        }
        div {
            cursor: pointer;
            vertical-align: middle;
            font-size: 16px;
            display: inline-block;
            margin: 0 15px;
            i {
                float: left;
                margin-top: 3px;
                vertical-align: middle;
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url(~@/assets/m/images/check.png) no-repeat;
                background-size: contain;
                margin-right: 4px;
            }
            &.checked i {
                background: url(~@/assets/m/images/checked.png) no-repeat;
                background-size: contain;
            }
        }
    }
}
</style>