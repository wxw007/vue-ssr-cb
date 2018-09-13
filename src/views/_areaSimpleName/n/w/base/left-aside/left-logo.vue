<template>
    <a href="/">
        <img src="~@/assets/web/main-logo.png" >
        <div class="partner-img" v-if="curArea != null && curArea.webHeadLogo">
            <img :src="curArea.webHeadLogo">
        </div>
    </a>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        props: {},
        computed: {
            ...mapState("head", ["curArea"])
        },
        methods: {
        }
    };
</script>
<style src="../static/css/left_sidenav.css"></style>