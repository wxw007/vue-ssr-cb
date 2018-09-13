<template>
    <ul class="publish-type">
        <li v-for="item,index in publishTypeList" :key="index">
            <router-link tag='span' :to='item.gotoUrl||""'>{{item.moduleName}}</router-link>
        </li>
    </ul>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-03-23 14:20
 */
export default {
    props: ['publishTypeList'],
    mounted(){
        console.log(this.publishTypeList)
    }
}
</script>
<style scoped>
.publish-type {
    width: 100%;
    overflow: hidden;
    margin-top: 55px;
}

.publish-type li {
    width: 50%;
    float: left;
    text-indent: 130px;
    height: 50px;
    line-height: 50px;
    color: #222;
    font-size: 22px;
}

.publish-type li:first-child {
    color: #0082c6;
}

.publish-type>li>span {
    -webkit-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -ms-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear;
    cursor: pointer;
}

.publish-type>li>span:hover {
    color: #0082c6;
}
</style>

