<template>
    <div class="news-list">
        <item :data="travel" v-for="travel in list" :key="travel.id"></item>
    </div>
</template>
<script>
    /** 
     * 旅游套餐列表
     * @author wzw
     * @since 2018-02-06 16:40
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
        components: {
            item
        }
    }
</script>