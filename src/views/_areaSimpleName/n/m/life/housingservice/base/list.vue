<template>
    <div class="eat-list">
        <item  v-for="housingservice in list" :key="housingservice.id" :data="housingservice"></item>
    </div>
</template>
<script>
    /** 
     * 房产信息服务列表
     * @author wzw
     * @since 2018-02-06
     */
     import item from "./item.vue"
    export default {
        props: {
            list: {
                default() {
                    return [];
                }
            }
        },
        methods: {
            to(url) {
                window.location = url;
            }
        },
        components: {
            item
        }
    }
</script>