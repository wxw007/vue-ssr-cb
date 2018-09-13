<template>
    <!-- 汇率区域 -->
    <div class="rate_box">
        <div class="blue_header clearfloat">
            <h3>今日汇率</h3>
        </div>
        <div class="rate_area">
            <div class="units-sum">
                <select v-model="curExchangeKey" @change="rateSelectChange">
                    <option v-for="exchange in exchangeList" :key="exchange.exchangeKey" :value="exchange.exchangeKey">{{exchange.exchangeName}}</option>
                </select>
                <span>{{curExchange.exchangeKey}}</span>
                <input type="number" v-model.number="curRate" @input="curRateInput">
            </div>
            <i class="conversion-icon"></i>
            <div class="conversion-num">
                <input type="text" value="美元" class="usd" readonly="true" />
                <span>USD</span>
                <input type="number" v-model.number="usdRate" @input="usdRateInput">
            </div>
            <div class="rate-tip">
                * 本汇率仅供参考， 可能与当地实际汇率不同
            </div>

        </div>
    </div>
</template>
<script>
    /** 
     * 汇率
     * 
     * @author wzw 
     * @since 2018-01-19
     */
    import { getExchangeRate } from '@/api/web/index.js'
    export default {
        name: "web-rate",
        data() {
            return {
                curExchangeKey: null,
                curRate: 1,
                usdRate: 1,
                exchangeList: [], // 汇率列表
                curExchange: {} // 当前汇率
            }
        },
        mounted() {
            getExchangeRate().then(response => {
                let result = response.data;
                if (result.success) {
                    let data = result.data;
                    this.exchangeList = data.exchangeList;
                    this.curExchange = data.curExchange;
                    this.curExchangeKey = this.curExchange.exchangeKey;
                    this.curRate = this.curExchange.exchangeUSD;
                }
            })
        },
        methods: {
            rateSelectChange() {
                for (let i = 0; i < this.exchangeList.length; i++) {
                    let exchange = this.exchangeList[i];
                    if (this.curExchangeKey == exchange.exchangeKey) {
                        this.curExchange = exchange;
                        this.curRate = this.curExchange.exchangeUSD;
                        this.usdRate = 1;
                        break;
                    }
                }
            },
            curRateInput() {
                if (this.curRate == '') {
                    return;
                }

                this.usdRate = this.curRate / this.curExchange.exchangeUSD;
                this.usdRate = this.usdRate.toFixed(3);
            },
            usdRateInput() {
                if (this.usdRate == '') {
                    return;
                }

                this.curRate = this.usdRate * this.curExchange.exchangeUSD;
            }
        }
    }
</script>
<style>
    /* 
     *今日汇率区域样式
     */

    .rate_box {
        width: 100%;
        margin-top: 30px;
    }

    .rate_box .rate_area {
        padding: 20px 0 0px;
    }

    .units-sum,
    .conversion-num {
        width: 100%;
        height: 36px;
    }

    .conversion-icon {
        display: block;
        width: 20px;
        height: 20px;
        background: url("~@/assets/web/conversion-icon.png") no-repeat center center;
        background-size: 16px 16px;
        margin-left: 23.55%;
    }

    .units-sum select,
    .conversion-num .usd {
        width: 154px;
        height: 36px;
        line-height: 36px;
        background: #F5F5F5;
        padding-left: 13px;
        float: left;
    }

    .rate_area option {
        display: inline-block;
        height: 36px;
        line-height: 36px;
        background: #F5F5F5;
    }

    .units-sum input,
    .conversion-num input {
        float: right;
        width: 80px;
        height: 36px;
        background: #F5F5F5;
        color: #454647;
        font-size: 16px;
        padding-left: 10px;
    }

    .units-sum span,
    .conversion-num span {
        float: right;
        display: inline-block;
        width: 40px;
        height: 36px;
        line-height: 36px;
        background: #F5F5F5;
        color: #454647;
        font-size: 16px;
        text-align: center;
    }

    .rate-tip {
        font-size: 12px;
        margin-top: 10px;
    }
</style>