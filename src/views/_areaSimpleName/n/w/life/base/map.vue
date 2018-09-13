<template>
    <div class="map-wrap">
    <slot></slot>
    <baidu-map :center="center" :zoom="zoom" class="bm-view" >
       
        <bm-marker :position="center" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
            <!-- <bm-label content="地址名字" :labelStyle="{color: 'red', fontSize : '12px'}" :offset="{width: -35, height: 30}"/> -->
        </bm-marker>
    </baidu-map>
</div>
</template>
<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    ak: 'WA6p52tAH65SV7ZxgB31VR6NSLwtWx21'
})

export default {
    props: ['center'],
    data() {
        return {
            zoom: 16
        }
    }
}
</script>
<style scoped>
    .bm-view {
        width: 100%;
        height: 400px;
        padding: 20px 0 50px 0;
    }
  
</style>