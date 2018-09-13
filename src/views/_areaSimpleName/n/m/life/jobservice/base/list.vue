<template>
    <div class="job-list">
        <item v-for="jobservice in list" :key="jobservice.id" :data="jobservice"></item>
    </div>
</template>
<script>
    /** 
     * 求职列表
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