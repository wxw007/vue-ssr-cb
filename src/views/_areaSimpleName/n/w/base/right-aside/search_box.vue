<template>
    <div class="search_box  clearfloat">
        <form @submit.prevent="submit()">
            <input type="text" :placeholder="placeholder" v-model="search">
            <span class="search_btn" @click="submit()">搜索</span>
        </form>
    </div>
</template>
<script>
    export default {
        name: "web-search-box1",
        props: {
            searchPageUrl: {}, //要跳转的搜索页
            placeholder: {
                default: "请输入搜索关键字"
            }
        },
        data() {
            return {
                search: ""
            };
        },
        methods: {
            submit() {
                if (this.search == "") {
                    return;
                }
                this.$router.push({ path: this.searchPageUrl, query: { keyword: this.search } });
            }
        }
    }

</script>
<style scoped>
    /* 
     *搜索按钮样式
     */

    .search_box {
        width: 100%;
        height: 33px;
    }

    .search_box input {
        float: left;
        width: 79.4%;
        height: 33px;
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
        width: 20.6%;
        height: 33px;
        line-height: 33px;
        background-color: #0082c6;
        font-size: 15px;
        color: #fff;
        text-align: center;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
    }
</style>