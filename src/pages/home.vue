<template>
    <div class="nuls-home-content">
        <div class="nuls-home-content-top">
            <div class="nuls-home-content-top-left float_left">
                <div class="nuls-home-content-head-left-head">
                    <div class="nuls-title flex">
                        <div class="nuls-title-logo"><i class="nuls-img-icon nuls-img-consensus"></i></div>
                        <div class="nuls-title-text">{{$t("second.index_NULS")}}</div>
                    </div>
                    <div class="nuls-border nuls-message-list">
                        <div class="nuls-flex-cell flex">
                            <div class="nuls-flex-cell-title" @click="toTrans()">{{$t("second.totalMortgage")}}</div>
                            <div class="nuls-flex-cell-flex">{{newestBlock.totalDeposit |getInfactCoin}}</div>
                        </div>
                        <div class="nuls-flex-cell flex">
                            <div class="nuls-flex-cell-title">{{$t("second.consensusNodeAccount")}}</div>
                            <div class="nuls-flex-cell-flex">{{newestBlock.agentCount}}</div>
                        </div>
                        <div class="nuls-flex-cell flex">
                            <div class="nuls-flex-cell-title">{{$t("second.consensusPeople")}}</div>
                            <div class="nuls-flex-cell-flex">{{newestBlock.consensusAccountNumber}}</div>
                        </div>
                        <div class="nuls-flex-cell flex">
                            <div class="nuls-flex-cell-title wflex">{{$t("second.tokenCirculation")}}</div>
                            <div class="nuls-flex-cell-flex">100,000,000</div>
                        </div>
                        <div class="nuls-flex-cell flex">
                            <div class="nuls-flex-cell-title wflex">{{$t("second.dailyConsensusNodeReward")}}</div>
                            <div class="nuls-flex-cell-flex">{{newestBlock.rewardOfDay | getInfactCoin}}</div>
                        </div>
                    </div>
                    <div class="nuls-border nuls-message-list nuls-history-title-back">
                        <div class="nuls-history-title">{{$t("second.history")}}</div>
                        <g2-line :charData="txHistory" :id="'g2line'"></g2-line>
                    </div>
                </div>
            </div>
            <div class="nuls-home-content-top-right float_right">
                <div class="nuls-home-content-head-right-head">
                    <div class="nuls-title flex">
                        <div class="nuls-title-logo"><i class="nuls-img-icon nuls-img-block"></i></div>
                        <div class="nuls-title-text">{{$t("second.block")}}<router-link class="float_right" :to="{path:'/blockList',query:{currentPage:1}}">{{$t("second.more")}}</router-link></div>
                    </div>
                    <div class="nuls-home-content-head-right-content">
                        <div class="nuls-head-block-list" v-for="block in blockList">
                            <div class="flex block_split w100">
                                <div class="w49">
                                    <span>{{$t("second.block")}}{{$t("other.semicolon")}}</span>
                                    <span class="pointer baseColor" @click="toBlockDetail(block.height)">{{block.height}}</span>
                                </div>
                                <div class="flex-auto text-align-right">
                                    {{block.createTime | formatDate}}
                                </div>
                            </div>
                            <div class="w100 block_split">
                                <div class="float_left w45 address">{{$t("blockDetail.blockNodeName")}}&nbsp;{{block.consensusAddress | formatString}}</div>
                                <div class="transactions">{{block.txCount}}&nbsp;{{$t("second.transactions")}}</div>
                                <div class="float_right coin">{{block.reward|getInfactCoin}}&nbsp;NULS</div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nuls-home-content-next clear">
            <div class="nuls-title flex">
                <div class="nuls-title-logo"><i class="nuls-img-icon nuls-img-block"></i></div>
                <div class="nuls-title-text">{{$t("second.transaction")}}<router-link class="float_right" to="transactionRecord">{{$t("second.more")}}</router-link></div>
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
                        <div class="block"><span>{{$t("second.block")}}{{$t("other.semicolon")}}<a class="pointer" @click="toBlockDetail(txlist.blockHeight)">{{txlist.blockHeight}}</a></span></div>
                        <div class="input_output">{{$t("second.enter")}}/{{$t("second.outPut")}}{{$t("other.semicolon")}}&nbsp;{{txlist.inputs|arrayLength}}/{{txlist.outputs|arrayLength}}</span></div>
                        <div class="fee text-align-right"><span>
    <template v-if="txlist.type <= 2">
    {{$t("second.amount")}}{{$t("other.semicolon")}}{{txlist | formatTxAmount}} NULS
    </template>
