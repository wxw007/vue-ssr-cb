<template>
    <indexTemplate>
        <lifeNavTab :topLifeModuleList="topLifeModuleList"></lifeNavTab>
        <slot></slot>
    </indexTemplate>

</template>
<script>
    /** 
     * 旅游各个首页的布局文件
     * 
     * @author jiemin
     * @author wzw
     * @since 2017-12-26
     */
    import { mapState } from 'vuex'
    import indexTemplate from './index-template.vue'
    import lifeNavTab from '../life-nav-tab.vue'
    import lifeIndexTemplateTravel from '@/store/modules/web/life/base/layouts/life-index-template-travel.js'

    export default {
        storeModule() {
            return { lifeIndexTemplateTravel };
        },
        computed: {
            ...mapState("lifeIndexTemplateTravel", ["topLifeModuleList"])
        },
        components: {
            indexTemplate,
            lifeNavTab
        }
    };
</script>