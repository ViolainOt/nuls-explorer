<template>
    <div class="nuls-home-content">
        <div class="nuls-second-type">
            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$t("consensusNode.consensusNode")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>

            <div class="nuls-title text-align-center">
                {{$t("consensusNode.consensusNode")}}
            </div>
        </div>
        <!--consensusNode detail start-->
        <div class="nuls-home-content-top nuls-home-content-accountinfo tx_background tx_border" v-show="showDetail">
            <div class="nuls-message-list">
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("consensusNode.accountInfo")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden"><router-link class="float_right" :to="{path:'/accountInfo',query:{address:consensusDetail.agentAddress}}">{{consensusDetail.agentAddress}}</router-link></div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("consensusNode.blockAddress")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{consensusDetail.packingAddress}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("consensusNode.nodeName")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{consensusDetail.txHash|formatName}}</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("consensusNode.consensusStatus")}}</div>
                    <div class="nuls-flex-cell-flex">{{$t("consensus.i"+consensusDetail.status)}}</div>
                </div>

                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("consensusNode.blockCount")}}</div>
                    <div class="nuls-flex-cell-flex text-hidden">{{consensusDetail.totalPackingCount}} blocks</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("consensusNode.consensusReward")}}</div>
                    <div class="nuls-flex-cell-flex">{{consensusDetail.totalReward|getInfactCoin}} NULS</div>
                </div>
                <div class="nuls-flex-cell flex">
                    <div class="nuls-flex-cell-title">{{$t("consensusNode.margin")}}</div>
                    <div class="nuls-flex-cell-flex">{{consensusDetail.deposit|getInfactCoin}} NULS</div>
                </div>
            </div>
        </div>
        <!--consensusNode detail end-->
        <div style="height:40px;" :tt="showDetail"></div>
        <!--consensusNode block list start-->
        <div class="mobile-auto-fix">
            <table boeder="1" class="nuls-ul-table">
                <thead>
                <tr>
                    <th class="space-th"></th>
                    <th>{{$t('blockList.height')}}</th>
                    <th>{{$t('blockList.time')}}</th>
                    <th>{{$t('blockList.transactionCount')}}</th>
                    <th>{{$t('blockList.size')}}(byte)</th>
                    <th>{{$t('blockList.blockReward')}}</th>
                    <th class="space-th"></th>
                </tr>
                </thead>
                <tbody v-if="blockList.length!==0">
                <tr v-for="block in blockList">
                    <td class="space-td"></td>
                    <td :data-label="$t('blockList.height')"><router-link :to="{path:'/blockDetail',query:{height:block.height}}">{{block.height}}</router-link></td>
                    <td :data-label="$t('blockList.time')">{{block.createTime | formatDate}}</td>
                    <td :data-label="$t('blockList.transactionCount')">{{block.txCount}}</td>
                    <td :data-label="$t('blockList.size')+'(byte)'">{{block.size}}</td>
                    <td :data-label="$t('blockList.blockReward')" class="td-last">{{block.reward|getInfactCoin}} NULS</td>
                    <td class="space-td"></td>
                </tr>
                </tbody>
                <tbody v-else>
                <tr class="big-show">
                    <td colspan="5" class="no-data">{{ $t('notice.noMessage') }}</td>
                </tr>
                <tr class="small-show">
                    <td :data-label="$t('blockList.height')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('blockList.time')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('blockList.transactionCount')">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('blockList.size')+'(byte)'">{{ $t('notice.noMessage') }}</td>
                    <td :data-label="$t('blockList.blockReward')">{{ $t('notice.noMessage') }}</td>
                </tr>
                </tbody>
            </table>
            <div class="foot-pagination">
                <el-pagination
                    background
                    :prev-text="$t('page.previous')"
                    :next-text="$t('page.next')"
                    layout="total,prev, pager, next,jumper"
                    @current-change="nulsGetBlockList"
                    :page-size=this.pageSize
                    :current-page=this.currentPage
                    :total=this.totalDataNumber>
                </el-pagination>
            </div>
    </div>
    <!--consensusNode block list end-->
</div>
    </template>
<script>
import {getBlockList,getConsensusAgentDetail} from "../assets/js/nuls.js";
import {formatDate,formatString,getInfactCoin} from '../assets/js/util.js';
export default {
    name: "blockDetail",
    data () {
        return {
            showDetail: false,
            consensusDetail: {
                txHash:'',
                agentAddress:'',
                packingAddress:'',
                deposit:'',
                commissionRate:'',
                createTime:'',
                blockHeight:'',
                status:'',
                totalDeposit:'',
                depositCount:'',
                totalPackingCount:'',
                lastRewardHeight:'',
                totalReward:''
            },
            blockList: [{height: 0, createTime: '', consensusAddress: ' ', txCount: 0, reward: 0}],
            totalDataNumber: 0,
            currentPage: 1,
            pageSize: 20,
            address: '',
            type: 1
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
        getInfactCoin(count){
            return getInfactCoin(count);
        },
        formatName(str){
            if(str && str.length > 8){
                return str.substring(str.length -8,str.length);
            }else{
                return str;
            }
        }
    },
    created:function(){
        this.address = this.$route.query.address;
        this.type = this.$route.query.type;
        this.currentPage = isNaN(this.$route.query.currentPage)?1:parseInt(this.$route.query.currentPage,10);
        this.nulsGetBlockList(this.currentPage);
        this.nulsGetConsensusDetail();
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
        /**
         * 根据出块节点加载出块列表，分页加载
         * Load block list according to the block node, page load
         */
        nulsGetBlockList(pageNumber){
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
                history.pushState({}, "", "/consensusNode?currentPage=" + pageNumber + "&address=" + _self.address + "&type=" + _self.type);
            }
            getBlockList({"pageNumber":pageNumber,"pageSize":_self.pageSize,"address":_self.address,"type":_self.type},function(res){
                loading.close();
                if(res.success){
                    if(res.data.list){
                        _self.blockList = res.data.list;
                        _self.totalDataNumber = res.data.total;
                        /*返回网页顶部  Back to top of page*/
                        document.getElementById("nuls-outter").scrollTop = 0;
                    }/*else{
                        _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.consensusDetail"),type: 'warning'});
                    }*/
                }
            });
        },
        /**
         * 获取共识节点详情
         * Get consensus node details
         */
        nulsGetConsensusDetail(){
            var _self = this;
            getConsensusAgentDetail({"address":_self.address},function(res){
                if(res.success){
                    if(res.data){
                        _self.consensusDetail = res.data;
                        _self.showDetail = true;
                    }
                }
            });
        }
    }
}
</script>
<style>
ul.nuls-ul-table li > span{
    width:6.8%;
}
</style>
