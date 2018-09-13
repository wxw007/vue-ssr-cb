<template>
    <touch-link  tag="div" class="job-box cborder" :href="data.url">
        <div class="job-title" v-html="data.title"></div>
        <div class="job-bottom clearfix">
            <div class="job-add fl">{{data.jobName}}</div>
            <div class="job-pay fr">{{data.wageDemand}}</div>
        </div>
    </touch-link>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-02-07 21:17
     */
    export default {
        props: ["data"]
    }
</script>