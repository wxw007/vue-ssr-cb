<template>
    <div>
        <pageHeader></pageHeader>
        <div id="index_content" class="content clearfloat">
            <!-- 左边的内容，框框需要继续存在 -->
            <div id="side_left" class="" style="width:12%;">
                <leftMenu></leftMenu>
            </div>
            <!-- 中间的内容区域 -->
            <slot></slot>
            <!-- 右边的内容区域 -->
            <!-- <div id="side_right">
                <downloadBox></downloadBox>
            </div> -->
            <shortcutBtn></shortcutBtn>
        </div>
    </div>
</template>
<script>
    import { mapState } from "vuex"
    import pageHeader from "../../../base/header/header.vue"
    import leftMenu from "../left-user-data-menu.vue"
    import shortcutBtn from "../../../base/common/shortcut_btn.vue"

    export default {
        components: {
            pageHeader,
            leftMenu,
            shortcutBtn
        }
    };
</script>
<style>
    #side_left {
        float: left;
        width: 10.1667%;
        min-height: 1000px;
        padding-top: 20px;
        /* box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.5); */
    }

    .news_content {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: all 0.8s ease-in-out;
    }

    .about-btn-box {
        width: 100%;
        padding: 17px 0;
    }

    .about-btn {
        display: block;
        width: 100%;
        height: 31px;
        line-height: 31px;
        color: #000;
        font-size: 16px;
        text-align: center;
        border-left: 3px solid transparent;
        border-right: 3px solid transparent;
    }

    .about-btn-box.active {
        background: #fafafa;
    }

    .about-btn-box.active .about-btn {
        border-left: 3px solid #0082c6;
    }
</style>