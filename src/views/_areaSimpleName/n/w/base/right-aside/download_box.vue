<template>
    <affix v-if="showAffix">
        <!-- 下载华人头条的样式 -->
        <div class="down_box" ref="downBox">
            <div class="blue_header clearfloat">
                <h3>下载华人头条</h3>
            </div>
            <div class="down_div">
                <img :src="qrCodeImg">
            </div>
        </div>
        <embassyBox :embassy="embassy"></embassyBox>
    </affix>
    <div v-else>
        <div class="down_box" ref="downBox">
            <div class="blue_header clearfloat">
                <h3>下载华人头条</h3>
            </div>
            <div class="down_div">
                <img :src="qrCodeImg">
            </div>
        </div>
        <embassyBox :embassy="embassy"></embassyBox>
    </div>
</template>
<script>
    import affix from "../common/affix.vue"
    import embassyBox from './embassy_box.vue'
    export default {
        name: "web-n-downloadbox",
        props: {
            qrCodeImg: {
                default: require("@/assets/web/delete/wei_code.png")
            },
            embassy: {},
            showAffix: {
                default: true
            }
        },
        components: {
            affix,
            embassyBox
        }
    }
</script>
<style scoped>
    /* 
     * 二维码下载区域样式
     */

    .down_box {
        padding-top: 30px;
        background: #fff;
        z-index: 20;
    }

    .down_box .down_div {
        padding: 8.2% 13.7%;
        background-color: #fafafa;
    }

    .down_box .down_div img {
        width: 100%;
    }
</style>