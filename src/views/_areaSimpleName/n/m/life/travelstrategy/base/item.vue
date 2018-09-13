<template>
    <touch-link tag="div" class="style-all cborder clearfix" :href="data.url">
        <div class="style-all-pic fl">
            <img v-lazy="data.titleImgUrl" >
        </div>
        <div class="style-all-right fr">
            <div class="style-all-title two-row-text" v-html="data.title">
            </div>
            <div class="style-all-bottom">
                <div class="style-all-add one-row-text">
                    {{data.subContent}}
                </div>
            </div>
        </div>
    </touch-link>
</template>
<script>
    /** 
     * 
     * @author wzw
     * @since 2018-02-07 21:08
     */
    export default {
        props: ["data"]
    }
</script>