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
                <span class="td-s">{{$t("tokensDetail.txID")}}</span>
                <!--<span>{{$t("tokenCommom.token")}}</span>-->
                <span class="td-s">{{$t("tokensDetail.from")}}</span>
                <span class="td-s">{{$t("tokensDetail.to")}}</span>
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
                <span class="td-s"><router-link :to="{path:'/transactionHash',query:{hash:item.createTxHash,type:item.type}}">{{item.txHash | formatString}}</router-link></span>
                <!--<span>{{item.name}}</span>-->
                <span class="td-s"><span v-if="item.fromAddress"><router-link :to="{path:'/accountInfo',query:{address:item.fromAddress}}">{{item.fromAddress | formatString}}</router-link></span></span>
                <span class="td-s"><span v-if="item.toAddress"><router-link :to="{path:'/accountInfo',query:{address:item.toAddress}}">{{item.toAddress | formatString}}</router-link></span></span>
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
                <span><span v-if="item.accountAddress"><router-link :to="{path:'/accountInfo',query:{address:item.accountAddress}}">{{item.accountAddress | formatString}}</router-link></span></span>
                <span :title="item.amount">{{item.amount}}</span>
                <span>{{item.per}}</span>
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
    import {formatDate,getInfactCoin,getTransactionResultAmount,formatString,LeftShift,Power,timesDecimals} from '../../assets/js/util.js';
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
            nulsTokenDetail: function(){
                var _self = this;
                getTokenDetail({"contractAddress":_self.address},function(res){
                    if (res.success) {
                        _self.accountInfo = res.data;
                        res.data.totalSupply = timesDecimals(res.data.totalSupply,res.data.decimals).toString();
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
                    history.pushState({}, "", "/tokenDetail?currentPage=" + pageNumber);
                }
                getTransList({"contractAddress":_self.address},{"pageNumber":pageNumber,"pageSize":_self.pageSize},'/transactions',function(res){
                    loading.close();
                    /*返回网页顶部  Back to top of page*/
                    document.getElementById("nuls-outter").scrollTop = 0;
                    if(res.success){
                        _self.transList = res.data.list;
                        for(let i=0;i<res.data.list.length;i++){
                            res.data.list[i].type = 1000;
                            //let powerNo = Power(res.data.list[i].decimals);
                            res.data.list[i].txValue = timesDecimals(res.data.list[i].txValue,res.data.list[i].decimals).toString();
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
                    history.pushState({}, "", "/tokenDetail?currentPage=" + pageNumber);
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
                            res.data.list[i].amount = timesDecimals(res.data.list[i].amount,res.data.list[i].decimals).toString();
                            if((res.data.list[i].amount/_self.totalSupply)*100<0.0001){
                                console.log((res.data.list[i].amount/_self.totalSupply)*100)
                                res.data.list[i].per=0+'%'
                            }else if((res.data.list[i].amount/_self.totalSupply)*100===100){
                                res.data.list[i].per=((res.data.list[i].amount/_self.totalSupply)*100)+'%'
                            }else{
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

<style scoped>
    ul.nuls-ul-table>li > span>ul.nuls-ul-sub-table>li>span.td-s,ul.nuls-ul-table li.content > span>ul.nuls-ul-sub-table>li > span.td-s{
        width:10%;
    }
    ul.nuls-ul-table>li > span>ul.nuls-ul-sub-table>li>span.td-m,ul.nuls-ul-table li.content > span>ul.nuls-ul-sub-table>li > span.td-m{
        width:10%;
    }
</style>

