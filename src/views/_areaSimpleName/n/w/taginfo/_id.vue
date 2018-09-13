<template>
    <indexTemplate>
        <div>
            <div class="tab-nav">
                <span>首页</span>/
                <span>标签：</span>
                <span>{{tagName}}</span>
            </div>
            <infiniteScroll @loadMore="loadMore">
                <newsList :infosMap="{'infoList':infoList}"></newsList>
            </infiniteScroll>
        </div>
    </indexTemplate>
</template>
<script>
    import indexTemplate from '../base/layouts/indexTemplate.vue'
    import tagInfoIndex from '@/store/modules/web/taginfo/index.js'
    import { mapState } from 'vuex'
    import newsList from "../base/index/news-list.vue"
    import infiniteScroll from '../base/common/infinite-scroll.vue'
    export default {
        storeModule() {
            return { tagInfoIndex };
        },
        asyncData({ store, query }) {
            return store.dispatch("tagInfoIndex/fetchData");
        },
        computed: {
            ...mapState("tagInfoIndex", ["infoList", "tagName"]),
        },
        components: {
            indexTemplate,
            newsList,
            infiniteScroll
        },
        methods: {
            loadMore(callback) {
                callback(this.$store.dispatch("tagInfoIndex/fetchMore"))
            }
        }
    }
</script>
<style scoped>
    .tab-nav {
        font-size: 14px;
        color: #666;
        font-family: "Microsoft YaHei"
    }
</style>