<template>
    <div>
        <pageHeader></pageHeader>
        <div id="index_content" class="content clearfloat">
          
            <leftSidenav :lifeModuleList="lifeModuleList"></leftSidenav>
            <!-- 中间的内容区域 -->
            <div id="content_area">
                <slot></slot>
            </div>
            <!-- 右边的内容区域 -->
            <div id="side_right">
                <downloadBox></downloadBox>
                <aboutusBox></aboutusBox>
            </div>
            <shortcutBtn></shortcutBtn>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import pageHeader from "../../../base/header/header.vue";
    import leftLogo from "../../../base/left-aside/left-logo.vue";
    import leftSidenav from "../left_sidenav.vue"
    import shortcutBtn from "../../../base/common/shortcut_btn.vue";
    import downloadBox from "../../../base/right-aside/download_box.vue";
    import aboutusBox from "../../../base/right-aside/aboutus_box.vue";

    import lifeSearchTemplate from '@/store/modules/web/life/base/layouts/lifeservice-search-template..js'

    import '@/util/plugins/lazyload.js'

    export default {
        storeModule() {
            return { lifeSearchTemplate };
        },
        computed: {
            ...mapState("lifeSearchTemplate", ["lifeModuleList"])
        },
        components: {
            pageHeader,
            leftLogo,
            leftSidenav,
            shortcutBtn,
            downloadBox,
            aboutusBox
        },
    };
</script>
<style>
    .news_content {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: all 0.8s ease-in-out;
    }

    /* 
      *搜索按钮样式
  */

    .search_box {
        width: 100%;
        height: 40px;
    }

    .search_box input {
        float: left;
        width: 88.636%;
        height: 40px;
        border: 1px solid #ebebeb;
        background-color: #f5f5f5;
        color: #999999;
        font-size: 14px;
        padding-left: 9px;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
    }

    .search_box span {
        cursor: pointer;
        float: left;
        width: 11.36%;
        height: 40px;
        line-height: 40px;
        background-color: #0082c6;
        font-size: 15px;
        color: #fff;
        text-align: center;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
    }

    .search-result-null {
        width: 100%;
        height: 269px;
        margin-top: 133px;
        background: url("~@/assets/web/search-null.png") no-repeat center center;
    }
</style>