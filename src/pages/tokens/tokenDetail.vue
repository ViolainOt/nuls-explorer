<template>
    <div class="nuls-home-content">
        <!--nav start-->
        <div class="nuls-second-type">
            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/tokens/tokensList' }">{{$t("tokenCommom.token")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$t("tokensDetail.tokenDetail")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>
            <!--nav end-->

            <div class="nuls-title text-align-center">{{accountInfo.tokenName}}</div>
        </div>
        <!--address detail start-->
        <div class="nuls-home-content-top nuls-home-content-accountinfo tx_background tx_border">
            <div class="nuls-message-list">
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("tokensDetail.contract")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden"><router-link :to="{path:'/contracts/contractsDetail',query:{contractAddress:address}}">{{address}}</router-link></div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("tokenCommom.token")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.tokenName}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("tokenCommom.symbol")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.symbol}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("tokenCommom.totalSupply")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.totalSupply}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("tokenCommom.decimas")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.decimals}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("tokenCommom.holders")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.holders}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("tokenCommom.created")}}</div>
                    <div class="nuls-flex-cell-flex">{{accountInfo.createTime | formatDate}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("tokensDetail.creator")}}</div>
                    <div class="nuls-flex-cell-flex"><router-link :to="{path:'/accountInfo',query:{address:accountInfo.createrAddress}}">{{accountInfo.createrAddress}}</router-link></div>
                </div>
            </div>
        </div>

        <!--address detail end-->

       <!--tab start-->
        <div class="nuls-home-content-next">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="$t('tokenCommom.transfers')" name="first">
                    <template>
                        <!--Transfers tab start-->
                        <div class="mobile-auto-fix">
                            <ul class="nuls-ul-table">
                                <li class="head">
          <span>
            <ul class="nuls-ul-sub-table">
              <li>
                <span>{{$t("tokensDetail.txID")}}</span>
                <span>{{$t("tokenCommom.token")}}</span>
                <span>{{$t("tokensDetail.from")}}</span>
                <span>{{$t("tokensDetail.to")}}</span>
                <span>{{$t("tokensDetail.value")}}</span>
                <span>{{$t("tokensDetail.date")}}</span>
              </li>
            </ul>
          </span>
                                </li>
                                <li class="content">
          <span>
            <ul class="nuls-ul-sub-table">
              <li v-for="item in transList">
                <span><router-link :to="{path:'/transactionHash',query:{hash:item.createTxHash,type:item.type}}">{{item.txHash}}</router-link></span>
                <span>{{item.name}}</span>
                <span><span v-if="item.fromAddress">{{item.fromAddress | formatString}}</span></span>
                <span><span v-if="item.toAddress">{{item.toAddress | formatString}}</span></span>
                <span>{{item.txValue}} {{accountInfo.tokenName}}</span>
                <span>{{item.createTime | formatDate}}</span>
                <!--<span><router-link :to="{path:'/tokens/tokenDetail',query:{height:block.height}}">{{block.createTime | formatDate}}</router-link></span>-->
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
                @current-change="nulsTranslist"
                :page-size=this.pageSize
                :current-page=this.currentPage1
                :total=this.totalDataNumber1>
            </el-pagination>
                </span>
                                </li>
                            </ul>

                        </div>
                        <!--Transfers tab end-->
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="$t('tokenCommom.holders')" name="second">
                    <!--Holders tab start-->
                    <div class="mobile-auto-fix">
                        <ul class="nuls-ul-table">
                            <li class="head">
          <span>
            <ul class="nuls-ul-sub-table">
              <li>
                <span>{{$t("tokensDetail.rank")}}</span>
                <span>{{$t("tokensDetail.address")}}</span>
                <span>{{$t("tokensDetail.quantity")}}</span>
                <span>{{$t("tokensDetail.percentage")}}</span>
              </li>
            </ul>
          </span>
                            </li>
                            <li class="content">
          <span>
            <ul class="nuls-ul-sub-table">
              <li v-for="(item,index) in holdersList">
                <span>{{index+1}}</span>
                <span><span v-if="item.accountAddress">{{item.accountAddress | formatString}}</span></span>
                <span>{{item.amount}}</span>
                <span>
                  <!--<router-link :to="{path:'/consensusNode',query:{address:block.consensusAddress,type:2}}">{{block.consensusAddress | formatString}}</router-link>-->
                    {{item.per}}
                </span>
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
                @current-change="nulsHoldersList"
                :page-size=this.pageSize
                :current-page=this.currentPage2
                :total=this.totalDataNumber2>
            </el-pagination>
                </span>
                            </li>
                        </ul>

                    </div>
                    <!--Holders tab end-->
                </el-tab-pane>
            </el-tabs>
        </div>
       <!--tab end-->

    </div>
</template>

