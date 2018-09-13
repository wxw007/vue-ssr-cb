<template>
    <div class="life_classify">
        <a v-for="lifeTopModule in lifeModuleList" :key="lifeTopModule.lmId"
        :href="lifeTopModule.url">
            <div>
                <img :src="lifeTopModule.lmImg" />
            </div>
            <p>{{lifeTopModule.lmName}}</p>
        </a>
    </div>
</template>

<script>
    /** 
     * 生活模块列表
     * @author jiemin
     * @author wzw
     * @date 2017-12-20
     */
    export default {
        props: ["lifeModuleList"]
    }
</script>

<style>
    .life_classify {
        width: 100%;
        padding: 0 1.71%;
        margin-top: 26px;
        overflow: hidden;
    }

    .life_classify a {
        display: inline-block;
        width: 33.3%;
    }

    .life_classify a div {
        padding: 0 11.7%;
    }

    .life_classify a div img {
        width: 100%;
        height: auto;
    }

    .life_classify a p {
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 14px;
        color: #666;
        overflow: hidden;
    }
</style>