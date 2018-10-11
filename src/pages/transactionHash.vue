<template>
    <div class="nuls-home-content">
        <!--nav start-->
        <div class="nuls-second-type">
            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/transactionRecord' }">{{$t("second.transaction")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$t("transDetail.transDetail")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>
            <div class="nuls-title text-align-center">
                {{$t("transDetail.transDetail")}}
            </div>
        </div>
        <!-- transaction detail start -->
        <div class="nuls-home-content-top nuls-home-content-accountinfo tx_background tx_border">
            <div class="nuls-message-list">
                <!--<div class="nuls-flex-cell flex">-->
                    <!--<div class="nuls-flex-cell-title">{{$t("transDetail.transType")}}</div>-->
                    <!--<div class="nuls-flex-cell-flex text-hidden">{{$t("transDetail.transTypeDetail.i"+txdetail.type)}}</div>-->
                <!--</div>-->
                <!--<div class="nuls-flex-cell flex">-->
                    <!--<div class="nuls-flex-cell-title">{{$t("transDetail.transHash")}}</div>-->
                    <!--<div class="nuls-flex-cell-flex text-hidden">{{hash}}</div>-->
                <!--</div>-->
                <!--<div class="nuls-flex-cell flex">-->
                    <!--<div class="nuls-flex-cell-title">{{$t("transDetail.transHeight")}}</div>-->
                    <!--<div class="nuls-flex-cell-flex text-hidden"><router-link :to="{path:'/blockDetail',query:{height:txdetail.blockHeight}}">{{txdetail.blockHeight}}</router-link></div>-->
                <!--</div>-->
                <!--<div class="nuls-flex-cell flex">-->
                    <!--<div class="nuls-flex-cell-title">{{$t("transDetail.transConfirmCount")}}</div>-->
                    <!--<div class="nuls-flex-cell-flex">{{txdetail.confirmCount}}</div>-->
                <!--</div>-->

                <!--<div class="nuls-flex-cell flex">-->
                    <!--<div class="nuls-flex-cell-title">{{$t("transDetail.transTime")}}</div>-->
                    <!--<div class="nuls-flex-cell-flex text-hidden">{{txdetail.createTime | formatDate}}</div>-->
                <!--</div>-->
                <!--<div class="nuls-flex-cell flex">-->
                    <!--<div class="nuls-flex-cell-title">{{$t("transDetail.transInput")}}</div>-->
                    <!--<div class="nuls-flex-cell-flex">{{txdetail.inputs|getArrayValue}} NULS</div>-->
                <!--</div>-->
                <!--<div class="nuls-flex-cell flex">-->
                    <!--<div class="nuls-flex-cell-title">{{$t("transDetail.transOutput")}}</div>-->
                    <!--<div class="nuls-flex-cell-flex">{{txdetail.outputs|getArrayAmout}} NULS</div>-->
                <!--</div>-->
                <!--<div class="nuls-flex-cell flex">-->
                    <!--<div class="nuls-flex-cell-title">{{$t("transDetail.transFee")}}</div>-->
                    <!--<div class="nuls-flex-cell-flex">{{txdetail.fee|getInfactCoin}} NULS</div>-->
                <!--</div>-->


                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transTime")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{txdetail.createTime | formatDate}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transFee")}}</div>
                    <!--<div class="nuls-flex-cell-flex" v-if="txdetail.type===101 || txdetail.type===102 || txdetail.type===100 || txdetail.type===1000">-->
                    <div class="nuls-flex-cell-flex" v-if="txdetail.resultDto && txdetail.resultDto.totalFee && txdetail.resultDto.txSizeFee && txdetail.resultDto.actualContractFee && txdetail.resultDto.refundFee">
                        <span>{{txdetail.resultDto.totalFee|getInfactCoin}}{{$t("transDetail.totalCost")}}</span>
                        <span>=</span>
                        <span>{{txdetail.resultDto.txSizeFee|getInfactCoin}}{{$t("transDetail.txSize")}}</span>
                        <span>+</span>
                        <span>{{txdetail.resultDto.actualContractFee|getInfactCoin}}{{$t("transDetail.callContract")}}</span>
                        <span>+</span>
                        <span>{{txdetail.resultDto.refundFee|getInfactCoin}}{{$t("transDetail.refund")}}</span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;{{$t("transDetail.unit")}}NULS</span>
                    </div>
                    <div class="nuls-flex-cell-flex" v-else>{{txdetail.fee|getInfactCoin}} NULS</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-  cell-title">{{$t("transDetail.transTxID")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{hash}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transType")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{$t("transDetail.transTypeDetail.i"+txdetail.type)}}</div>
                </div>

                <!--<template v-if="txdetail.type===101 || txdetail.type===102 || txdetail.type===100">-->
                    <div class="nuls-flex-cell flex" v-if="txdetail.contractAddress">
                        <div class="nuls-flex-cell-title">{{$t("transDetail.contractAddress")}}</div>
                        <div class="nuls-flex-cell-flex text-hidden"><router-link :to="{path:'/blockDetail',query:{height:txdetail.blockHeight}}">{{txdetail.contractAddress}}</router-link></div>
                    </div>
                    <div class="nuls-flex-cell flex" v-if="txdetail.type===101 || txdetail.type===102 || txdetail.type===100">
                        <div class="nuls-flex-cell-title">{{$t("transDetail.contractResults")}}</div>
                        <div class="nuls-flex-cell-flex text-hidden">{{(txdetail.resultDto && txdetail.resultDto.success==='true') ? $t("transDetail.results.i0") : $t("transDetail.results.i1")}}</div>
                    </div>
                <!--</template>-->

                <div class="nuls-flex-cell flex flex-start" v-if="txdetail.resultDto && ((txdetail.resultDto.tokenTransfers.length!==0) || (txdetail.resultDto.transfers.length!==0))">
                    <template v-if="txdetail.resultDto.tokenTransfers.length!==0">
                        <div class="nuls-flex-cell-title">{{$t("transDetail.transfer")}}</div>
                        <div class="nuls-flex-cell-flex-change text-hidden">
                            <div v-for="item in txdetail.resultDto.tokenTransfers">
                                <span>from <span @click="hashDetail(item.from)" class="baseColor pointer">{{(txdetail.resultDto ? item.from : '' )}}</span></span>
                                <span>to <span @click="hashDetail(item.to)" class="baseColor pointer">{{(txdetail.resultDto ? item.to : '' )}}</span></span>
                                <span>for <span class="greenColor">{{txdetail.resultDto ? item.value : ''}}</span> {{txdetail.resultDto.tokenName}}</span>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="txdetail.resultDto.transfers.length!==0">
                        <div class="nuls-flex-cell-title">{{$t("transDetail.transfer")}}</div>
                        <div class="nuls-flex-cell-flex-change text-hidden" v-if="txdetail.resultDto.transfers">
                            <div v-for="item in txdetail.resultDto.transfers">
                                <span>from <router-link :to="{path:'/contracts/contractsDetail',query:{contractAddress:item.fromAddress}}">{{(item.fromAddress ? item.fromAddress : '' )}}</router-link></span>
                                <span>to <span @click="hashDetail(item.toAddress)" class="baseColor pointer">{{(item.toAddress ? item.toAddress : '' )}}</span></span>
                                <span>for <span class="greenColor">{{item.txValue}}</span> NULS</span>
                                <div>TxID: <span @click="hashTranDetail(item.txHash)" class="baseColor pointer">{{txdetail.resultDto ? item.txHash : ''}}</span></div>
                            </div>
                        </div>
                    </template>
                    <template v-else></template>
                </div>

                <!--<template v-if="txdetail.type===101 || txdetail.type===102 || txdetail.type===100">-->
                <template v-if="txdetail.resultDto">
                    <div class="nuls-flex-cell flex">
                        <div class="nuls-flex-cell-title">{{$t("transDetail.gasLimit")}}</div>
                        <div class="nuls-flex-cell-flex text-hidden">{{txdetail.resultDto ? txdetail.resultDto.gasLimit:''}}</div>
                    </div>
                    <div class="nuls-flex-cell flex">
                        <div class="nuls-flex-cell-title">{{$t("transDetail.price")}}</div>
                        <div class="nuls-flex-cell-flex text-hidden">{{txdetail.resultDto ? txdetail.resultDto.price :''}}</div>
                    </div>
                    <div class="nuls-flex-cell flex">
                        <div class="nuls-flex-cell-title">{{$t("transDetail.gasUsed")}}</div>
                        <div class="nuls-flex-cell-flex text-hidden">{{txdetail.resultDto ? txdetail.resultDto.gasUsed : ''}}</div>
                    </div>
                </template>
                <!--<div class="nuls-flex-cell flex flex-start" v-if="txdetail.type===101 || txdetail.type===102">-->
                <div class="nuls-flex-cell flex flex-start" v-if="txdetail.txData && txdetail.resultDto && txdetail.txData.methodName && txdetail.txData.args">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.method")}}</div>
                    <div class="nuls-flex-cell-flex-change text-hidden ">
                        <div>{{$t("transDetail.methodName")}}{{txdetail.txData.methodName ? txdetail.txData.methodName : ''}}</div>
                        <div>{{$t("transDetail.parameter")}}{{txdetail.txData.args ? txdetail.txData.args : ''}}</div>
                        <div>{{$t("transDetail.backValue")}}{{txdetail.resultDto.result ? txdetail.resultDto.result : ''}}</div>
                    </div>
                </div>


                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transHeight")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden"><router-link :to="{path:'/blockDetail',query:{height:txdetail.blockHeight}}">{{txdetail.blockHeight}}</router-link></div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transConfirmations")}}</div>
                    <div class="nuls-flex-cell-flex">{{txdetail.confirmCount ? txdetail.confirmCount : 0}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transInput")}}</div>
                    <div class="nuls-flex-cell-flex">{{txdetail.inputs|getArrayValue}} NULS</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transOutput")}}</div>
                    <div class="nuls-flex-cell-flex">{{txdetail.outputs|getArrayAmout}} NULS</div>
                </div>

                <template v-if="txdetail.remark !== null">
                    <div class="nuls-flex-cell flex">
                        <div class="nuls-flex-cell-title">{{$t("transDetail.mark")}}{{$t("other.semicolon")}}</div>
                    </div>
                    <div class="nuls-flex-cell flex">
                        <div class="nuls-flex-cell-flex text-align-left">{{txdetail.remark}}</div>
                    </div>
                </template>
            </div>
        </div>
        <!-- transaction detail end -->

        <!-- transaction list start -->
        <div class="tx_list">
            <div class="float_left tx_background tx_input_content">
                <div class="tx_head">{{$t("second.enter")}}</div>
                <ul class="tx_description" :class="showAllInputs==1?'scrollHeight':'hideHeight_trans'">
                    <li v-if="!txdetail.inputs[0]">
                        <span class="float_left">{{$t("notice.not")}}</span>
                        <span class="float_right">&nbsp;</span>
                    </li>
                    <li v-for="inplist in txdetail.inputs">
                        <router-link :to="{path:'/accountInfo',query:{address:inplist.address}}">{{inplist.address|formatString}}</router-link>
                        <span class="float_right">（{{inplist.value | getInfactCoin}}&nbsp;-&nbsp;<span @click="hashDetail(inplist.fromHash)" class="baseColor pointer">{{$t("utxoStatus.i3")}}</span>）</span>
                </li>
            </ul>
            <div v-if="txdetail.inputs[5]" class="tx_description center">
                <i @click="showMore(-1)" class="nuls-img-icon nuls-img-three-point pointer"></i>
        </div>
    </div>
    <div class="float_right tx_background tx_output_content">
        <div class="tx_head">{{$t("second.outPut")}}</div>
        <ul class="tx_description" :class="showAllOutputs==1?'scrollHeight':'hideHeight_trans'">
            <li v-if="!txdetail.outputs[0]">
                <span class="float_left">{{$t("notice.not")}}</span>
                <span class="float_right">&nbsp;</span>
            </li>

            <li v-for="outlist in txdetail.outputs">
                <router-link :to="{path:'/accountInfo',query:{address:outlist.address}}">{{outlist.address|formatString}}</router-link>
                <span class="float_right">（{{outlist.amount | getInfactCoin}}&nbsp;-&nbsp;<span @click="hashDetail(outlist.spendTxHash)" :class="outlist.spendTxHash!=null?'pointer baseColor':'enableColor'">
                    <template v-if="outlist.address == 'Nse5FeeiYk1opxdc5RqYpEWkiUDGNuLs'">{{$t("utxoStatus.iburned")}}</template>
                    <template v-else-if="outlist.spendTxHash!=null">{{$t("utxoStatus.i3")}}</template>
                    <template v-else>{{$t("utxoStatus.i0")}}</template></span>）
                </span>
        </li>
    </ul>
    <div v-if="txdetail.outputs[5]" class="tx_description center">
        <i @click="showMore(-2)" class="nuls-img-icon nuls-img-three-point pointer"></i>
</div>
    </div>
<div class="clear"></div>
    </div>
    <!-- transaction list end -->
    </div>
    </template>

<script>
import {getTxList,getTxByHash,getTxSpentHashDetail,getContractsTxByHash,getSearchDataDetail} from "../assets/js/nuls.js";
import {formatDate,getInfactCoin,formatString,timesDecimals,LeftShiftEight} from '../assets/js/util.js';
export default {
    name: "transactionHash",
    data() {
        return {
            hash: '',
            // 交易的类型
            type: '',
            showAllInputs: 0,
            showAllOutputs: 0,
            // txdetail:[],
            txdetail: {
                type: 0,
                txIndex: '',
                createTime: '',
                blockHeight: 0,
                confirmCount: 0,
                remark: '',
                fee: '',
                size: '',
                // resultDto:{
                //     gasLimit:'',
                //     price:'',
                //     gasUsed:'',
                //     transfers:''
                // },
                // txData:{
                //     args:'',
                //     methodName:'',
                // },
                outputs: [{
                    txHash: '',
                    txIndex: '',
                    address: '',
                    lockTime:'',
                    amount:'',
                    spendTxHash: ''
                }],
                inputs: [{
                    address: '',
                    fromHash: '',
                    fromIndex: '',
                    value: ''
                }]
            }
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date);
        },
        formatString(str){
            return formatString(str);
        },
        getInfactCoin(count) {
            return getInfactCoin(count);
        },
        getArrayValue(arraydata){
            var amount = 0,len=arraydata.length;
            for(var i = 0;i < len;i++){
                amount += arraydata[i].value;
            }
            return getInfactCoin(amount);
        },
        getArrayAmout(arraydata){
            var amount = 0,len=arraydata.length;
            for(var i = 0;i < len;i++){
                amount += arraydata[i].amount;
            }
            return getInfactCoin(amount);
        },
    },
    created: function () {
        var _self = this;
        _self.hash = this.$route.query.hash;
        _self.type = this.$route.query.type;
        _self.nulstxdetail();
    },
    mounted:function(){

    },
    methods: {
        getInfactCoin(count){
            return getInfactCoin(count);
        },
        /**
         * 根据交易hash查询交易详情
         * Query transaction details based on transaction hash
         */
        nulstxdetail: function () {
            var _self = this;
            //合約的hash,type為6   普通hash查詳情，沒有type    合約转账属于普通交易
            if(_self.type===100 || _self.type===101 || _self.type===102 || _self.type===1000 || _self.type===6){
                getContractsTxByHash({"hash":_self.hash},function(res){
                    if (res.success) {
                        _self.txdetail = res.data;
                        if(res.data.txData){
                            if(res.data.txData.args && res.data.txData.args.lastIndexOf(',')!==-1){
                                res.data.txData.args=res.data.txData.args.substr(0,res.data.txData.args.length-1);
                            }
                        }
                        if(res.data.resultDto){
                            //let powerNo = Power(res.data.resultDto.decimals);
                            if(res.data.resultDto.tokenTransfers && res.data.resultDto.tokenTransfers.length!==0){
                                _self.txdetail.resultDto.tokenTransfers=res.data.resultDto.tokenTransfers;
                                let tokenTransfers = res.data.resultDto.tokenTransfers;
                                for (let i in tokenTransfers) {
                                    tokenTransfers[i].value = timesDecimals( tokenTransfers[i].value,res.data.resultDto.decimals).toString();
                                }
                            }else{
                                _self.txdetail.resultDto.tokenTransfers=[];
                            }
                            if(res.data.resultDto.transfers && res.data.resultDto.transfers.length!==0){
                                _self.txdetail.resultDto.transfers=res.data.resultDto.transfers;
                                let transfers = res.data.resultDto.transfers;
                                for (let i in transfers) {
                                    transfers[i].txValue = LeftShiftEight(transfers[i].txValue).toString();
                                }
                            }else{
                                _self.txdetail.resultDto.transfers=[];
                            }
                        }
                    }else{
                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                    }
                })
            }else{
                getTxByHash({"hash":_self.hash},function(res){
                    if (res.success) {
                        _self.txdetail = res.data;
                    }else{
                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                    }
                })
            }
        },
        /**
         * 点击transfers里的hash,查看交易详情
         * Click on hash in transfers to see transaction details.
         */
        hashTranDetail: function(hash){
            this.hash = hash;
            this.type = '';
            this.nulstxdetail();
        },
        /**
         * input output的交易详情
         * Input output transaction details
         */
        //input output的交易详情
        hashDetail: function(hash){
            if(hash){
                let _self = this;
                let loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                getSearchDataDetail({key:hash},function (res) {
                    if(res.success){
                        loading.close();
                        //console.log(res.data)
                        if(res.data === 0){
                            _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                        }else{
                            _self.$router.push({path:'/loadSearch',query:{queryType:res.data,queryValue:hash}});
                        }

                    }else{
                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                    }
                    loading.close();
                });
                history.pushState(null,"","/transactionHash?hash="+hash);
            }
        },
        showMore: function(v){
            if(v === -1){
                this.showAllInputs = this.showAllInputs=== 0 ? 1: 0;
            }else{
                this.showAllOutputs = this.showAllOutputs=== 0 ? 1: 0;
            }
        }
    },
}
</script>

<style>
    .flex-start{
        align-items: flex-start;
        justify-content:space-between;
    }
    .nuls-home-content .nuls-home-content-top .nuls-flex-cell.flex-start .nuls-flex-cell-flex{
        padding-top:5px;
        padding-bottom:5px;
        flex:auto;
    }
    .nuls-home-content .nuls-home-content-top .nuls-flex-cell.flex-start .nuls-flex-cell-flex>div:nth-child(2){
        padding-top:5px;
        padding-bottom:5px;
    }
    .nuls-home-content .nuls-home-content-top .nuls-flex-cell.flex-start .nuls-flex-cell-flex-change>div{
        text-align: left;
        white-space: initial;
        word-break: break-all;
    }
</style>
