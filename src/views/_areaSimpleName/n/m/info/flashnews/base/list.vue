<template>
    <div class="news-list" v-if="isShow">
        <div class="news-top clearfix">
            <div class="news-logo fl">
                <img src="~@/assets/m/images/1.png" alt="">
            </div>
            <div class="news-title fl">{{title}}</div>
        </div>
        <touch-link tag="div" class="news-box" v-for="info in list" :key="info.infoCentreId" :href="info.url">
            <div class="news-content">{{info.infoTitle}}</div>
            <div class="news-bottom cborder clearfix">
                <p class="news-income fl" v-if="info.quoteFrom">{{info.quoteFrom}}</p>
                <p class="news-date fr">{{info.infoStartTime | timezoneconvert}}</p>
            </div>
        </touch-link>
    </div>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-02-06 18:26
     */
    import timezoneconvert from '@/util/filter/timezoneconvert'
    export default {
        props: {
            title: "",
            list: {
                default() {
                    return [];
                }
            }
        },
        computed: {
            isShow() {
                return this.list != null && this.list.length > 0;
            }
        },
        filters: {
            timezoneconvert
        }
    }
</script>