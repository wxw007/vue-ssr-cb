<template>
    <div class="all-strategy-list">
        <item :data="travelStrategy" v-for="travelStrategy in list" :key="travelStrategy.id"></item>
    </div>
</template>
<script>
    /** 
     * 旅游攻略列表
     * 
     * @author wzw
     * @since 2018-02-06 15:59
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