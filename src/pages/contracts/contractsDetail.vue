<template>
    <div class="nuls-home-content">
        <!--nav start-->
        <div class="nuls-second-type">
            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/contracts/contractsList' }">{{$t("contractsDetail.contracts")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$t("contractsDetail.contractsDetail")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>
            <!--nav end-->

            <div class="nuls-title text-align-center">ETH</div>
        </div>
        <!--address detail start-->
        <div class="nuls-home-content-top nuls-home-content-accountinfo tx_background tx_border">
            <div class="nuls-message-list">
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("contractsDetail.address")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{accountInfo.contractAddress}}</div>
                </div>
                <div class="nuls-flex-cell flex" v-show="accountInfo.isNrc20===true">
                    <div class="nuls-flex-cell-title">{{$t("tokenCommom.token")}}</div>
                    <div class="nuls-flex-cell-flex"><router-link :to="{path:'/tokens/tokenDetail',query:{contractAddress:accountInfo.contractAddress}}">{{accountInfo.tokenName}}</router-link></div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("contractsDetail.transactions")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.txCount}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("contractsDetail.balance")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.balance}} NULS</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("contractsDetail.creator")}}</div>
                    <div class="nuls-flex-cell-flex"><router-link :to="{path:'/accountInfo',query:{address:accountInfo.creater}}">{{accountInfo.creater}}</router-link></div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("contractsDetail.created")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.createTime | formatDate}}</div>
                </div>
            </div>
        </div>

        <!--address detail end-->

        <!--tab start-->
        <div class="nuls-home-content-next">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('contractsDetail.transactions')" name="first">
                    <template>
                        <!--transactions tab start-->
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
                                            <span>{{$t("second.block")}}{{$t("other.semicolon")}}<a class="pointer" @click="toBlockDetail(txlist.blockHeight)">{{txlist.blockHeight}}</a></span>
                                        </div>
                                        <div class="input_output">{{$t("second.enter")}}/{{$t("second.outPut")}}{{$t("other.semicolon")}}&nbsp;{{txlist.inputs==null?0:txlist.inputs|arrayLength}}/{{txlist.outputList|arrayLength}}</span></div>
                                        <div class="fee text-align-right">
                            <span>
                            <template v-if="txlist.type <= 2">
                            {{$t("second.amount")}}{{$t("other.semicolon")}}{{txlist.amount | getInfactCoin}} NULS
                            </template>
                            </span>
                                        </div>
                                    </div>
                                    <div class="clear"></div>
                                    <div class="flex flex-top block_split" v-if="txlist.inputs!=null||txlist.outputList!=null" :class="showScroll==key?'scrollHeight':'hideHeight'">
                                        <div class="input_div text-hidden">
                                            <p v-if="txlist.inputs==null">&nbsp;</p>
                                            <p v-else v-for="inputlist in txlist.inputs" class="baseColor pointer text-hidden" @click="reloadAccount(inputlist.address)">{{inputlist.address}}</p>
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
                                    <div v-if="txlist.inputs!=null && txlist.inputs[4] || txlist.outputList!= null && txlist.outputList[4]" class="tx_more text-align-center pointer"><a @click="showmore(key)"><i class="nuls-img-icon nuls-img-three-point pointer"></i></a></div>
                                </li>
                            </ul>
                        <div class="text-align-right tx-pagination" v-if="txCount>0">
                            <el-pagination
                                background
                                :prev-text="$t('page.previous')"
                                :next-text="$t('page.next')"
                                layout="total,prev, pager, next,jumper"
                                @current-change="nulsContractsTransactionsList"
                                :page-size=this.pageSize
                                :current-page=this.currentPage
                                :total=this.totalDataNumber>
                            </el-pagination>

                        </div>
                        <!--transactions tab start-->
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="$t('contractsDetail.contractInfo')" name="second">
                    <!--contractInfo tab start-->
                    <div class="mobile-auto-fix">
                        <ul class="nuls-ul-table">
                            <li class="head">
          <span>
            <ul class="nuls-ul-sub-table">
              <li>
                <span>{{$t("contractsDetail.method")}}</span>
                <span>{{$t("contractsDetail.parameter")}}</span>
                <span>{{$t("contractsDetail.returnType")}}</span>
              </li>
            </ul>
          </span>
                            </li>
                            <li class="content">
          <span>
            <ul class="nuls-ul-sub-table">
              <li v-for="item in this.accountInfo.method">
                <span>{{item.name}}</span>
                <span>
                    <span v-for="(itemArgs,index) in item.args">{{index+1===item.args.length ? itemArgs.name+" _"+itemArgs.type : itemArgs.name+" _"+itemArgs.type+","}}</span>
                </span>
                <span>{{item.returnArg}}</span>
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
        <!--tab end-->

    </div>
</template>

<script>
    import {getContractsDetail,getContractsTransactionsList} from "../../assets/js/nuls.js";
    import {formatDate,getInfactCoin,getTransactionResultAmount} from '../../assets/js/util.js';
    import {brotherComponents} from '../../assets/js/public.js';
    export default {
        name: "tokenDetail",
        data() {
            return {
                address: '',
                createrAddress: '',
                txCount: 0,
                totalDataNumber: 0,
                currentPage: 1,
                pageSize: 20,
                showScroll: -1,
                accountInfo: {},
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


                activeName: 'first'
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
                return Math.abs(getInfactCoin(count));
            }
        },
        created: function () {
            this.address = this.$route.query.contractAddress;
            this.nulsContractsDetail();
            this.nulsContractsTransactionsList(this.currentPage);
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
                this.nulsContractsDetail();
                this.nulsContractsTransactionsList(this.currentPage);
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
            toTransactionHash: function(hash,type){
                this.$router.push({path:'/transactionHash',query:{hash:hash,type:type}});
            },
            nulsContractsDetail: function(){
                var _self = this;
                getContractsDetail({"address":_self.address},function(res){
                    if (res.success) {
                        _self.accountInfo = res.data;
                        _self.createrAddress = _self.accountInfo.creater;
                    }
                });
            },
            nulsContractsTransactionsList: function (pageNumber) {
                let _self = this;
                let loading = this.$loading({
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
                getContractsTransactionsList({"contractAddress":_self.address},{"accountAddress":_self.accountInfo.creater,"pageNumber":pageNumber,"pageSize":_self.pageSize},'',function(res){
                    console.log(_self.createrAddress)
                    loading.close();
                    /*返回网页顶部  Back to top of page*/
                    document.getElementById("nuls-outter").scrollTop = 0;
                    if(res.success){
                        _self.transList=res.data.list;
                        _self.totalDataNumber = res.data.total;
                        _self.txCount = _self.totalDataNumber;
                        //console.log("_self.txCount:"+_self.txCount);
                    }/*else{
                    _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                }*/
                });
            }
        }
    }
</script>

<style scoped>
    ul.nuls-ul-table>li > span>ul.nuls-ul-sub-table>li>span:first-child {
        display: table-cell;
        width: 7%;
    }
    ul.nuls-ul-table>li > span>ul.nuls-ul-sub-table>li>span:nth-child(2) {
        display: table-cell;
        width: 20%;
    }
</style>

