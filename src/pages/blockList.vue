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
        <table boeder="1" class="nuls-ul-table">
            <thead>
            <tr>
                <th class="space-th"></th>
                <th>{{$t('blockList.height')}}</th>
                <th>{{$t('blockList.time')}}</th>
                <th>{{$t('blockList.transactionCount')}}</th>
                <th>{{$t('blockList.blockNodeName')}}</th>
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
                <td :data-label="$t('blockList.blockNodeName')">{{block.consensusAddress | formatString}}</td>
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
                <td :data-label="$t('blockList.blockNodeName')">{{ $t('notice.noMessage') }}</td>
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
            if(pageNumber !== 1){
                history.pushState({},"","/blockList?currentPage="+pageNumber);
            }
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
