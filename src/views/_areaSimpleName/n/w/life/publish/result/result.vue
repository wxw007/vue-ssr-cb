<template>
    <indexTemplate>
        <publish-tab-bar :currentIndex='currentIndex'></publish-tab-bar>
        <!-- 发布成功 -->
        <div class="info" :class="{status:status==1}">
            <div class="result success-info"><img src="./success.png" height="30" width="31" alt=""><span>发布成功</span></div>
            <p class="text">该信息已发布成功，请在个人中心关注信息状态</p>
            <div class="btn-row">
                <div class="btn view" @click="gotoView">查看已发布信息</div>
                <router-link :to='lifeListUrl' class="btn back" tag="div">返回生活列表</router-link>
            </div>
        </div>
        <!-- 发布失败 -->
        <div class="info" :class="{status:status==0}">
            <div class="result fail-info"><img src="./fail.png" height="31" width="30" alt=""><span>发布失败</span></div>
            <p class="text">您填写的信息涉及敏感话题，请返回上级页面重新编辑</p>
            <div class="btn-row">
                <div class="btn fail-btn-back" @click="goback">返回</div>
            </div>
        </div>
    </indexTemplate>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-05-09 10:03
 */
import {getQueryString} from '@/util/common/getQueryString.js'
import indexTemplate from '../../base/layouts/index-template.vue'
import publishTabBar from '../base/publish-tab-bar.vue'
import { resolveUrl } from "@/util/common/url.js"

export default {
    components: {
        indexTemplate,
        publishTabBar,
    },
    data() {
        return {
            currentIndex: 2,
            status: null,
            lifeListUrl: resolveUrl(this.$store, '/n/w/life')
        }
    },
    
    mounted() {
        this.getParams()
    },
    methods: {
        getParams() {
            this.status = getQueryString('status')
        },
        gotoView(){
            this.$router.push(resolveUrl(this.$store, '/n/w/membercenter/order'))
        },
        //返回
        goback() {
            this.$router.push({
                path: this.$route.query.url,
                query:{
                    fill: true
                }
            })
        }
    }
}
</script>
<style scoped lang="less">
.info {
    font-size: 18px;
    text-align: center;
    padding-top: 78px;
    display: none;
}

.fail-info {
    color: #ed1a23;
}

.success-info {
    color: #0082c6;
}

.status.info {
    display: block;
}

.result img {
    vertical-align: middle;
    margin-right: 10px;
}

.result span {
    vertical-align: middle
}

.text {
    color: #222;
    font-size: 16px;
    margin-top: 8px;
}

.btn {
    display: inline-block;
    margin-top: 48px;
    width: 144px;
    height: 42px;
    line-height: 42px;
    border-radius: 2px;
    font-size: 18px;
    cursor: pointer;
}

.btn.view {
    background: #0082c6;
    color: #fff;
}

.btn.back {
    color: #0082c6;
    background: #f5f5f5;
    margin-left: 48px;
}

.fail-btn-back {
    width: 94px;
    background: #0082c6;
    color: #fff;
}
</style>