</span></div>
                    </div>
                    <div class="clear"></div>
                    <div class="flex flex-top block_split" v-if="txlist.inputs[0] || txlist.outputs[0]" :class="showScroll==key?'scrollHeight':'hideHeight'">
                        <div class="input_div text-hidden">
                            <p v-if="!txlist.inputs[0]">&nbsp;</p>
                            <p v-for="inputlist in txlist.inputs" class="baseColor pointer text-hidden" @click="toAccountInfo(inputlist.address)">{{inputlist.address}}</p>
                        </div>
                        <div class="tx_logo"><i class="nuls-img-icon nuls-img-right-action"></i></div>
                        <div class="output_div text-align-right text-hidden">
                            <p v-for="outputlist in txlist.outputs" class="text-hidden baseColor pointer" @click="toAccountInfo(outputlist.address)">{{outputlist.address}}</p>
                        </div>
                        <div class="tx_amount text-align-right">
                            <p class="text-hidden" v-for="outputlist in txlist.outputs">{{outputlist.amount|getInfactCoin}} NULS</p>
                        </div>
                    </div>
                    <p><span>{{$t("second.fee")}}{{$t("other.semicolon")}}{{txlist.fee|getInfactCoin}} NULS</span></p>
                    <div v-if="txlist.inputs[4] || txlist.outputs[4]" class="tx_more text-align-center pointer"><a @click="showmore(key)"><i class="nuls-img-icon nuls-img-three-point pointer"></i></a></div>
                </li>
            </ul>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    import G2Line from '@/components/G2Line.vue';
    import {getTxListIndex,getTxByHash,getBlockListIndex,getAllConsensus,getTxHistoryList} from "../assets/js/nuls.js";
    import {formatDate,formatString,getInfactCoin,getTransactionResultAmount} from '../assets/js/util.js';
    import {brotherComponents} from '../assets/js/public.js';
    import nulsJs from 'zengcc-fls-sdk';
    export default {
        name: "home",
        components: {
            G2Line
        },
        data () {
            return {
                autoLoad: 1,
                blockList: [{height: 0, createTime: '', consensusAddress: ' ', txCount: 0, reward: 0}],
                newestBlock: {totalDeposit: 0, agentCount: 0, consensusAccountNumber: 0, rewardOfDay: 0},
                transList: [{
                    showClass: 'hideHeight',
                    hash: ' ',
                    type: '1',
                    txIndex: '',
                    createTime: '',
                    blockHeight: 0,
                    fee: 0,
                    inputs: [{txHash: '', address: '', value: 0}],
                    outputs: [{txHash: '', address: '', value: 0}],
                    status: 0,
                    size: 110
                }],
                txHistory: [{day: '', value: 0}],
                showScroll: -1,
                timeOut: null
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
            arrayLength(arr){
                return arr?arr.length:0;
            },
            /*
            *计算这笔交易的输入减去输出后的余额
            *Calculate the input of this transaction minus the balance after output
            */
            formatTxAmount(txlist){
                return getInfactCoin(getTransactionResultAmount(txlist));
            },
            getInfactCoin(count){
                return getInfactCoin(count);
            }
        },
        created:function(){
            var _self = this;
            _self.nulsGetBlockList();
            _self.nulsGetHistory();
            /*每隔10s自动刷新首页，为了避免重复创建定时器，需要处理destroyed*/
            if(!_self.timeOut){
                _self.timeOut = setInterval(function(){
                    _self.nulsGetBlockList();
                },10000);
            }

            /**
             * Listening for language switching events and redrawing transaction history
             * 监听语言切换事件，重新绘制交易历史
             */
            brotherComponents.$on('redrawChart',function(){
                var tmpDrawChat = _self.txHistory;
                _self.txHistory = [{day: '', value: 0}];
                setTimeout(function(){
                    _self.txHistory = tmpDrawChat;
                },300);
            });
        },
        destroyed () {
            clearInterval(this.timeOut);
        },
        methods: {
            /*
            * show more
            * 显示隐藏的交易列表
            */
            showmore: function(v){
                this.showScroll =this.showScroll===v?-1:v;
            },
            /*
            *跳转块详情
            * to block detail
            */
            toBlockDetail: function(height){
                this.$router.push({path:'/blockDetail',query:{height:height}});
            },
            /*
            *跳转账户详情
            * to account detail
            */
            toAccountInfo: function(address){
                this.$router.push({path:'/accountInfo',query:{address:address}});
            },
            toTrans: function(){
                nulsJs.transaction({
                    "money":"10000000000",
                    "address":"Nse7SQkhaoGBRviu4Wr7TopAG8568oM2",
                    "toAddress":"Nsdy94pnLZE5V3ozLmp3LzKL68YmsPU4",
                    "remark":"bbf",
                    "price":"100000",
                    "pri":"4b0e3c3264c3f3f1e795d7b1a222eb387e62b4192e30439a240a7f00f19283d477b5ee478badb65710afc8219d727b77",
                    "pass":"nuls123456",
                    "types":"2"
                },function(data){
                    console.log(data);
                });
            },
            /*
            *跳转交易详情
            * to transaction detail
            */
            toTransactionHash: function(hash){
                //closeWebPage();
                this.$router.push({path:'/transactionHash',query:{hash:hash}});
            },
            /*
            *跳转节点详情
            * to consensus node detail
            */
            toConsensusNode: function(address,type){
                this.$router.push({path:'/consensusNode',query:{address:address,type:type}});
            },
            /*
            *获取最近14天的交易历史
            * get 14 days trading history
            */
            nulsGetHistory: function(){
                var _self = this;
                getTxHistoryList(function(res){
                    if(res.success) {
                        var arrayData=res.data,len=arrayData.length,myChart=[];
                        for(var i=0;i<len;i++){
                            var chartData = arrayData[i].split("-");
                            myChart.push({day:new Date(parseInt(chartData[0])),value:parseInt(chartData[1])});
                        }
                        _self.txHistory=myChart;
                    }
                });
            },
            nulsGetBlockList:function(){
                var _self = this;
                var loading = null;
                if(_self.autoLoad===1){
                    loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.5)'
                    });
                    _self.autoLoad = 2;
                }
                /*
                *获取块列表
                * get block list
                */
                getBlockListIndex({"pageNumber":1,"pageSize":6},function(res){
                    if(res.success){
                        if(res.data&&res.data.length > 0){
                            _self.blockList = res.data;
                        }else{
                            if(_self.autoLoad===1) {
                                _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.noBlockMessage"),type: 'warning'});
                            }
                        }

                    }
                });
                /*
                *获取共识详情
                * get consensus detail
                */
                getAllConsensus(function(res){
                    if(res.success){
                        _self.newestBlock=res.data;
                    }
                });
                /*
                *获取交易列表
                * get transaction list
                */
                getTxListIndex({"pageNumber":1,"pageSize":5},function(res){
                    if(loading){
                        loading.close();
                    }
                    if(res.success){
                        if(res.data&&res.data.length > 0){
                            _self.transList=res.data;
                        }else{
                            if(_self.autoLoad===1) {
                                _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.noTransMessage"),type: 'warning'});
                            }
                        }
                        return;
                    }
                    if(_self.autoLoad===1) {
                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                    }
                });
            }
        }
    }
</script>

<style>
</style>
