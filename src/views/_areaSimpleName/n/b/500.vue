<template>
    <div>
        500 | Internal Server Error
    </div>
</template>
<script>
    export default {
        name: 'page500', // 必填选项
        serverCacheKey() {
            return "500";
        }
    }
</script>