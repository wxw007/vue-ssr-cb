<template>
    <div class="eat-list">
        <item v-for="tongcityservice in list" :key="tongcityservice.id" :data="tongcityservice">
        </item>
    </div>
</template>
<script>
    /** 
     * 同城服务列表
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