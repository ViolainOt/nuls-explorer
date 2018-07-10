<template>
    <div class="nuls-home-content">
        <!--nav start-->
        <div class="nuls-second-type">
            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/blockList' }">{{$t("blockList.blockList")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$t("blockDetail.blockDetail")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>
            <div class="nuls-title text-align-center">
                {{height}}
            </div>
            <!--Previous Block & Next Block start-->
            <div class="nuls-block-operation-box clearfix">
                <span class="float_left nuls-buttom" :class="{'pointer':prevBlockUsed}" @click="prevBlock">{{$t("blockDetail.previousBlock")}}</span>
            <span class="float_right nuls-buttom" :class="{'pointer':nextBlockUsed}" @click="nextBlock">{{$t("blockDetail.nextBlock")}}</span>
    </div>
    <!--Previous Block & Next Block end-->
</div>
    <!--nav end-->


    <!--block detail start-->
<div class="nuls-home-content-top nuls-home-content-accountinfo tx_background tx_border">
<div class="nuls-message-list">
    <div class="nuls-flex-cell flex">
        <div class="nuls-flex-cell-title">{{$t("blockDetail.blockHash")}}</div>
        <div class="nuls-flex-cell-flex text-hidden">{{blockheader.hash}}</div>
    </div>
    <div class="nuls-flex-cell flex">
        <div class="nuls-flex-cell-title">{{$t("blockDetail.confirmCount")}}</div>
        <div class="nuls-flex-cell-flex">{{confirmCount}}</div>
    </div>
    <div class="nuls-flex-cell flex">
        <div class="nuls-flex-cell-title">{{$t("blockDetail.transactionCount")}}</div>
        <div class="nuls-flex-cell-flex">{{blockheader.txCount}}</div>
    </div>
    <div class="nuls-flex-cell flex">
        <div class="nuls-flex-cell-title">{{$t("blockDetail.transactionFee")}}</div>
        <div class="nuls-flex-cell-flex">{{blockheader.totalFee|getInfactCoin}} NULS</div>
    </div>

    <div class="nuls-flex-cell flex">
        <div class="nuls-flex-cell-title">{{$t("blockDetail.blockNodeName")}}</div>
        <div class="nuls-flex-cell-flex text-hidden"><router-link :to="{path:'/consensusNode',query:{address:blockheader.consensusAddress,type:2}}">{{blockheader.consensusAddress}}</router-link></div>
    </div>
    <div class="nuls-flex-cell flex">
        <div class="nuls-flex-cell-title">{{$t("blockList.blockReward")}}</div>
        <div class="nuls-flex-cell-flex">{{blockheader.reward | getInfactCoin}} NULS</div>
    </div>
    <div class="nuls-flex-cell flex">
        <div class="nuls-flex-cell-title">{{$t("blockList.time")}}</div>
        <div class="nuls-flex-cell-flex">{{blockheader.createTime | formatDate}}</div>
    </div>
    <div class="nuls-flex-cell flex">
        <div class="nuls-flex-cell-title">{{$t("blockList.size")}}</div>
        <div class="nuls-flex-cell-flex">{{blockheader.size}} bytes</div>
    </div>
</div>
</div>
    <!--block detail end-->


    <!--transaction list start-->
<div class="nuls-home-content-next clear" v-show="showTransHeader">
<div class="segmentation" v-show="showTransHeader">
    <i class="nuls-img-icon nuls-img-transaction"></i><span>{{blockheader.txCount}}&nbsp;{{$t("second.transactions")}}</span>
</div>
<ul class="nuls-transaction-list">
<li v-for="(txlist,key) in transList" :class="'transactions_i'+txlist.type">
<div class="block_split">{{$t("transDetail.transTypeDetail.i"+txlist.type)}}</div>
<div class="flex block_split">
    <div class="hash flex-auto text-hidden">
        <span class="baseColor pointer" @click="toTransactionHash(txlist.hash)">{{txlist.hash}}</span>
