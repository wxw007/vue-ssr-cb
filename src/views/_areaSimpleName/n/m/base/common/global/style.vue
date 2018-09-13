<template>
    <div></div>
</template>
<script>
    const setRootFontSize = () => {
        let fontSize = document.querySelector("html").style.fontSize;
        if(fontSize != null && fontSize.length > 0){
            return ;
        }
        var ww = document.body.clientWidth;
        var root;
        if (ww < 320) root = 40;
        else if (320 <= ww && ww <= 1024) root = ww * 133 / 1024;
        //当大屏的时候，根文字变为50
        else if (1024 < ww) root = 50;
        document.querySelector("html").style.fontSize = root + "px";
    };

    /** 
     * 
     * @author wzw
     * @since 2018-02-07 14:16
     */
    export default {
        mounted() {
            // setRootFontSize();
        }
    }
</script>
<style src="../../static/css/base.css"></style>
<style src="../../static/css/themes.css"></style>