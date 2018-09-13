<template>
    <div>
        <blueHeadline :text="'热门攻略'"></blueHeadline>
        <div class="hot-strategy">
            <a v-for="travelStrategy in travelStrategyTopList" :key="travelStrategy.strategyId" :href="travelStrategy.url" target="_blank">
                <img :src="travelStrategy.titleImage" :title="travelStrategy.title">
                <p>{{travelStrategy.strategyTitle}}</p>
            </a>
        </div>
    </div>
</template>
<script>
    import blueHeadline from "../../../base/common/blue-headline.vue";

    export default {
        props: {
            travelStrategyTopList: {
                default() {
                    return [];
                }
            }
        },
        components: {
            blueHeadline
        }
    }
</script>
<style scoped>
    /* 热门攻略的样式 */

    .hot-strategy {
        margin-top: 20px;
        margin-bottom: 20px;
        width: 100%;
        text-align: left;
        /* display: flex;
        justify-content: space-between; */
    }

    .hot-strategy a {
        display: inline-block;
        /* width: 160px; */
        width: 22.6%;
        height: 165px;
        /* margin: 0 11.5px; */
        margin: 0 1.6%;
    }

    .hot-strategy a:last-child {
        margin-right: 0px;
    }

    .hot-strategy a:first-child {
        margin-left: 0;
    }


    .hot-strategy a img {
        width: 100%;
        height:auto;
        max-height:124px;
    }

    .hot-strategy a p {
        font-size: 18px;
        color: #17191A;
        line-height: 57px;
        height: 57px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
    }
</style>