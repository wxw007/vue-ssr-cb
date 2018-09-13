<template>
    <touch-link class="style-all cborder clearfix"  :href="data.url">
        <div class="style-all-pic fl">
            <img v-lazy="data.titleImgUrl" >
        </div>
        <div class="style-all-right fr">
            <div class="style-all-title one-row-text" v-html="data.title">
            </div>
            <div class="style-all-bottom">
                <div class=" one-row-text">
                    {{data.subContent}}
                </div>
                <div class="style-all-add one-row-text">
                    {{data.cookingStyle}}&nbsp;
                </div>
                <div class="style-all-pay">
                    {{data.personalOnsumption}}
                </div>
            </div>
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