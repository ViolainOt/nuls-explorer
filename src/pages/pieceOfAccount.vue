<template>
    <div class="nuls-home-content">
        <div class="nuls-second-type">
            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$t("nav.outPieceAccount")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>
            <div class="nuls-title text-align-center">
                {{$t("nav.outPieceAccount")}}
            </div>
        </div>
        <h3 class="nuls-hit">{{$t("outPieceAccount.pieceMessage")}}</h3>
        <div class="mobile-auto-fix">
            <!--list start-->
            <ul class="nuls-ul-table" ref="contentInfo">
                <li class="head">
          <span>
            <ul class="nuls-ul-sub-table">
              <li>
                <span>{{$t("outPieceAccount.number")}}</span>
                <span >{{$t("outPieceAccount.address")}}</span>
                <span>{{$t("outPieceAccount.blockReward")}}</span>
                <span>{{$t("outPieceAccount.reward")}}</span>
                <span>{{$t("outPieceAccount.lastRewardBlock")}}</span>
                <!--<span>{{$t("outPieceAccount.consensusStatus")}}</span>-->
              </li>
            </ul>
          </span>

                </li>
                <li class="content">
          <span>
            <ul class="nuls-ul-sub-table">
              <li v-for="(block,key) in blockList">
                <span>{{((currentPage-1)*pageSize)+key+1}}</span>
                <span><router-link :to="{path:'/consensusNode',query:{address:block.packingAddress,type:1}}">{{block.packingAddress}}</router-link></span>
                <span>{{block.totalPackingCount}}</span>
                <span>{{block.totalReward | getInfactCoin}}</span>
                <span>{{block.lastRewardHeight}}</span>
                <!--<span>{{$t("consensusNode.consensusFormatter.i"+block.status)}}</span>-->
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
          @current-change="nulsGetMinedlist"
          :page-size=this.pageSize
          :current-page=this.currentPage
          :total=this.totalDataNumber>
        </el-pagination>
                </span>
            </li>
        </ul>
        <!--list end-->
    </div>
</div>
    </template>

<script>
import {getAddressMinedlist} from "../assets/js/nuls.js";
import {getInfactCoin,formatString} from '../assets/js/util.js';
export default {
    name: "pieceOfAccount",
    data () {
        return {
            blockList: [{id:0,agentAddress:'',packingAddress:'',sumTotalPackingCount:'',totalReward:0,lastRewardHeight:0,status:0,createTime:''}],
            totalDataNumber: 0,
            currentPage: 1,
            pageSize: 20
        }
    },
    filters: {
        getInfactCoin(count) {
            return getInfactCoin(count);
        },
        formatString(str){
            return formatString(str);
        }
    },
    created:function(){
        this.currentPage = isNaN(this.$route.query.currentPage)?1:parseInt(this.$route.query.currentPage,10);
        this.nulsGetMinedlist(this.currentPage);
    },
    methods: {
        /**
         * 加载所有出块账户列表，分页加载
         * Load all out of block account list, page load
         */
        nulsGetMinedlist(pageNumber){
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
            if(pageNumber !== 1) {
                history.pushState({}, "", "/pieceOfAccount?currentPage=" + pageNumber);
            }
            getAddressMinedlist({"pageNumber":pageNumber,"pageSize":_self.pageSize},function(res){
                loading.close();
                if(res.success){
                    if(res.data.list){
                        _self.blockList = res.data.list;
                        _self.totalDataNumber = res.data.total;
                        /*返回网页顶部  Back to top of page*/
                        document.getElementById("nuls-outter").scrollTop = 0;
                    }else{
                        _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.noMessage"),type: 'warning'});
                    }
                    return;
                }/*else{
                    _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                }*/
            })
        }
    }
}
</script>

<style>
ul.nuls-ul-table>li > span>ul.nuls-ul-sub-table>li>span:nth-child(2){
    width:30%;
}
</style>
