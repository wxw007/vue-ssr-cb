<template>
    <div>
        <div class="float-title-height"></div>
        <div class="float-top">
            <div class="search cborder">
                <div class="search-inner clearfix">
                    <div class="search-logo fl">
                        <img src="~@/assets/m/images/2.png">
                    </div>
                    <!-- 写action属性是为了让让手机端出现搜索按钮 -->
                    <form action="/" @submit.prevent="submit()">
                        <div class="search-input fl">
                            <input type="search" maxlength="64" v-model="search" autofocus ref="searchInput" :placeholder="placeholder">
                        </div>
                    </form>
                    <v-touch class="cancel fl" @tap="goBack">取消</v-touch>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /** 
     * 搜索框
     * 
     * @author wzw
     * @since 2018-02-06 17:08
     */
    export default {
        name: "wei-search-box",
        props: {
            placeholder: {
                default: "请输入搜索关键字"
            }
        },
        serverCacheKey(props) {
            return "wei-search-box" + props.placeholder;
        },
        data() {
            return {
                search: ""
            };
        },
        mounted() {
            this.search = this.$route.query.keyword || "";
            this.$nextTick(() => {
                this.$refs.searchInput.focus();
            })
        },
        methods: {
            submit() {
                if (this.search == "") {
                    return;
                }
                let query = {};
                for (let key in this.$route.query) {
                    query[key] = this.$route.query[key];
                }
                query["keyword"] = this.search;
                this.$router.replace({ path: this.$route.path, query });
            },
            goBack() {
                this.$router.back();
                // window.history.back()
            }
        }
    }
</script>