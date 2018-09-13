<template>
    <div class="eat-list">
        <item  v-for="selfdefiningservice in list" :key="selfdefiningservice.id" :data="selfdefiningservice"> </item>
    </div>
</template>
<script>
    /** 
     * 美食天地列表
     * @author wzw
     * @since 2018-02-06 11:07
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