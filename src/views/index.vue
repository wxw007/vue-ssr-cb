<template>
    <div>
        主页 
    </div>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-05-18 15:44
     */
    import index from "@/store/modules/index.js"
    export default {
        storeModule() {
            return { index };
        },
        asyncData({ store, query }) {
            return store.dispatch("index/fetchData");
        }
    }
</script>