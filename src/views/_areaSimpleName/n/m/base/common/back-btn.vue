<template>
    <v-touch class="back-btn" @tap="goBack()"></v-touch>
</template>
<script>
    import '@/util/plugins/touch.js'
    /** 
     * 
     * @author wzw
     * @since 2018-02-07 14:44
     */
    export default {
        name: "wei-back-btn",
        serverCacheKey() {
            return "wei-back-btn"
        },
        methods: {
            goBack() {
                window.history.back();
            }
        }
    }
</script>
<style scoped>
    .back-btn {
        background: url('~@/assets/m/images/back.png') no-repeat center center;
        background-size: 24% 37.8%;
        width: 0.8rem;
        height: 0.9rem;
        position: absolute;
    }
</style>