</div>
<div class="time text-align-right">{{txlist.createTime | formatDate}}</div>
</div>
<div class="tx_auto_flex block_split">
<div class="block"><span>{{$t("second.block")}}{{$t("other.semicolon")}}{{txlist.blockHeight}}</span></div>
<div class="input_output">{{$t("second.enter")}}/{{$t("second.outPut")}}{{$t("other.semicolon")}}&nbsp;{{txlist.inputs|arrayLength}}/{{txlist.outputList|arrayLength}}</span></div>
<div class="fee text-align-right"><span>
    <template v-if="txlist.type <= 2">
    {{$t("second.amount")}}{{$t("other.semicolon")}}{{txlist | formatTxAmount}} NULS
    </template>
</span></div>
    </div>
<div class="clear"></div>
<div class="flex flex-top block_split" v-if="txlist.inputs[0] || txlist.outputList[0]" :class="showScroll==key?'scrollHeight':'hideHeight'">
<div class="input_div text-hidden">
    <p v-if="!txlist.inputs[0]">&nbsp;</p>
    <p v-for="inputlist in txlist.inputs" class="baseColor pointer text-hidden" @click="toAccountInfo(inputlist.address)">{{inputlist.address}}</p>
</div>
<div class="tx_logo"><i class="nuls-img-icon nuls-img-right-action"></i></div>
<div class="output_div text-align-right text-hidden">
<p v-for="outputlist in txlist.outputList" class="text-hidden baseColor pointer" @click="toAccountInfo(outputlist.address)">{{outputlist.address}}</p>
    </div>
<div class="tx_amount text-align-right">
<p class="text-hidden" v-for="outputlist in txlist.outputList">{{outputlist.value|getInfactCoin}} NULS</p>
</div>
    </div>
<p><span>{{$t("second.fee")}}{{$t("other.semicolon")}}{{txlist.fee|getInfactCoin}} NULS</span></p>
<div v-if="txlist.inputs[4] || txlist.outputList[4]" class="tx_more text-align-center pointer"><a @click="showmore(key)"><i class="nuls-img-icon nuls-img-three-point pointer"></i></a></div>
    </li>
    </ul>
<div class="clear"></div>
    </div>
    <!--transaction list end-->

    <!--pagination start-->
<div class="text-align-right" v-show="showTransHeader">
<el-pagination
    background
    :prev-text="$t('page.previous')"
    :next-text="$t('page.next')"
    layout="total,prev, pager, next,jumper"
@current-change="nulstxlist"
:page-size=this.pageSize
:current-page=this.currentPage
:total=this.totalDataNumber>
</el-pagination>
    <!--pagination end-->
    </div>
    </div>
    </template>

