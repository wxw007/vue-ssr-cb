<template>
    <div class="index-list">
        <div class="inner">
            <loadmore @loadBottom="loadMore" @loadTop="refresh">
                <list :list="list"></list>
            </loadmore>
        </div>
    </div>
</template>
<script>
    /** 
     * 专题页
     * 
     * @author wzw
     * @since 2018-02-06
     */
    import { mapState } from "vuex"
    import symposiumIndex from "@/store/modules/m/index/symposium.js"
    import list from "./base/symposium-list.vue"

    export default {
        storeModule() {
            return { symposiumIndex };
        },
        asyncData({ store, route, params, query }) {
            return store.dispatch("symposiumIndex/fetchData");
        },
        computed: {
            ...mapState("symposiumIndex", ["list"])
        },
        components: {
            list
        },
        methods: {
            refresh(callback) {
                callback("symposiumIndex/refreshMore", this.list);
            },
            loadMore(callback) {
                callback("symposiumIndex/fetchMore", this.list);
            }
        }
    }
</script>