<template>
    <searchTemplate>
        <div class="news_content" style="display:block">
            <div class="search_box  clearfloat">
                <form @submit.prevent="submit()">
                    <input type="text" placeholder="请输入感兴趣的内容" v-model="searchKeyword">
                    <span class="search_btn" @click="submit()">搜索</span>
                </form>
            </div>
            <infiniteScroll @loadMore="loadMore" v-if="haveResult">
                <list :jobServiceList="jobServiceList"></list>
            </infiniteScroll>
            <div v-else class="search-result-null"> </div>
        </div>
    </searchTemplate>
</template>
<script>
    import { mapState } from 'vuex'
    import searchTemplate from '../base/layouts/search-template.vue'
    import list from './base/list.vue'

    import jobServiceSearch from '@/store/modules/web/life/jobservice/search.js'

    export default {
        storeModule() {
            return { jobServiceSearch };
        },
        asyncData({ store, route, query }) {
            return store.dispatch("jobServiceSearch/fetchJobService");
        },
        data() {
            return {
                searchKeyword: ""
            }
        },
        computed: {
            ...mapState("jobServiceSearch", ["jobServiceList"]),
            haveResult() {
                return this.jobServiceList != null && this.jobServiceList.length > 0;
            }
        },
        components: {
            searchTemplate,
            list,
            infiniteScroll: () => import('../../base/common/infinite-scroll.vue')
        },
        beforeMount() {
            this.searchKeyword = this.$route.query.keyword;
        },
        methods: {
            submit() {
                this.$router.push({ path: this.$route.path, query: { keyword: this.searchKeyword } });
            },
            loadMore(callback) {
                callback(this.$store.dispatch("housingServiceSearch/fetchMore"))
            }
        }
    };
</script>