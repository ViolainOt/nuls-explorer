<template>
    <div class="nuls-home-content">
        <div class="nuls-second-type">

            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$t("nav.currencyAccount")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>
            <div class="nuls-title text-align-center">{{$t("nav.currencyAccount")}}</div>
        </div>
        <h3 class="nuls-hit">{{$t("outPieceAccount.pieceMessage")}}</h3>
        <div class="mobile-auto-fix">
            <!--cash list start-->
            <table boeder="1" class="nuls-ul-table">
                <thead>
                <tr>
                    <th class="space-th"></th>
                    <th>{{$t('currencyAccount.number')}}</th>
                    <th>{{$t('currencyAccount.address')}}</th>
                    <th>{{$t('currencyAccount.balance')}}</th>
                    <th class="space-th"></th>
                </tr>
                </thead>
                <tbody v-if="blockList.length!==0">
                <tr v-for="(block,key) in blockList">
                    <td class="space-td"></td>
                    <td :data-label="$t('currencyAccount.number')">{{((currentPage-1)*pageSize)+key+1}}</td>
                    <td :data-label="$t('currencyAccount.address')">
                        <router-link :to="{path:'/accountInfo',query:{address:block.address}}">{{block.address}}</router-link>
                    </td>
                    <td :data-label="$t('currencyAccount.balance')" class="td-last">{{block.total | getInfactCoin}}</td>
                    <td class="space-td"></td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr class="big-show">
                    <td colspan="5" class="no-data">{{ $t('notice.noMessage') }}</td>
                </tr>
                <tr class="small-show">
                    <td :data-label="$t('currencyAccount.number')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('currencyAccount.address')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('currencyAccount.balance')">{{ $t('notice.noMessage') }}</td>
                </tr>
                </tbody>
            </table>
            <div class="foot-pagination">
                <el-pagination
                    background
                    :prev-text="$t('page.previous')"
                    :next-text="$t('page.next')"
                    layout="total,prev, pager, next,jumper"
                    @current-change="nulsGetBalanceListRank"
                    :page-size=this.pageSize
                    :current-page=this.currentPage
                    :total=this.totalDataNumber>
                </el-pagination>
            </div>
            <!--cash list end-->
        </div>
    </div>
</template>
<script>
    import {getBalanceListRank} from "../assets/js/nuls.js";
    import {formatDate, getInfactCoin, formatString} from '../assets/js/util.js';

    export default {
        name: "cashAccount",
        data() {
            return {
                blockList: [{id: 0, address: '', total: ''}],
                totalDataNumber: 0,
                currentPage: 1,
                pageSize: 20,
            }
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date);
            },
            getInfactCoin(count) {
                return getInfactCoin(count);
            },
            formatString(address) {
                return formatString(address);
            }
        },
        created: function () {
            this.currentPage = isNaN(this.$route.query.currentPage) ? 1 : parseInt(this.$route.query.currentPage, 10);
            this.nulsGetBalanceListRank(this.currentPage);
        },
        /*
        * 监听route，处理地址栏参数变化
        * Listen for route, handle address bar parameter changes
        */
        watch: {
            '$route'(to, from) {
                var _self = this;
                _self.currentPage = isNaN(to.query.currentPage) ? 1 : parseInt(to.query.currentPage, 10);
                _self.nulsGetBalanceListRank(_self.currentPage);
            }
        },
        methods: {
            /*
            * Load currency list, page load
            * 加载持币列表，分页加载
            */
            nulsGetBalanceListRank(pageNumber) {
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
                if (pageNumber !== 1) {
                    history.pushState({}, "", "/cashAccount?currentPage=" + pageNumber);
                }
                getBalanceListRank({"pageNumber": pageNumber, "pageSize": _self.pageSize}, function (res) {
                    loading.close();
                    if (res.success) {
                        if (res.data.list) {
                            _self.blockList = res.data.list;
                            _self.totalDataNumber = res.data.total;
                            /*返回网页顶部  Back to top of page*/
                            document.getElementById("nuls-outter").scrollTop = 0;
                        } else {
                            _self.$notify({
                                title: _self.$t("notice.notice"),
                                message: _self.$t("notice.noMessage"),
                                type: 'warning'
                            });
                        }
                    }
                    /*else{
                                        _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                                    }*/
                })
            }
        }
    }
</script>
<style scoped lang="less" type="text/less">
   table.nuls-ul-table{
       tr{
           th:first-child,td:first-child{
               /*width:10px!important;*/
           }
       }
   }
</style>
