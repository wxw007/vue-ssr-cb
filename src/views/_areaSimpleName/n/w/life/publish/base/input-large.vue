<template>
	<div class="publish-layout-row">
	    <div class="right-input-large">
	        <input type="text" :placeholder='placeholder' v-model='val'>
	    </div>
	</div>
</template>
<script>
    /** 
     * 
     * @author wxw
     * @since 2018-03-23 16:08
     */
    export default {
    	props:{
    		placeholder:{
    			type: String,
    			default: ""
    		},
    		resetVal:{
    			type: String,
    			default:''
    		}
    	},
    	data(){
    		return {
    			val:""
    		}
    	},
    	watch:{
			resetVal(newVal){
				this.val = newVal
			}
    	}
    }
</script>
<style scoped>
	.publish-layout-row {
	    width: 636px;
	    margin: 0 auto;
	    height: 48px;
	}

	.right-input-large {
		display: inline-block;
	    width: 530px;
	    height: 48px;
	}

	.right-input-large input {
	    display: inline-block;
	    width: 100%;
	    height: 48px;
	    line-height: 48px;
	    box-sizing: border-box;
	    text-indent: 1em;
	    border: 1px solid #ccc;
	    border-radius: 2px;
	    font-size: 16px;
	}
	input::-webkit-input-placeholder {
	    /*WebKit browsers*/
	    color: #ccc;
	    font-size: 16px;
	}
	input::-moz-input-placeholder {
	    /*Mozilla Firefox*/
	    color: #ccc;
	    font-size: 16px;
	}
	input::-ms-input-placeholder {
	    /*Internet Explorer*/
	    color: #ccc;
	    font-size: 16px;
	}
</style>