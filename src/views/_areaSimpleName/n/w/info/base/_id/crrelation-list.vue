<template>

    <div class="crrelation-list-box" v-if="crrelationList != null">
        <div class="blue_header clearfloat">
            <h3>相关推荐</h3>
        </div>
        <div class="crrelation-list clearfloat">
            <div v-for="(info,index) in crrelationList" :key="info.infoCentreId" class="crrelation-list-item clearfloat">
                <div class="item_headline clearfloat">
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
     * 相关推荐
     * @author jiemin
     * @author wzw
     * @date 2017-12-20
     */
    export default {
        props: ["crrelationList"],
        data() {
            return {}
        },
        beforeMount() {
        }
    }
</script>
<style>
    .crrelation-list-box {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .crrelation-list{
        padding-top:12px;
    }
    .crrelation-list-item {
        display: inline-block;
        width: 50%;
        margin: 5px 0;
    }

    .crrelation-list-item img {
        width: 22.727%;
    }

    .crrelation-list-item .item_headline {
        position: relative;
        width: 100%;
    }

    .crrelation-list-item .item_headline b {
        line-height: 20px;
        display: inline-block;
        /* margin-top:3px; */
        margin-left: 7px;
        font-size: 22px;
        padding: 0 3px;
    }

    .crrelation-list-item .item_headline b:after {
        content: "";
        display: block;
        width: 100%;
        height: 3px;
        background: #4D4D4D;
    }

    .crrelation-list-item .item_headline b.red {
        color: #C50605;
    }

    .crrelation-list-item .item_headline b.red:after {
        background: #C50605;
    }

    .crrelation-list-item .item_headline h3 {
        float: left;
        width: 100%;
        font-weight: 500;
    }

    .crrelation-list-item .item_headline h3 a {
        position: relative;
        width: 97%;
        height: 19px;
        line-height: 19px;
        font-size: 16px;
        color: #17191A;
        padding-left: 16px;
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }

    .crrelation-list-item .item_headline h3 a:after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: 6px;
        margin: auto 0;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: #000;
    }

    .crrelation-list-item a {
        cursor: pointer;
    }

    .crrelation-list img {
        background: url("~@/assets/web/lazy-loading.png") no-repeat center center;
        background-size: 100% 100%;
        height: 116px;
    }

    .crrelation-list img[lazy=loaded] {
        background: transparent;
        height: auto;
    }
</style>