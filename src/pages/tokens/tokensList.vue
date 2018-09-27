<template>
    <div class="nuls-home-content">
        <div class="nuls-second-type">
            <div class="nuls-title text-align-center">
                {{$t("tokensList.tokensListTitle")}}
            </div>
        </div>
        <!--block list start-->
        <div class="mobile-auto-fix">
            <ul class="nuls-ul-table">
                <li class="head">
          <span>
            <ul class="nuls-ul-sub-table">
              <li>
                <span>{{$t("tokensList.rank")}}</span>
                <span>{{$t("tokensList.token")}}</span>
                <span>{{$t("tokensList.symbol")}}</span>
                <span>{{$t("tokensList.totalSupply")}}</span>
                <span>{{$t("tokensList.decimas")}}</span>
                <span>{{$t("tokensList.created")}}</span>
              </li>
            </ul>
          </span>
                </li>
                <li class="content">
          <span>
            <ul class="nuls-ul-sub-table">
              <li v-for="(item,index) in list">
                <span>{{index+1}}</span>
                <span><router-link :to="{path:'/tokens/tokenDetail',query:{contractAddress:item.contractAddress}}">{{item.tokenName}}</router-link></span>
                <span>{{item.symbol}}</span>
                <span>{{item.totalsupply}}</span>
                <span>{{item.decimals}}</span>
                <span>{{item.createTime | formatDate}}</span>
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
                @current-change="nulsGetTokensList"
                :page-size=this.pageSize
                :current-page=this.currentPage
                :total=this.totalDataNumber>
            </el-pagination>
                </span>
                </li>
            </ul>

        </div>
        <!--block list end-->
    </div>
</template>

<script>
    import {getTokensList} from "../../assets/js/nuls.js";
    import {formatDate,formatString,getInfactCoin,LeftShift,Power} from '../../assets/js/util.js';
    export default {
        name: "tokensList",
        data () {
            return {
                list: [],
                totalDataNumber: 0,
                pageSize: 20,
                currentPage: 1,
            }
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date);
            },
        },
        created:function(){
            this.currentPage = isNaN(this.$route.query.currentPage)?1:parseInt(this.$route.query.currentPage,10);
            this.nulsGetTokensList(this.currentPage);
        },
        /*
        * 监听route，处理地址栏参数变化
        * Listen for route, handle address bar parameter changes
        */
        watch: {
            '$route'(to, from) {
                var _self = this;
                _self.currentPage = isNaN(to.query.currentPage)?1:parseInt(to.query.currentPage,10);
                _self.nulsGetTokensList(_self.currentPage);
            }
        },
        methods: {
            /*
            *Loading block list, paging loading
            *加载区块列表，分页加载
            */
            nulsGetTokensList(pageNumber){
                var loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                var _self = this;
                _self.currentPage = pageNumber;
                /*
                *Modify history to prevent users from refreshing pages incorrectly
                *修改历史记录，防止用户刷新页面不正确
                */
                if(pageNumber !== 1){
                    history.pushState({},"","/tokensList?currentPage="+pageNumber);
                }
                getTokensList({"pageNumber":pageNumber,"pageSize":_self.pageSize},function(res){
                    loading.close();
                    /*返回网页顶部  Back to top of page*/
                    document.getElementById("nuls-outter").scrollTop = 0;
                    if(res.success){
                        if(res.data.list){
                            _self.list = res.data.list;
                            _self.totalDataNumber = res.data.total;
                            for(let i in res.data.list){
                                res.data.list[i].type = 1000;
                                let powerNo = Power(res.data.list[i].decimals);
                                res.data.list[i].totalsupply = LeftShift(res.data.list[i].totalsupply,powerNo).toString();
                            }
                        }else{
                            _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.noMessage"),type: 'warning'});
                        }
                    }/*else{
                    _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                }*/
                })
            }
        }
    }
</script>

<style>
</style>
