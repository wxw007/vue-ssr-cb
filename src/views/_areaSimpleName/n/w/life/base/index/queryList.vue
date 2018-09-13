<template>
    <div class="life_index">
        <searchBar></searchBar>
       <searchList :searchList="searchDataList"></searchList>
    </div>
</template>
<script>
    import searchBar from './searchBar.vue'
    import searchList from '../../base/index/searchList.vue'
   

    export default {
        props: {
            searchDataList: {
                default() {
                    return [];
                }
            }          
        },
        
        components: {
            searchBar,
            searchList,
           
        }

    }
</script>
<style>
</style>
<style scoped>
    .life_list {
        width: 100%;
        margin-top: 30px;
    }


    .life_classify_icon {
        width: 100%;
        padding: 0 1.278%;
        margin-top: 26px;
        overflow: hidden;
    }

    .life_classify_icon a {
        display: inline-block;
        width: 20%;
    }

    .life_classify_icon a div {
        padding: 0 23.913%;
    }

    .life_classify_icon a div img {
        width: 100%;
        height: auto;
    }

    .life_classify_icon a p {
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        margin-bottom: 18px;
        font-size: 14px;
        color: #666;
        overflow: hidden;
    }

    /*大使馆直通车*/

    .life_embassy {
        margin-top: 5px;
    }

    .life_embassy a {
        display: inline-block;
        width: 100%;
        cursor: pointer;
    }

    .life_embassy a+a {
        margin-top: 10px;
    }

    .life_embassy a img {
        width: 100%;
    }
</style>