<template>
    <div class="nuls-home-content">
        <div class="nuls-second-type">
            <div class="nuls-title text-align-center">
                {{$t("tokensList.tokensListTitle")}}
            </div>
        </div>
        <!--block list start-->
        <div class="mobile-auto-fix">
            <table boeder="1" class="nuls-ul-table">
                <thead>
                <tr>
                    <th class="space-th"></th>
                    <th>{{$t('tokensList.rank')}}</th>
                    <th>{{$t('tokensList.token')}}</th>
                    <th>{{$t('tokensList.symbol')}}</th>
                    <th>{{$t('tokensList.totalSupply')}}</th>
                    <th>{{$t('tokensList.decimas')}}</th>
                    <th class="space-th"></th>
                </tr>
                </thead>
                <tbody v-if="list.length!==0">
                <tr v-for="(item,index) in list">
                    <td class="space-td"></td>
                    <td :data-label="$t('tokensList.rank')">{{((currentPage-1)*pageSize)+index+1}}</td>
                    <td :data-label="$t('tokensList.token')"><router-link :to="{path:'/tokens/tokenDetail',query:{contractAddress:item.contractAddress}}">{{item.tokenName}}</router-link></td>
                    <td :data-label="$t('tokensList.symbol')">{{item.symbol}}</td>
                    <td :data-label="$t('tokensList.totalSupply')">{{item.totalsupply}}</td>
                    <td :data-label="$t('tokensList.decimas')" class="td-last">{{item.decimals}}</td>
                    <td class="space-td"></td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr class="big-show">
                    <td colspan="5" class="no-data">{{ $t('notice.noMessage') }}</td>
                </tr>
                <tr class="small-show">
                    <td :data-label="$t('tokensList.rank')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('tokensList.token')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('tokensList.symbol')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('tokensList.totalSupply')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('tokensList.decimas')">{{ $t('notice.noMessage') }}</td>
                </tr>
                </tbody>
            </table>
            <div class="foot-pagination">
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
            </div>
        </div>
        <!--block list end-->
    </div>
</template>

<script>
    import {getTokensList} from "../../assets/js/nuls.js";
    import {formatDate,formatString,getInfactCoin,LeftShift,Power,timesDecimals} from '../../assets/js/util.js';
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
            *Loading Token list, paging loading
            *加载Token列表，分页加载
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
                                //let powerNo = Power(res.data.list[i].decimals);
                                res.data.list[i].totalsupply = timesDecimals(res.data.list[i].totalsupply,res.data.list[i].decimals).toString();
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

<style scoped>
    .nuls-second-type .nuls-title {
        margin-top: 30px;
    }
</style>
