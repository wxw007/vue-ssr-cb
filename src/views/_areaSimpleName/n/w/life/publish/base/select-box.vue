<template>
    <div class="right-row">
        <div class="select-wrap">
            <select name="" class="select" v-model="val">
                <option v-for="item in selectList" :key="item.val" :value="item.val">{{item.name}}</option>
            </select>
        </div>
    </div>
</template>
<script>
export default {
    props: ['selectList'],
    data() {
        return {
            val: this.selectList[0].val
        }
    },
}
</script>
<style scoped>
select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
}

.right-row {
    display: inline-block;
    width: 144px;
    height: 48px;
    margin-right: 22px;
    margin-bottom: 10px;
}

.select-wrap {
    position: relative;
    height: 48px;
    width: 144px;
    border: 1px solid #ccc;
    color: #222;
    text-align: center;
    border-radius: 2px;
}

.select {
    font-size: 16px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 1em;
    padding-right: 30px;
}

.select-wrap::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -5px;
    display: inline-block;
    width: 0;
    border-top: 12px solid #222;
    border-left: transparent solid 6px;
    border-right: transparent solid 6px;
}

.select option {
    text-align: center;
    line-height: 48px;
    text-indent: 2em;
}
</style>