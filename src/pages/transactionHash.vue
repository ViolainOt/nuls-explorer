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
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transType")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{$t("transDetail.transTypeDetail.i"+txdetail.type)}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transHash")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{hash}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transHeight")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden"><router-link :to="{path:'/blockDetail',query:{height:txdetail.blockHeight}}">{{txdetail.blockHeight}}</router-link></div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transConfirmCount")}}</div>
                    <div class="nuls-flex-cell-flex">{{txdetail.confirmCount}}</div>
                </div>

                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transTime")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{txdetail.createTime | formatDate}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transInput")}}</div>
                    <div class="nuls-flex-cell-flex">{{txdetail.inputs|getArrayValue}} NULS</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transOutput")}}</div>
                    <div class="nuls-flex-cell-flex">{{txdetail.outputs|getArrayAmout}} NULS</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("transDetail.transFee")}}</div>
                    <div class="nuls-flex-cell-flex">{{txdetail.fee|getInfactCoin}} NULS</div>
                </div>
                <template v-if="txdetail.remark != null">

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
                <span class="float_right">（{{outlist.amount | getInfactCoin}}&nbsp;-&nbsp;<span @click="toSpentByHash(outlist.spendTxHash)" :class="outlist.spendTxHash!=null?'pointer baseColor':'enableColor'"><template v-if="outlist.address == 'Nse5FeeiYk1opxdc5RqYpEWkiUDGNuLs'">{{$t("utxoStatus.iburned")}}</template><template v-else-if="outlist.spendTxHash!=null">{{$t("utxoStatus.i3")}}</template><template v-else>{{$t("utxoStatus.i0")}}</template></span>）</span>
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
import {getTxList,getTxByHash,getTxSpentHashDetail} from "../assets/js/nuls.js";
import {formatDate,getInfactCoin,formatString} from '../assets/js/util.js';
import {brotherComponents} from '../assets/js/public.js';
export default {
    name: "transactionHash",
    data() {
        return {
            hash: '',
            showAllInputs: 0,
            showAllOutputs: 0,
            txdetail: {
                type: 0,
                txIndex: '',
                createTime: '',
                blockHeight: 0,
                confirmCount: 0,
                remark: '',
                fee: '',
                size: '',
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
        }
    },
    created: function () {
        var _self = this;
        _self.hash = this.$route.query.hash;
        _self.nulstxdetail();
    },
    methods: {
        getInfactCoin(count){
            return getInfactCoin(count);
        },

        toSpentByHash: function(hash){
            if(hash){
                var _self = this;
                _self.hash = hash;
                _self.nulstxdetail();
                /*
                *Modify history to prevent users from refreshing pages incorrectly
                *修改历史记录，防止用户刷新页面不正确
                */
                history.pushState(null,"","/transactionHash?hash="+hash);
            }
        },
        /**
         * 根据交易hash查询交易详情
         * Query transaction details based on transaction hash
         */
        nulstxdetail: function () {
            var _self = this;
            getTxByHash({"hash":_self.hash},function(res){
                if (res.success) {
                    _self.txdetail = res.data;
                    //_self.confirmCount = res.data.confirmCount;
                }else{
                    _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                }
            })
        },
        hashDetail: function(hash){
            this.hash = hash;
            this.nulstxdetail();
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
</style>
