<template>
    <!-- 这个是快捷按钮，刷新，回到顶部 -->
    <div class="shortcut_btn">
        <span v-if="isReload" class="reload_btn" @click="clickRefresh()">
            <i></i>
        </span>
        <span class="top_btn" @click="scrollTop()" v-show="scrolled">
            <i></i>
        </span>
    </div>
</template>
<script>
    import browser from '@/util/browser'
    export default {
        name: "web-shortcut-btn",
        // serverCacheKey(props) {
        //     return "web-shortcut-btn";
        // },
        props: {
            isReload: true //用来控制刷新按钮是否显示
        },
        data() {
            return {
                scrolled: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        /* 
        组件销毁的时候
        */
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        methods: {
            clickRefresh() {
                this.$emit("refresh");
            },
            scrollTop() {
                window.scrollTo(0, 0);
            },
            handleScroll($event) {
                this.scrolled = document.documentElement.scrollTop > 0;
            }
        }
    }
</script>
<style>
    .shortcut_btn {
        position: fixed;
        z-index: 10;
        right: 50%;
        bottom: 6%;
        /* transition: all 0.5s ease-in-out; */
    }

    .shortcut_btn span {
        display: block;
        width: 60px;
        height: 60px;
        margin-bottom: 18px;
        cursor: pointer;
        overflow: hidden;
        background-color: #0082C6;
        border-radius: 10px;
    }

    .shortcut_btn span i {
        display: block;
        width: 100%;
        height: 100%;
        transition: all 0.5s ease-in-out;
    }

    .shortcut_btn .reload_btn i {
        background: url(~@/assets/web/reload_btn.png) no-repeat center center;
        background-size:100% 100%;
    }
    
    .shortcut_btn .reload_btn i:hover {
        transform: rotate(540deg);
    }
    
    .shortcut_btn .top_btn i {
        background: url(~@/assets/web/top_btn.png) center center repeat-y;
        background-size:100% 100%;
    }
    
    .shortcut_btn .top_btn i:hover {
        background: url(~@/assets/web/top_btn.png) center center repeat-y;
        background-size:100% 100%;
        background-position-y: -120px;
    }
</style>