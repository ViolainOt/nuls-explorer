<template>
    <div class="nuls-home-content">
        <div class="nuls-second-type">
            <div class="nuls-title text-align-center">
                {{$t("nav.contracts")}}
            </div>
        </div>
        <!--block list start-->
        <div class="mobile-auto-fix">
            <table boeder="1" class="nuls-ul-table">
                <thead>
                <tr>
                    <th class="space-th"></th>
                    <th>{{$t('contractsList.address')}}</th>
                    <th>{{$t('contractsList.balance')}}</th>
                    <th>{{$t('contractsList.creator')}}</th>
                    <th>{{$t('contractsList.registerd')}}</th>
                    <th class="space-th"></th>
                </tr>
                </thead>
                <tbody v-if="contractsList.length!==0">
                <tr v-for="item in contractsList">
                    <td class="space-td"></td>
                    <td :data-label="$t('contractsList.address')">
                        <router-link :to="{path:'/contracts/contractsDetail',query:{contractAddress:item.contractAddress}}">{{item.contractAddress | formatString}}</router-link>
                    </td>
                    <td :data-label="$t('contractsList.balance')">{{item.balance|getInfactCoin}}</td>
                    <td :data-label="$t('contractsList.creator')"><router-link :to="{path:'/accountInfo',query:{address:item.creater}}">{{item.creater | formatString}}</router-link></td>
                    <td :data-label="$t('contractsList.registerd')" class="td-last">{{item.createTime | formatDate}}</td>
                    <td class="space-td"></td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr class="big-show">
                    <td colspan="5" class="no-data">{{ $t('notice.noMessage') }}</td>
                </tr>
                <tr class="small-show">
                    <td :data-label="$t('contractsList.address')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('contractsList.balance')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('contractsList.creator')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('contractsList.registerd')">{{ $t('notice.noMessage') }}</td>
                </tr>
                </tbody>
            </table>
            <div class="foot-pagination">
                <el-pagination
                    background
                    :prev-text="$t('page.previous')"
                    :next-text="$t('page.next')"
                    layout="total,prev, pager, next,jumper"
                    @current-change="nulsGetContractsList"
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
    import {getContractsList} from "../../assets/js/nuls.js";
    import {formatDate,formatString,getInfactCoin,timesDecimals} from '../../assets/js/util.js';
    export default {
        name: "tokensList",
        data () {
            return {
                contractsList: [],
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
            formatString(str){
                return formatString(str);
            },
            getInfactCoin(count) {
                return getInfactCoin(count);
            }
        },
        created:function(){
            this.currentPage = isNaN(this.$route.query.currentPage)?1:parseInt(this.$route.query.currentPage,10);
            this.nulsGetContractsList(this.currentPage);
        },
        /*
        * 监听route，处理地址栏参数变化
        * Listen for route, handle address bar parameter changes
        */
        watch: {
            '$route'(to, from) {
                var _self = this;
                _self.currentPage = isNaN(to.query.currentPage)?1:parseInt(to.query.currentPage,10);
                _self.nulsGetBlockList(_self.currentPage);
            }
        },
        methods: {
            /*
            *Loading Contracts list, paging loading
            *加载Contracts列表，分页加载
            */
            nulsGetContractsList(pageNumber){
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
                    history.pushState({},"","/contractsList?currentPage="+pageNumber);
                }
                getContractsList({"pageNumber":pageNumber,"pageSize":_self.pageSize},function(res){
                    loading.close();
                    /*返回网页顶部  Back to top of page*/
                    document.getElementById("nuls-outter").scrollTop = 0;
                    if(res.success){
                        if(res.data.list){
                            _self.contractsList = res.data.list;
                            _self.totalDataNumber = res.data.total;
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
