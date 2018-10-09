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
                    <div class="nuls-flex-cell-title">{{$t("accountInfo.balance")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.usable+accountInfo.locked|getInfactCoin}} NULS</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("accountInfo.transactionCount")}}</div>
                    <div class="nuls-flex-cell-flex">{{txCount1}}</div>
                </div>
            </div>
        </div>
        <!--address detail end-->
        <div class="nuls-home-content-next clear">
            <!--<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">-->
                <!--<div class="token-number">[7]</div>-->
            <!--</el-tooltip>-->
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('accountInfo.transaction')" name="first">
                    <template>
                        <!--transactions tab start-->
                        <div class="nuls-home-content-next clear" v-show="txCount1 > 0">
                            <ul class="nuls-transaction-list">
                                <li v-for="(txlist,key) in transList" :class="'transactions_i'+txlist.type">
                                    <div class="block_split">{{$t("transDetail.transTypeDetail.i"+txlist.type)}}</div>
                                    <div class="flex block_split">
                                        <div class="hash flex-auto text-hidden">
                                            <span class="baseColor pointer" @click="toTransactionHash(txlist.hash,txlist.type)">{{txlist.hash}}</span>
                                        </div>
                                        <div class="time text-align-right">{{txlist.createTime | formatDate}}</div>
                                    </div>
                                    <div class="tx_auto_flex block_split">
                                        <div class="block">
                                            <span>{{$t("second.block")}}{{$t("other.semicolon")}}<a class="pointer"
                                                                                                    @click="toBlockDetail(txlist.blockHeight)">{{txlist.blockHeight}}</a></span>
                                        </div>
                                        <div class="input_output">
                                            {{$t("second.enter")}}/{{$t("second.outPut")}}{{$t("other.semicolon")}}&nbsp;{{txlist.inputs==null?0:txlist.inputs|arrayLength}}/{{txlist.outputList|arrayLength}}</span></div>
                                        <div class="fee text-align-right">
                            <span>
                            <template v-if="txlist.type <= 2">
                            {{$t("second.amount")}}{{$t("other.semicolon")}}{{txlist.amount | getInfactCoin}} NULS
                            </template>
                            </span>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                    <div class="flex flex-top block_split"
                                         v-if="txlist.inputs!=null||txlist.outputList!=null"
                                         :class="showScroll==key?'scrollHeight':'hideHeight'">
                                        <div class="input_div text-hidden">
                                            <p v-if="txlist.inputs==null">&nbsp;</p>
                                            <p v-else v-for="inputlist in txlist.inputs"
                                               class="baseColor pointer text-hidden"
                                               @click="reloadAccount(inputlist.address)">{{inputlist.address}}</p>
                                        </div>
                                        <div class="tx_logo"><i class="nuls-img-icon nuls-img-right-action"></i></div>
                                        <div class="output_div text-align-right text-hidden">
                                            <p v-for="outputlist in txlist.outputList"
                                               class="text-hidden baseColor pointer"
                                               @click="reloadAccount(outputlist.address)">{{outputlist.address}}</p>
                                        </div>
                                        <div class="tx_amount text-align-right">
                                            <p class="text-hidden" v-for="outputlist in txlist.outputList">
                                                {{outputlist.value|getInfactCoin}} NULS</p>
                                        </div>
                                    </div>
                                    <p><span>{{$t("second.fee")}}{{$t("other.semicolon")}}{{txlist.fee|getInfactCoin}} NULS</span>
                                    </p>
                                    <div
                                        v-if="txlist.inputs!=null && txlist.inputs[4] || txlist.outputList!= null && txlist.outputList[4]"
                                        class="tx_more text-align-center pointer"><a @click="showmore(key)"><i
                                        class="nuls-img-icon nuls-img-three-point pointer"></i></a></div>
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
                                :current-page=this.currentPage1
                                :total=this.totalDataNumber1>
                            </el-pagination>

                        </div>
                        <!--transactions tab start-->
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="$t('accountInfo.tokenTransfers')" name="second">
                    <!--contractInfo tab start-->
                    <div class="mobile-auto-fix" v-show="txCount2 > 0">
                        <ul class="nuls-ul-table">
                            <li class="head">
          <span>
            <ul class="nuls-ul-sub-table">
              <li>
                <span>{{$t("accountInfo.txID")}}</span>
                <span>{{$t("accountInfo.from")}}</span>
                <span>{{$t("accountInfo.to")}}</span>
                <span>{{$t("accountInfo.value")}}</span>
                <span>{{$t("accountInfo.date")}}</span>
              </li>
            </ul>
          </span>
                            </li>
                            <li class="content">
          <span>
            <ul class="nuls-ul-sub-table">
              <li v-for="block in tokenList">
                <span>{{block.txHash}}</span>
                <span><span v-if="block.fromAddress"><router-link :to="{path:'/accountInfo',query:{address:block.fromAddress}}">{{block.fromAddress|formatString}}</router-link></span></span>
                <span ><span v-if="block.toAddress"><router-link :to="{path:'/accountInfo',query:{address:block.toAddress}}">{{ block.toAddress|formatString}}</router-link></span></span>
                <span>{{block.txValue}}</span>
                <span>{{block.createTime  | formatDate}}</span>
              </li>
            </ul>
          </span>
                            </li>
                            <li class="foot">
          <span>
            <el-pagination
                background
                :prev-text="$t('page.previous')"
                :next-text="$t('page.next')"
                layout="total,prev, pager, next,jumper"
                @current-change="nulsTokenList"
                :page-size=this.pageSize
                :current-page=this.currentPage2
                :total=this.totalDataNumber2>
            </el-pagination>
                </span>
                            </li>
                        </ul>

                    </div>
                    <!--contractInfo tab start-->
                </el-tab-pane>
                <el-tab-pane :label="$t('accountInfo.tokenBalance')" name="third">
                    <!--contractInfo tab start-->
                    <div class="mobile-auto-fix" v-show="txCount3 > 0">
                        <ul class="nuls-ul-table">
                            <li class="head">
                              <span>
                                <ul class="nuls-ul-sub-table">
                                  <li>
                                    <span>{{$t("tokenCommom.token")}}</span>
                                    <span>{{$t("tokenCommom.balance")}}</span>
                                  </li>
                                </ul>
                              </span>
                            </li>
                            <li class="content">
          <span>
            <ul class="nuls-ul-sub-table">
              <li v-for="block in TokenBalanceList">
                <span><router-link :to="{path:'/tokens/tokenDetail',query:{contractAddress:block.contractAddress}}">{{block.symbol}}</router-link></span>
                <span>{{block.amount}}</span>
              </li>
            </ul>
          </span>
                            </li>
                        </ul>

                    </div>
                    <!--contractInfo tab start-->
                </el-tab-pane>
            </el-tabs>
        </div>

    </div>
    <!--pagination end-->

    </div>
