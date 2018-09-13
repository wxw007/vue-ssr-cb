<template>
    <indexTemplate>
        <topLifeservice :selectList="selectList" :topLifeModuleList="topLifeModuleList"></topLifeservice>
        <slot></slot>
    </indexTemplate>

</template>
<script>
    /** 
     * 生活服务各个首页的布局文件
     * 
     * @author jiemin
     * @author wzw
     * @since 2017-12-26
     */
    import { mapState } from 'vuex'
    import indexTemplate from './index-template.vue'
    import topLifeservice from '../top-lifeservice.vue'
    import lifeIndexTemplateLifeservice from '@/store/modules/web/life/base/layouts/life-index-template-lifeservice.js'

    export default {
        storeModule() {
            return { lifeIndexTemplateLifeservice };
        },
        computed: {
            ...mapState("lifeIndexTemplateLifeservice", ["selectList", "topLifeModuleList"])
        },
        components: {
            indexTemplate,
            topLifeservice
        }
    };
</script>