<script>
    import {getTokenDetail,getTransList,getHoldersList} from "../../assets/js/nuls.js";
    import {formatDate,getInfactCoin,getTransactionResultAmount,formatString,LeftShift,Power} from '../../assets/js/util.js';
    import {brotherComponents} from '../../assets/js/public.js';
    export default {
        name: "tokenDetail",
        data() {
            return {
                address: '',
                txCount: 0,
                totalDataNumber1: 0,
                totalDataNumber2: 0,
                currentPage1: 1,
                currentPage2: 1,
                pageSize: 20,
                showScroll: -1,
                accountInfo: {},
                transList: [],
                holdersList:[],
                totalSupply:'',
                activeName: 'first',
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
            },
            formatString(str){
                return formatString(str);
            }
        },
        created: function () {
            this.address = this.$route.query.contractAddress;
            this.nulsTokenDetail();
            this.nulsTranslist(this.currentPage1);
            this.nulsHoldersList(this.currentPage2);
        },
        /*
        * 监听route，处理地址栏参数变化
        * Listen for route, handle address bar parameter changes
        */
        watch: {
            '$route'(to, from) {
                var _self = this;
                _self.currentPage = isNaN(to.query.currentPage)?1:parseInt(to.query.currentPage,10);
                _self.nulsTranslist(_self.currentPage);
            }
        },
        methods: {
            handleClick(tab, event) {
               if(tab.name==='second'){
                   this.nulsHoldersList(this.currentPage2);
               }
            },
            showmore: function(v){
                this.showScroll =this.showScroll===v?-1:v;
            },
            /*
            *reload address detail,then back to top of page
            *根据地址重新加载网页内容，完成后返回网页顶部
            */
            reloadAccount: function(address){
                this.address = address;
                this.nulsTokenDetail();
                this.nulsTranslist(this.currentPage1);
                this.nulsHoldersList(this.currentPage2);
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
            nulsTokenDetail: function(){
                var _self = this;
                getTokenDetail({"contractAddress":_self.address},function(res){
                    if (res.success) {
                        _self.accountInfo = res.data;
                        let powerNo = Power(res.data.decimals);
                        res.data.totalSupply = LeftShift(res.data.totalSupply,powerNo).toString();
                        _self.totalSupply = res.data.totalSupply;
                    }
                });
            },
            //transfers tab list
            nulsTranslist: function (pageNumber) {
                var _self = this;
                var loading = this.$loading({
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
                if(pageNumber !== 1) {
                    history.pushState({}, "", "/accountInfo?currentPage=" + pageNumber + "&address=" + _self.address);
                }
                getTransList({"contractAddress":_self.address},{"pageNumber":pageNumber,"pageSize":_self.pageSize},'/transactions',function(res){
                    loading.close();
                    /*返回网页顶部  Back to top of page*/
                    document.getElementById("nuls-outter").scrollTop = 0;
                    if(res.success){
                        _self.transList = res.data.list;
                        for(let i=0;i<res.data.list.length;i++){
                            res.data.list[i].type = 1000;
                            let powerNo = Power(res.data.list[i].decimals);
                            res.data.list[i].txValue = LeftShift(res.data.list[i].txValue,powerNo).toString();
                        }
                        _self.totalDataNumber1 = res.data.total;
                        _self.txCount = _self.totalDataNumber1;
                    }/*else{
                    _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                }*/
                });
            },
            //holders tab list
            nulsHoldersList: function (pageNumber) {
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
                if(pageNumber !== 1) {
                    history.pushState({}, "", "/accountInfo?currentPage=" + pageNumber + "&address=" + _self.address);
                }
                getHoldersList({"contractAddress":_self.address},{"pageNumber":pageNumber,"pageSize":_self.pageSize},'/holders',function(res){
                    loading.close();
                    /*返回网页顶部  Back to top of page*/
                    document.getElementById("nuls-outter").scrollTop = 0;
                    if(res.success){
                        _self.holdersList = res.data.list;
                        _self.totalDataNumber2 = res.data.total;
                        _self.txCount = _self.totalDataNumber2;
                        for(let i in res.data.list){
                            // let powerNo = Power(res.data.list[i].decimals);
                            // res.data.list[i].amount = LeftShift(res.data.list[i].amount,powerNo).toString();
                            // res.data.list[i].amount=Number(res.data.list[i].amount);
                            if((res.data.list[i].amount/_self.totalSupply)*100<0.0001){
                                res.data.list[i].per=0+'%'
                            }else if((res.data.list[i].amount/_self.totalSupply)*100===100){
                                res.data.list[i].per=((res.data.list[i].amount/_self.totalSupply)*100)+'%'
                            }
                            else{
                                res.data.list[i].per=((res.data.list[i].amount/_self.totalSupply)*100).toFixed(4)+'%';
                            }
                        }
                        //console.log("_self.txCount:"+_self.txCount);
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