</template>

<script>
    import {getAccountByAddress, getTxListByAddress,getTokenListByAddress,getTokenBalanceListByAddress} from "../assets/js/nuls.js";
    import {formatDate, getInfactCoin, getTransactionResultAmount,formatString,LeftShift,Power,newBigNumber,timesDecimals} from '../assets/js/util.js';
    import {brotherComponents} from '../assets/js/public.js';
    import {BigNumber} from 'bignumber.js'
    export default {
        name: "blockDetail",
        data() {
            return {
                address: '',
                txCount1: 0,
                txCount2: 0,
                txCount3: 0,
                totalDataNumber1: 0,
                totalDataNumber2: 0,
                totalDataNumber3: 0,
                currentPage1: 1,
                currentPage2: 1,
                currentPage3: 1,
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
                tokenList:[],
                TokenBalanceList:[],
                activeName: 'first'
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
            formatTxAmount(txlist) {
                return getInfactCoin(getTransactionResultAmount(txlist));
            },
            getInfactCoin(count) {
                return Math.abs(getInfactCoin(count));
            },
            formatString(str){
                return formatString(str);
            },
        },
        created: function () {
            this.address = this.$route.query.address;
            this.nulstxlist(this.currentPage1);
            this.nulsloadDetail();
            this.nulsTokenList(this.currentPage2);
            this.nulsTokenBalanceListByAddress(this.currentPage3);
        },
        /*
        * 监听route，处理地址栏参数变化
        * Listen for route, handle address bar parameter changes
        */
        watch: {
            '$route'(to, from) {
                var _self = this;
                _self.currentPage1 = isNaN(to.query.currentPage) ? 1 : parseInt(to.query.currentPage, 10);
                _self.nulstxlist(_self.currentPage1);
            }
        },
        methods: {
            showmore: function (v) {
                this.showScroll = this.showScroll === v ? -1 : v;
            },
            /*
            *reload address detail,then back to top of page
            *根据地址重新加载网页内容，完成后返回网页顶部
            */
            reloadAccount: function (address) {
                this.address = address;
                this.nulstxlist(this.currentPage);
                this.nulsloadDetail();
                this.nulsTokenList(this.currentPage2);
                this.nulsTokenBalanceListByAddress(this.currentPage3);
            },

            /*
            *跳转块详情
            * to block detail
            */
            toBlockDetail: function (height) {
                this.$router.push({path: '/blockDetail', query: {height: height}});
            },

            /*
            *跳转交易详情
            * to transaction detail
            */
            toTransactionHash: function (hash,type) {
                this.$router.push({path: '/transactionHash', query: {hash: hash,type:type}});
            },

            nulsloadDetail: function () {
                let _self = this;
                getAccountByAddress({"address": _self.address}, function (res) {
                    if (res.success) {
                        _self.accountInfo = res.data;
                    }
                });
            },
            nulstxlist: function (pageNumber) {
                let _self = this;
                let loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                _self.currentPage1 = pageNumber;
                /*
                *Modify history to prevent users from refreshing pages incorrectly
                *修改历史记录，防止用户刷新页面不正确
                */
                if (pageNumber !== 1) {
                    history.pushState({}, "", "/accountInfo?currentPage=" + pageNumber + "&address=" + _self.address);
                }
                getTxListByAddress({
                    "pageNumber": pageNumber,
                    "pageSize": _self.pageSize,
                    "address": _self.address
                }, function (res) {
                    loading.close();
                    /*返回网页顶部  Back to top of page*/
                    document.getElementById("nuls-outter").scrollTop = 0;
                    if (res.success) {
                        _self.transList = res.data.list;
                        _self.totalDataNumber1 = res.data.total;
                        _self.txCount1 = _self.totalDataNumber1;
                    }
                    /*else{
                                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                                    }*/
                });
            },
            nulsTokenList: function (pageNumber) {
                var _self = this;
                var loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                _self.currentPage2 = pageNumber;
                /*
                *Modify history to prevent users from refreshing pages incorrectly
                *修改历史记录，防止用户刷新页面不正确
                */
                if (pageNumber !== 1) {
                    history.pushState({}, "", "/accountInfo?currentPage=" + pageNumber + "&address=" + _self.address);
                }
                getTokenListByAddress({"address":_self.address},{"pageNumber": pageNumber, "pageSize": _self.pageSize},'' ,function (res) {
                    loading.close();
                    /*返回网页顶部  Back to top of page*/
                    document.getElementById("nuls-outter").scrollTop = 0;
                    if (res.success) {
                         _self.tokenList = res.data.list;
                         _self.totalDataNumber2 = res.data.total;
                         _self.txCount2 = _self.totalDataNumber2;
                        let list = res.data.list;
                        for (let i in list) {
                            //let powerNo = Power(list[i].decimals);
                            list[i].txValue = timesDecimals(list[i].txValue,list[i].decimals).toString();
                        }
                    }
                    /*else{
                                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                                    }*/
                });
            },
            nulsTokenBalanceListByAddress: function (pageNumber) {
                var _self = this;
                var loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                _self.currentPage3 = pageNumber;
                /*
                *Modify history to prevent users from refreshing pages incorrectly
                *修改历史记录，防止用户刷新页面不正确
                */
                if (pageNumber !== 1) {
                    history.pushState({}, "", "/accountInfo?currentPage=" + pageNumber + "&address=" + _self.address);
                }
                getTokenBalanceListByAddress({"address":_self.address},{"pageNumber": pageNumber, "pageSize": _self.pageSize},'' ,function (res) {
                    loading.close();
                    /*返回网页顶部  Back to top of page*/
                    document.getElementById("nuls-outter").scrollTop = 0;
                    if (res.success) {
                        _self.TokenBalanceList = res.data.list;
                        _self.totalDataNumber3 = res.data.total;
                        _self.txCount3 = _self.totalDataNumber3;
                        let list = res.data.list;
                        for (let i in list) {
                            list[i].amount = timesDecimals(list[i].amount,list[i].decimals).toString();
                        }
                    }
                    /*else{
                                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                                    }*/
                });
            }
        }
    }
</script>

<style>
    .nuls-home-content-next{
        position: relative;
    }
    .token-number{
        position: absolute;
        top: 38px;
        left: 420px;
        color:#82bd39;
    }
</style>
