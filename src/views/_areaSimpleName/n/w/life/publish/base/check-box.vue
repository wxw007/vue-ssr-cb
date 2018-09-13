<template>
    <div class="input-checkbox">
        <div class="check-item">
            <span class="img" :class="{checked: isChecked}" @click="check()"></span>
            <span>{{text}}</span>
        </div>
    </div>
</template>
<script>
/** 
 * 
 * @author wxw
 * @since 2018-04-23 16:03
 */
export default {
    props: {
        checkedIndex: {
            type: Number,
            default: 0
        },
        index:{
        	type: Number,
        	default: 0
        },
        text: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            isChecked: false
        }
    },
    mounted(){
      this.fillData()
    },
    methods: {
    	check() {
            var data = {
                serverName: this.text,
                index: this.index
            }
    		this.$emit("checkIcon", data)
            this.isChecked = !this.isChecked;
    	},
        fillData(){
            var that = this;
            if(localStorage.formData && this.$route.query.fill){
                var formData = JSON.parse(localStorage.formData);
                if(formData.serversList){
                     var indexList = [];
                     for (let i = 0; i<formData.serversList.length; i++) {
                         indexList.push(formData.serversList[i].index)
                     }
                     if(indexList.indexOf(that.index)>=0){
                        that.isChecked = true
                     }

                 }
            } else {
                return
            }
        
        }
    }
}
</script>
<style scoped lang="less">
.input-checkbox {
    display: inline-block;
    width: 90px;
    height: 48px;
    font-size: 16px;
    .check-item{
    	margin:10px 20px;
    	width: 100%;
    	.img{
    		display: inline-block;
    		vertical-align: middle;
    		margin-right: 6px;
    		width: 16px;
    		height: 16px;
    		background: url('./img/no-checked.png') no-repeat;
    		background-size: cover;
    		cursor: pointer;
    		&.checked{
    			background: url('./img/checked.png') no-repeat;
    			background-size: cover;
    		}
    	}
    	span{
    		vertical-align: middle;
    	}
    }
    
}
</style>