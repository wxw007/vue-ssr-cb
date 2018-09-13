<template>
    <baidu-map  v-if="browser" :center="center"></baidu-map>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-05-22 10:36
     */
    export default {
        data() {
            return {
                center: { lng: 119.2797159718, lat: 26.1025157024 },
                browser: false
            }
        },
        components: {
            BaiduMap: () => import('../base/map.vue')
        },
        mounted() {
            this.browser = true
        }
    }
</script>

