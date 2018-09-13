<template>
    <div>
        <pageHeader></pageHeader>
        <div id="index_content" class="content clearfloat">
            <!-- 左边的内容，框框需要继续存在 -->
            <div id="side_left" class="">
                <leftLogo></leftLogo>
                <subscription :infoTypeList="subscriptionList" :unSubscriptionList="unSubscriptionList"></subscription>
            </div>
            <!-- 中间的内容区域 -->
            <div id="content_area" class="">
                <div class="news_content" style="display:block">
                    <div class="search_box  clearfloat">
                        <form @submit.prevent="submit()">
                            <input type="text" placeholder="请输入感兴趣的内容" v-model="searchKeyword">
                            <span class="search_btn" @click="submit()">搜索</span>
                        </form>
                    </div>
                    <infiniteScroll @loadMore="loadMore" v-if="notEmptyList">
                        <newsList :infosMap="{'infoList':list}"></newsList>
                    </infiniteScroll>
                    <div v-else class="search-result-null">
                    </div>
                </div>
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
    import pageHeader from "../base/header/header.vue";
    import leftLogo from "../base/left-aside/left-logo.vue";
    import newsList from "../base/index/news-list.vue";

    import shortcutBtn from "../base/common/shortcut_btn.vue";
    import downloadBox from "../base/right-aside/download_box.vue";
    import aboutusBox from "../base/right-aside/aboutus_box.vue";
    import subscription from "../base/left-aside/subscription.vue"

    import '@/util/plugins/lazyload.js'
    import { getLast } from '@/util/common/array.js'

    import infoSearch from '@/store/modules/web/info/search.js'

    export default {
        storeModule() {
            return { infoSearch };
        },
        asyncData({ store, query }) {
            let params = {};
            if (query.keyword) {
                params.title = query.keyword;
            }
            return store.dispatch("infoSearch/fetchData", params);
        },
        data() {
            return {
                searchKeyword: ""
            };
        },
        computed: {
            ...mapState("infoSearch", ["list", "unSubscriptionList", "subscriptionList"]),
            notEmptyList() {
                return this.list != null && this.list.length > 0;
            }
        },
        components: {
            pageHeader,
            leftLogo,
            newsList,
            shortcutBtn,
            downloadBox,
            aboutusBox,
            subscription,
            infiniteScroll: () => import('../base/common/infinite-scroll.vue')
        },
        beforeMount() {
            this.searchKeyword = this.$route.query.keyword;
        },
        methods: {
            submit() {
                this.$router.push({ path: this.$route.path, query: { keyword: this.searchKeyword } });
            },
            loadMore() {
                this.$store.dispatch("infoSearch/fetchMore", { id: getLast(this.list).infoCentreId })
            }
        }
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
        height: 280px;
        margin-top: 133px;
        background: url("~@/assets/web/search-null.png") no-repeat center center;
    }
</style>