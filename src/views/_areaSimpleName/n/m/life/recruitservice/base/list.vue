<template>
    <div>
        <item v-for="recruitservice in list" :key="recruitservice.id" :data="recruitservice"></item>
    </div>
</template>
<script>
    /** 
     * 招聘列表
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
        components: {
            item
        }
    }
</script>