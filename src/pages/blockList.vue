<template>
    <div class="nuls-home-content">
        <div class="nuls-second-type">
            <nav>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{$t("blockList.blockList")}}</el-breadcrumb-item>
                </el-breadcrumb>
            </nav>
            <div class="nuls-title text-align-center">
                {{$t("blockList.blockList")}}
            </div>
        </div>
        <!--block list start-->
        <div class="mobile-auto-fix">
            <ul class="nuls-ul-table">
                <li class="head">
          <span>
            <ul class="nuls-ul-sub-table">
              <li>
                <span>{{$t("blockList.height")}}</span>
                <span>{{$t("blockList.time")}}</span>
                <span>{{$t("blockList.transactionCount")}}</span>
                <span>{{$t("blockList.blockNodeName")}}</span>
                <span>{{$t("blockList.size")}}(byte)</span>
                <span>{{$t("blockList.blockReward")}}</span>
              </li>
            </ul>
          </span>
                </li>
                <li class="content">
          <span>
            <ul class="nuls-ul-sub-table">
              <li v-for="block in blockList">
                <span><router-link :to="{path:'/blockDetail',query:{height:block.height}}">{{block.height}}</router-link></span>
                <span>{{block.createTime | formatDate}}</span>
                <span>{{block.txCount}}</span>
                <span>
                  <!--<router-link :to="{path:'/consensusNode',query:{address:block.consensusAddress,type:2}}">{{block.consensusAddress | formatString}}</router-link>-->
                    {{block.consensusAddress | formatString}}
                </span>
                <span>{{block.size}}</span>
                <span>{{block.reward|getInfactCoin}} NULS</span>
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
              @current-change="nulsGetBlockList"
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
import {getBlockList} from "../assets/js/nuls.js";
import {formatDate,formatString,getInfactCoin} from '../assets/js/util.js';
export default {
    name: "blockList",
    data () {
        return {
            blockList: [{height: 0, createTime: '', consensusAddress: ' ', txCount: 0, reward: 0}],
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
        this.nulsGetBlockList(this.currentPage);
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
        *Loading block list, paging loading
        *加载区块列表，分页加载
        */
        nulsGetBlockList(pageNumber){
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
            history.pushState({},"","/blockList?currentPage="+pageNumber);
            getBlockList({"pageNumber":pageNumber,"pageSize":_self.pageSize},function(res){
                loading.close();
                /*返回网页顶部  Back to top of page*/
                document.getElementById("nuls-outter").scrollTop = 0;
                if(res.success){
                    if(res.data.list){
                        _self.blockList = res.data.list;
                        _self.totalDataNumber = res.data.total;
                    }else{
                        _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.noMessage"),type: 'warning'});
                    }
                }else{
                    _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
                }
            })
        }
    }
}
</script>

<style>
</style>
