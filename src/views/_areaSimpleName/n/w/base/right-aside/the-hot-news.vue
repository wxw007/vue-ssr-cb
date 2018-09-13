<template>

    <div class="hot-news-list-box" v-if="hottestInfoList != null">
        <div class="blue_header clearfloat">
            <h3>热门排行</h3>
        </div>
        <div class="hot-news-list clearfloat">
            <div v-for="(info,index) in hottestInfoList"  :key="info.infoCentreId" class="hot-list-item clearfloat">
                <div class="item_headline clearfloat">
                    <b :class="{'red':index <= 2}">{{index+1}}</b>
                    <h3>
                        <a :href="info.url" target="_blank">{{info.infoTitle}}</a>
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /** 
     * 热门排行 
     * @author jiemin
     * @date 2018-03-21
     */
    export default {
        props: ["hottestInfoList"]
    }
</script>
<style>
    .hot-news-list-box {
        width: 100%;
        margin-top: 20px;
    }

    .hot-list-item {
        width: 100%;
        margin: 10px 0;
    }

    .hot-list-item img {
        width: 22.727%;
    }

    .hot-list-item .item_headline {
        position: relative;
        width: 100%;
    }
    .hot-list-item .item_headline b{
        line-height:20px;
        display:inline-block;
        /* margin-top:3px; */
        margin-left: 7px;
        font-size:22px;
        padding:0 3px;
    }
    .hot-list-item .item_headline b:after{
        content:"";
        display:block;
        width:100%;
        height:3px;
        background:#4D4D4D;
    }
    .hot-list-item .item_headline b.red{
        color:#C50605;
    }
    .hot-list-item .item_headline b.red:after{
        background:#C50605;
    }

    .hot-list-item .item_headline h3 {
        /* margin-top: 3px; */
        float:right;
        width: 84%;
        font-weight:500;
    }

    .hot-list-item .item_headline h3 a {
        width: 100%;
        max-height: 38px;
        line-height: 19px;
        font-size: 16px;
        color: #17191A;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .hot-list-item a {
        cursor: pointer;
    }

    .hot-news-list img {
        background: url("~@/assets/web/lazy-loading.png") no-repeat center center;
        background-size: 100% 100%;
        height: 116px;
    }

    .hot-news-list img[lazy=loaded] {
        background: transparent;
        height: auto;
    }
</style>