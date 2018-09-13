<template>
<!-- 
    蓝色标题
 -->
    <div class="blue_header clearfloat">
        <h3>{{text}}</h3>
        <a v-if="isShow" :href="href">更多</a>
    </div>
</template>
<script>
    export default {
        props: {
            text: {//判断是不是
                type: String,
                default: "请设置标题"
            },
            isShow: {//判断是不是
                type: Boolean,
                default: false
            },
            href: {//判断是不是
                type: String,
                default: "####"
            },
        },
        methods: {
            
        }
    };
</script>
<style >
    /* 
    顶部的蓝色标题样式
    */
    .blue_header {
    width: 100%;
    height: 28px;
    border-bottom: 1px solid #ccc;
    }

    .blue_header h3 {
    display: block;
    float: left;
    height: 27px;
    line-height: 20px;
    font-size: 16px;
    color: #0082C6;
    padding-right: 9px;
    border-bottom: 2px solid #0082C6;
    cursor: pointer;
    }

    .blue_header a {
    float: right;
    line-height: 24px;
    font-size: 13px;
    color: #0082C6;
    }
</style>