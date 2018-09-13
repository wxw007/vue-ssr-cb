<template>
    <!-- 关于我们 -->
    <div class="about_box">
        <div class="blue_header clearfloat">
            <h3>关于我们</h3>
        </div>
        <div class="about_area">
            <p>© 2017 华人头条</p>
            <p>服务热线 : 0591-83771172
                <i></i>
            </p>
            <p>福建可比信息科技有限公司 ©版权所有</p>
            <p>ICP许可证号 闽ICP备10203582号-8</p>
            <p>直播备案号 闽ILS备201708250005 </p> 
        </div>
    </div>
</template>
<script>
    export default {
        name: "web-aboutus",
        serverCacheKey() {
            return "web-aboutus";
        }
    }
</script>
<style>
    /* 
     *关于我们的样式区域
     */
    .about_box {
        width: 100%;
        margin-top: 30px;
    }

    .about_box .about_area {
        width: 288px;
        padding: 20px 0;
    }

    .about_box .about_area p {
        position: relative;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        color: #666;
    }

    .about_box .about_area p i {
        float: right;
        display: block;
        width: 72px;
        height: 26px;
        margin-right: 20px;
        background: url(~@/assets/web/index_icon.png) no-repeat -88px 0;
    }
</style>