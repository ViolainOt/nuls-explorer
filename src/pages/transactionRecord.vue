<template>
    <div class="nuls-home-content">
        <div class="nuls-second-type">
            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$t("second.transList")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>
            <div class="nuls-title text-align-center">
                {{$t("second.transaction")}}
            </div>
        </div>

        <div class="nuls-home-content-next clear">
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
        <div class="text-align-right tx-pagination">
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
        </div>
    </div>
    </template>
<script>
import {getTxList,getTxByHash,getBlockList,getSearchDataDetail} from "../assets/js/nuls.js";
import {formatDate,getInfactCoin,getTransactionResultAmount} from '../assets/js/util.js';
export default {
    name: "transactionRecord",
    data () {
        return {
            showScroll: -1,
            totalDataNumber: 0,
            pageSize: 20,
            currentPage: 1,
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
        this.currentPage = isNaN(this.$route.query.currentPage)?1:parseInt(this.$route.query.currentPage,10);
        this.nulstxlist(this.currentPage);
    },
    /*
    * 监听route，处理地址栏参数变化
    * Listen for route, handle address bar parameter changes
    */
    watch: {
        '$route'(to, from) {
            var _self = this;
            _self.currentPage = parseInt(to.query.currentPage,10);
            _self.nulstxlist(_self.currentPage);
        }
    },
    methods: {
        formatTxClass:function(status){
            return formatTxClass(status);
        },
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
        /*
        *跳转交易详情
        * to transaction detail
        */
        toTransactionHash: function(hash){
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
        /*
        *跳转节点详情
        * to consensus node detail
        */
        toConsensusNode: function(address,type){
            this.$router.push({path:'/consensusNode',query:{address:address,type:type}});
        },
        /**
         * 加载交易记录列表
         * Load transaction list
         */
        nulstxlist:function(pageNumber){
            var _self = this;
            var loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            _self.currentPage = pageNumber;
            if(pageNumber !== 1) {
                history.pushState({}, "", "/transactionRecord?currentPage=" + pageNumber);
            }
            getTxList({"pageNumber":pageNumber,"pageSize":_self.pageSize},function(res){
                loading.close();
                if(res.success){
                    if(res.data.list){
                        _self.transList=res.data.list;
                        _self.totalDataNumber = res.data.total;
                        /*返回网页顶部  Back to top of page*/
                        document.getElementById("nuls-outter").scrollTop = 0;
                    }else{
                        _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.noMessage"),type: 'warning'});
                    }
                }/*else{
                    _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                }*/
            });
        }
    }
}

</script>

<style>
</style>
