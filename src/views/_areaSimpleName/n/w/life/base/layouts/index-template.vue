<template>
    <div>
        <pageHeader></pageHeader>
        <div id="index_content" class="content clearfloat">
            <leftSidenav :lifeModuleList="lifeModuleList"></leftSidenav>
            <div id="content_area">
                <slot></slot>
            </div>
            <div id="side_right">
                <searchBox :searchPageUrl="searchPageUrl" v-if="searchPageUrl"></searchBox>
                <adBox></adBox>
                <downloadBox></downloadBox>
                <aboutusBox></aboutusBox>
            </div>
            <shortcutBtn></shortcutBtn>
        </div>
    </div>
</template>
<script>
    /** 
     * 生活首页、生活服务、旅游各个首页的布局文件
     * 
     * @author jiemin
     * @author wzw
     * @since 2017-12-26
     */
    import { mapState } from 'vuex'

    import pageHeader from "../../../base/header/header.vue"
    import leftSidenav from "../left_sidenav.vue"

    import searchBox from "../../../base/right-aside/search_box.vue"
    import adBox from "../../../base/right-aside/ad_box.vue"
    import downloadBox from "../../../base/right-aside/download_box.vue"
    import aboutusBox from "../../../base/right-aside/aboutus_box.vue"
    import shortcutBtn from "../../../base/common/shortcut_btn.vue"
    import searchBar from '../index/searchBar.vue'

    import '@/util/plugins/lazyload.js'

    import lifeIndexTemplate from '@/store/modules/web/life/base/layouts/life-index-template.js'

    export default {
        storeModule() {
            return { lifeIndexTemplate };
        },
        computed: {
            ...mapState("lifeIndexTemplate", ["lifeModuleList", "searchPageUrl"])
        },
        components: {
            pageHeader,
            leftSidenav,
            shortcutBtn,
            searchBox,
            adBox,
            downloadBox,
            aboutusBox,
            searchBar
        }
    };
</script>