<script>
import {getTxList,getBlockHeaderDetailByHeight,getBlockHeaderDetailByHash,getBlockBesthashDetail} from "../assets/js/nuls.js";
import {formatDate,getInfactCoin,getTransactionResultAmount} from '../assets/js/util.js';
export default {
    name: "blockDetail",
    data() {
        return {
            prevBlockUsed: true,
            nextBlockUsed: true,
            showTransHeader: true,
            currentPage: 1,
            showScroll: -1,
            confirmCount: 0,
            blockheader: {
                hash: '',
                totalFee: 0,
                consensusAddress: '',
                size: 0,
                createTime: '',
                reward: 0,
                txCount: 0
            },
            hash: '',
            height: 0,
            totalDataNumber: 0,
            pageSize: 20,
            transList: [{
                showClass: 1,
                hash: ' ',
                type: '1',
                txIndex: '',
                createTime: '',
                blockHeight: 0,
                fee: 0,
                inputs: [{txHash: '', address: '', value: 0}],
                outputList: [{txHash: '', address: '', value: 0}],
                status: 0,
                size: 110
            }],
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date);
        },
        arrayLength(arr) {
            return arr ? arr.length : 0;
        },
        /*
        *计算这笔交易的输入减去输出后的余额
        *Calculate the input of this transaction minus the balance after output
        */
        formatTxAmount(txlist){
            return getInfactCoin(getTransactionResultAmount(txlist));
        },
        getInfactCoin(count) {
            return getInfactCoin(count);
        }
    },
    created: function () {
        var _self = this;
        _self.height = _self.$route.query.height;
        _self.hash = _self.$route.query.hash;
        _self.nulstxlist();
        _self.nulsBlockDetail();
    },
    /*
    * 监听route，处理地址栏参数变化
    * Listen for route, handle address bar parameter changes
    */
    watch: {
        '$route'(to, from) {
            var _self = this;
            _self.currentPage = isNaN(to.query.currentPage)?1:parseInt(to.query.currentPage,10);
            if(to.query.height){
                _self.height = parseInt(to.query.height,10);
            }else if(to.query.hash){
                _self.hash = to.query.hash;
            }
            _self.nulsBlockDetail();
            _self.nulstxlist(_self.currentPage);
        }
    },
    methods: {
        formatTxClass: function (status) {
            return formatTxClass(status);
        },
        /*
        *跳转账户详情
        * to account detail
        */
        toAccountInfo: function(address){
            this.$router.push({path:'/accountInfo',query:{address:address}});
        },
        /*
        *跳转交易详情
        * to transaction detail
        */
        toTransactionHash: function(hash){
            this.$router.push({path:'/transactionHash',query:{hash:hash}});
        },
        /*
        *show more
        *显示更多
        */
        showmore: function(v){
            this.showScroll =this.showScroll===v?-1:v;
        },
        /*
        *load prevBlock, If the previous block is less than 0, clicks are prohibited
        *加载上一个区块，如果上一个区块小于0，就禁止点击
        */
        prevBlock: function(){
            var newHeight = parseInt(this.height)-1;
            if(newHeight < 0){
                this.prevBlockUsed = false;
            }else{
                this.prevBlockUsed = true;
                this.height = newHeight;
                /*
                *Modify history to prevent users from refreshing pages incorrectly
                *修改历史记录，防止用户刷新页面不正确
                */
                history.pushState(null,"","/blockDetail?height="+newHeight);
                this.nulstxlist();
                this.nulsBlockDetail();
            }
        },
        /*
        *load nextBlock, If the next block does not exist, click is prohibited
        *加载下一个区块，如果下一个区块不存在，就禁止点击
        */
        nextBlock: function(){
            var _this = this;
            getBlockBesthashDetail(function(res){
                if(res.success){
                    var newHeight = parseInt(_this.height)+1,bestHeight = res.data.height;
                    if(newHeight<=bestHeight){
                        _this.height = newHeight;
                        /*
                        *Modify history to prevent users from refreshing pages incorrectly
                        *修改历史记录，防止用户刷新页面不正确
                        */
                        history.pushState(null,"","/blockDetail?height="+newHeight);
                        _this.nulstxlist();
                        _this.nulsBlockDetail();
                        _this.nextBlockUsed = true;
                    }else{
                        _this.nextBlockUsed = false;
                    }
                }
            })
        },

        /*
        *Load block details, if the height exists, according to the height load, if the hash exists according to the hash load, and recalculate whether it is possible to click on the next block and the previous block
        *加载区块详情，如果高度存在就根据高度加载，如果hash存在就根据hash加载，并重新计算是否可以点击下一个区块和上一个区块
        */
        nulsBlockDetail: function(){
            var _self = this;
            if(_self.height!=undefined && _self.height>=0){
                getBlockHeaderDetailByHeight({"height":_self.height},function(res){
                    if (res.success) {
                        _self.blockheader = res.data;
                        _self.hash = _self.blockheader.hash;
                        _self.confirmCount = res.data.confirmCount;
                        _self.prevBlockUsed = parseInt(_self.height)-1 < 0? false: true;
                    }/*else{
                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                    }*/
                });
                return false;
            }else{
                getBlockHeaderDetailByHash({"hash":_self.hash},function(res){
                    if (res.success) {
                        _self.blockheader = res.data.blockHeader;
                        _self.height = _self.blockheader.height;
                        _self.confirmCount = res.data.confirmCount;
                        _self.prevBlockUsed = parseInt(_self.height)-1 < 0? false: true;
                    }/*else{
                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                    }*/
                });
                return false;
            }
        },
        /*
        *Load the transaction list under this block
        *加载该区块下的交易列表
        */
        nulstxlist: function (pageNumber) {
            var _self = this;
            var loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            _self.currentPage = pageNumber;
            getTxList({"pageNumber": pageNumber, "pageSize": _self.pageSize, "height": _self.height}, function (res) {
                loading.close();
                if (res.success) {
                    if(res.data.list){
                        _self.transList = res.data.list;
                        _self.totalDataNumber = res.data.total;
                        _self.showTransHeader = true;
                    }else{
                        _self.showTransHeader = false;
                    }
                }
            });
        }
    }
}
</script>

<style>
</style>
