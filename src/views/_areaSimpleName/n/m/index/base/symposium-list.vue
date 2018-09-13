<template>
    <div>
        <touch-link tag="div" class="special_box" v-for="symposium in list" :key="symposium.symposiumId" :href="symposium.url">
            <div class="special_bottom">
                <span class="title">{{symposium.symposiumTitle}}</span>
                <span class="time">{{symposium.maxTime | timezoneconvert("MM-dd hh:mm")}}</span>
            </div>
            <img :src="symposium.imgUrl">
        </touch-link>
    </div>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-02-06 17:42
     */
    import timezoneconvert from '@/util/filter/timezoneconvert'
    export default {
        name: "wei-symposium-list",
        serverCacheKey(props) {
            if (props.list != null && props.list.length > 0) {
                return props.list[0].symposiumId + Math.floor(Date.now() / 10000);
            }
            return "wei-symposium-list";
        },
        props: {
            list: {
                default() {
                    return [];
                }
            }
        },
        filters: {
            timezoneconvert
        }
    }
</script>

<style>
    .special_box {
        /* width: 22.67rem; */
        padding: .25rem 0 0rem;
        margin: 0 auto;
        border-bottom: 1px solid #f5f5f5;
    }

    .special_box img {
        display: block;
        width: 100%;
        margin: .2rem 0;
    }

    .special_bottom {
        width: 100%;
    }

    .special_bottom:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }

    .special_bottom .title {
        float: left;
        width: 4.6rem;
        font-size: .32rem;
        line-height: .4rem;
        color: #000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .special_bottom .time {
        float: right;
        font-size: .24rem;
        color: #879399;
    }
</style>