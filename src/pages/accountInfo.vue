<template>
  <div class="nuls-home-content">
    <!--nav start-->
        <div class="nuls-second-type">
            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{$t("accountInfo.accountInfo")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>
            <!--nav end-->

            <div class="nuls-title text-align-center">
                {{$t("accountInfo.accountInfo")}}
            </div>
        </div>
      <!--address detail start-->
        <div class="nuls-home-content-top nuls-home-content-accountinfo tx_background tx_border">
            <div class="nuls-message-list">
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("accountInfo.address")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{address}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("accountInfo.canUseBalance")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.usable|getInfactCoin}} NULS</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("accountInfo.freezeBalance")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.locked|getInfactCoin}} NULS</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("accountInfo.transactionCount")}}</div>
                    <div class="nuls-flex-cell-flex">{{txCount}}</div>
                </div>
            </div>
        </div>

    <!--address detail end-->

    <div class="segmentation">
      <i class="nuls-img-icon nuls-img-transaction"></i><span>{{txCount}}&nbsp;{{$t("second.transactions")}}</span>
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
                        <p v-for="inputlist in txlist.inputs" class="baseColor pointer text-hidden" @click="reloadAccount(inputlist.address)">{{inputlist.address}}</p>
                    </div>
                    <div class="tx_logo"><i class="nuls-img-icon nuls-img-right-action"></i></div>
                    <div class="output_div text-align-right text-hidden">
                        <p v-for="outputlist in txlist.outputList" class="text-hidden baseColor pointer" @click="reloadAccount(outputlist.address)">{{outputlist.address}}</p>
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

    <!--pagination start-->
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
    <!--pagination end-->

  </div>
</template>

<script>
import {getAccountByAddress,getTxListByAddress} from "../assets/js/nuls.js";
import {formatDate,getInfactCoin,getTransactionResultAmount} from '../assets/js/util.js';
import {brotherComponents} from '../assets/js/public.js';
export default {
    name: "blockDetail",
    data() {
        return {
            address: '',
            txCount: 0,
            totalDataNumber: 0,
            currentPage: 1,
            pageSize: 20,
            showScroll: -1,
            accountInfo: {balance: 0, usable: 0, locked: 0},
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
    created: function () {
        this.address = this.$route.query.address;
        this.nulstxlist(this.currentPage);
        this.nulsloadDetail();
    },
    /*
    * 监听route，处理地址栏参数变化
    * Listen for route, handle address bar parameter changes
    */
    watch: {
        '$route'(to, from) {
            var _self = this;
            _self.currentPage = isNaN(to.query.currentPage)?1:parseInt(to.query.currentPage,10);
            _self.nulstxlist(_self.currentPage);
        }
    },
    methods: {
        showmore: function(v){
            this.showScroll =this.showScroll===v?-1:v;
        },
        /*
        *reload address detail,then back to top of page
        *根据地址重新加载网页内容，完成后返回网页顶部
        */
        reloadAccount: function(address){
            this.address = address;
            this.nulstxlist(this.currentPage);
            this.nulsloadDetail();
        },
        /*
        *跳转块详情
        * to block detail
        */
        toBlockDetail: function(height){
            this.$router.push({path:'/blockDetail',query:{height:height}});
        },
        /*
        *跳转交易详情
        * to transaction detail
        */
        toTransactionHash: function(hash){
            this.$router.push({path:'/transactionHash',query:{hash:hash}});
        },
        nulsloadDetail: function(){
            var _self = this;
            getAccountByAddress({"address":_self.address},function(res){
                if (res.success) {
                    _self.accountInfo = res.data;
                }
            });
        },
        nulstxlist: function (pageNumber) {
            var _self = this;
            var loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            _self.currentPage = pageNumber;
            /*
            *Modify history to prevent users from refreshing pages incorrectly
            *修改历史记录，防止用户刷新页面不正确
            */
            if(pageNumber !== 1) {
                history.pushState({}, "", "/accountInfo?currentPage=" + pageNumber + "&address=" + _self.address);
            }
            getTxListByAddress({"pageNumber":pageNumber,"pageSize":_self.pageSize,"address":_self.address},function(res){
                loading.close();
                /*返回网页顶部  Back to top of page*/
                document.getElementById("nuls-outter").scrollTop = 0;
                if(res.success){
                    _self.transList=res.data.list;
                    _self.totalDataNumber = res.data.total;
                    _self.txCount = _self.totalDataNumber;
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
