<template>
    <div>
        <pageHeader></pageHeader>
        <userHeader></userHeader>
        <div id="index_content" class="content clearfloat">
            <!-- 左边的内容，框框需要继续存在 -->
            <div id="side_left" class="" style="width:12%;">
                <leftMenu></leftMenu>
            </div>
            <!-- 中间的内容区域 -->
            <div id="content_area" class="" style="margin-left:0;">
                <slot></slot>
            </div>
            <!-- 右边的内容区域 -->
            <div id="side_right">
                <downloadBox style="margin-top:0;"></downloadBox>
            </div>
            <shortcutBtn></shortcutBtn>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import pageHeader from "../../../base/header/header.vue";
    import userHeader from "../user-header.vue";
    import leftMenu from "../left-menu.vue";
    import shortcutBtn from "../../../base/common/shortcut_btn.vue";
    import downloadBox from "../../../base/right-aside/download_box.vue";

    import '@/util/plugins/swiper.js'
    import '@/util/plugins/lazyload.js'


    export default {
        components: {
            pageHeader,
            userHeader,
            leftMenu,
            shortcutBtn,
            downloadBox
        }
    };
</script>
<style>
    #side_left {
        float: left;
        width: 10.1667%;
        min-height: 1000px;
        padding-top: 20px;
    }

    .news_content {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: all 0.8s ease-in-out;
    }
</style>