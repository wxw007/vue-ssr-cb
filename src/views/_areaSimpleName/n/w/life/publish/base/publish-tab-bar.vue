<template>
    <div>
        <h1>免费发布信息</h1>
        <ul class="life-tab-nav-bar">
            <li v-for="(item,index) in tabList" class="tab-item" :class="{active:index==currentIndex}">{{index+1}}.{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-03-23 14:28
 */
export default {
    props: ['currentIndex'],
    data() {
        return {
            tabList: [
                { name: '选择类别' },
                { name: '填写信息' },
                { name: '发布完成' }
            ]
        }

    }
}
</script>
<style>
h1 {
    font-size: 16px;
    color: #0082c6;
}

* {
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Microsoft Yahei'
}

li {
    list-style: none;
}

.life-tab-nav-bar {
    margin-top: 20px;
    width: 100%;
    height: 36px;
    border-bottom: solid #0082c6 2px;
    overflow: hidden;
}

.life-tab-nav-bar .tab-item {
    float: left;
    width: 120px;
    height: 36px;
    line-height: 36px;
    color: #000;
    font-size: 16px;
    text-align: center;
    cursor: default
}

.life-tab-nav-bar .tab-item.active {
    background: #0082c6;
    color: #f5f5f5;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
</style>