<template>
    <touch-link class="style-nopay cborder clearfix" :href="data.url">
        <div class="style-nopay-pic fl">
            <img v-lazy="data.titleImgUrl">
        </div>
        <div class="style-nopay-right fr">
            <div class="style-nopay-title two-row-text" v-html="data.title">
            </div>
            <div class="style-nopay-bottom one-row-text">
                {{data.subContent}}
            </div>
        </div>
    </touch-link>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-02-07 21:12
     */
    export default {
        props: ["data"]
    }
</script>