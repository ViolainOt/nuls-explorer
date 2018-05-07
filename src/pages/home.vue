<template>
  <div class="nuls-home-content">
    <div class="nuls-home-content-head clearfix">
      <div class="nuls-home-content-head-left clearfix">
        <div class="nuls-home-content-head-left-head">
          <div>
            <span><i class="nuls-img-icon nuls-img-consensus"></i></span><label>{{$t("second.index_NULS")}}</label>
          </div>
        </div>
        <div class="nuls-infomation-box entireNetworkInfomation">

          <!--NULS NULS full network information start-->
          <div class="nuls-block-box nuls-table">
            <div class="nuls-table-row">
              <div class="nuls-table-cell">{{$t("second.totalMortgage")}}</div>
              <div class="nuls-table-cell text-align-right">{{newestBlock.totalDeposit |getInfactCoin}}</div>
            </div>
            <div class="nuls-table-row">
              <div class="nuls-table-cell">{{$t("second.consensusNodeAccount")}}</div>
              <div class="nuls-table-cell text-align-right">{{newestBlock.agentCount}}</div>
            </div>
            <div class="nuls-table-row">
              <div class="nuls-table-cell">{{$t("second.consensusPeople")}}</div>
              <div class="nuls-table-cell text-align-right">{{newestBlock.consensusAccountNumber}}</div>
            </div>
            <div class="nuls-table-row">
              <div class="nuls-table-cell">{{$t("second.tokenCirculation")}}</div>
              <div class="nuls-table-cell text-align-right">100,000,000</div>
            </div>
            <div class="nuls-table-row">
              <div class="nuls-table-cell">{{$t("second.dailyConsensusNodeReward")}}</div>
              <div class="nuls-table-cell text-align-right">{{newestBlock.rewardOfDay | getInfactCoin}}</div>
            </div>
          </div>
          <!--NULS NULS full network information end-->

          <!--14 days trading history start-->
          <div class="nuls-block-box nuls-transaction-history">
            <div class="nuls-history-title">{{$t("second.history")}}</div>
            <g2-line :charData="txHistory" :id="'g2line'"></g2-line>
          </div>
          <!--14 days trading history end-->
        </div>
      </div>
      <div class="nuls-home-content-head-right clearfix">
        <div class="nuls-home-content-head-left-head">
          <div class="clearfix">
            <span><i class="nuls-img-icon nuls-img-block"></i></span><label>{{$t("second.block")}}</label>
            <router-link :to="{path:'/blockList'}">{{$t("second.more")}}</router-link>
          </div>
        </div>
        <!--block list start-->
        <div class="nuls-infomation-box blockInfomation">
          <ul class=" nuls-block-list">
            <li v-for="block in blockList">
              <div>
                <div class="nuls-table-cell">
                  <span>{{$t("second.block")}}</span>
                  <span class="pointer baseColor" @click="toBlockDetail(block.height)">{{block.height}}</span>
                </div>
                <div class="nuls-table-cell text-align-right">{{block.time | formatDate}}</div>
              </div>
              <div>
                <div class="nuls-table-cell">
                  <span>{{$t("blockDetail.blockNodeName")}}</span>
                  <!--class="baseColor pointer" click="toConsensusNode(block.packingAddress,2)"-->
                  <span>{{block.packingAddress | formatString}}</span>
                </div>
                <div class="nuls-table-cell">{{block.txCount}}{{$t("second.transactions")}}</div>
                <div class="nuls-table-cell text-align-right">{{block.reward|getInfactCoin}} NULS</div>
              </div>
            </li>
          </ul>
        </div>
        <!--block list end-->
      </div>
    </div>

    <div class="nuls-transaction-container">
      <div class="nuls-transaction-head clearfix">
        <span><i class="nuls-img-icon nuls-img-block"></i></span>
        <label>{{$t("second.transaction")}}</label><router-link to="transactionRecord">{{$t("second.more")}}</router-link></div>
      <ul class="nuls-transaction-list">
        <!--class="yellow-card"-->
        <li v-for="(txlist,key) in transList" v-bind:class="formatTxClass(txlist.type)">
          <p>{{$t("transDetail.transTypeDetail.i"+txlist.type)}}</p>
          <p><span class="baseColor pointer" @click="toTransactionHash(txlist.hash)">{{txlist.hash}}</span><span>{{txlist.time | formatDate}}</span></p>
          <p><span>{{$t("second.block")}}{{$t("other.semicolon")}}<a class="pointer" @click="toBlockDetail(txlist.blockHeight)">{{txlist.blockHeight}}</a></span><span>{{$t("second.enter")}}/{{$t("second.outPut")}}{{$t("other.semicolon")}}&nbsp;{{txlist.inputs|arrayLength}}/{{txlist.outputs|arrayLength}}</span><span>{{$t("second.fee")}}{{$t("other.semicolon")}}{{txlist.fee|getInfactCoin}} NULS</span></p>
          <template v-if="txlist.inputs[0] || txlist.outputs[0]">
            <div class="w100" :class="showScroll==key?'scrollHeight':'hideHeight'">
              <div class="w25 float_left">
                <p v-if="!txlist.inputs[0]">&nbsp;</p>
                <p v-for="inputlist in txlist.inputs"><span class="baseColor pointer" @click="toAccountInfo(inputlist.address)">{{inputlist.address}}</span></p>
              </div>
              <div class="w20 float_left center">
                <i class="nuls-img-icon nuls-img-right-action"></i>
              </div>
              <div class="w55 float_left">
                <p v-for="outputlist in txlist.outputs"><span class="baseColor pointer" @click="toAccountInfo(outputlist.address)">{{outputlist.address}}</span><span>{{outputlist.value|getInfactCoin}} NULS</span></p>
              </div>
            </div>
          </template>
          <div class="clear"></div>
          <template v-if="txlist.type <= 2">
          <p><span>{{$t("second.amount")}}{{$t("other.semicolon")}}{{txlist | formatTxAmount}} NULS</span></p>
          </template>
          <div v-if="txlist.inputs[4] || txlist.outputs[4]" class="list-foot"><a @click="showmore(key)"><i class="nuls-img-icon nuls-img-three-point pointer"></i></a></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import G2Line from '@/components/G2Line.vue';
  import {getTxList,getTxByHash,getBlockList,getAllConsensus,getTxHistoryList} from "../assets/js/nuls.js";
  import {formatDate,formatTxClass,formatString,getInfactCoin,getTransactionResultAmount} from '../assets/js/util.js';
  import {brotherComponents} from '../assets/js/public.js';
  export default {
    name: "home",
    components: {
      G2Line
    },
    data () {
      return {
        autoLoad: 1,
        blockList: [{height: 0, time: '', packingAddress: ' ', txCount: 0, reward: 0}],
        newestBlock: {totalDeposit: 0, agentCount: 0, consensusAccountNumber: 0, rewardOfDay: 0},
        transList: [{
          showClass: 'hideHeight',
          hash: ' ',
          type: '1',
          index: '',
          time: '',
          blockHeight: 0,
          fee: 0,
          value: 0,
          inputs: [{txHash: '', index: '', address: '', value: 0, createTime: '', lockTime: '', type: 1, status: 1}],
          outputs: [{txHash: '', index: '', address: '', value: 0, createTime: '', lockTime: '', type: 1, status: 1}],
          transferType: 1,
          remark: '',
          status: 0,
          confirmCount: 0,
          size: 110
        }],
        txHistory: [{day: '', value: 0}],
        showScroll: -1,
        timeOut: null
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
        return getInfactCoin(count);
      }
    },
    created:function(){
      var _self = this;
      _self.nulsGetBlockList();
      _self.nulsGetHistory();
      /*每隔10s自动刷新首页，为了避免重复创建定时器，需要处理destroyed*/
      if(!_self.timeOut){
        _self.timeOut = setInterval(function(){
          _self.nulsGetBlockList();
        },10000);
      }

      /**
       * Listening for language switching events and redrawing transaction history
       * 监听语言切换事件，重新绘制交易历史
       */
      brotherComponents.$on('redrawChart',function(){
        var tmpDrawChat = _self.txHistory;
        _self.txHistory = [{day: '', value: 0}];
        setTimeout(function(){
          _self.txHistory = tmpDrawChat;
        },300);
      });
    },
    destroyed () {
      clearInterval(this.timeOut);
    },
    methods: {
      formatTxClass:function(status){
        return formatTxClass(status);
      },
      /*
      * show more
      * 显示隐藏的交易列表
      */
      showmore: function(v){
        this.showScroll =this.showScroll===v?-1:v;
      },
      /*
      *跳转块详情
      * to block detail
      */
      toBlockDetail: function(height){
        this.$router.push({path:'/blockDetail',query:{height:height}});
      },
      /*
      *跳转账户详情
      * to account detail
      */
      toAccountInfo: function(address){
        this.$router.push({path:'/accountInfo',query:{address:address}});
      },
      /*
      *跳转交易详情
      * to transaction detail
      */
      toTransactionHash: function(hash){
        this.$router.push({path:'/transactionHash',query:{hash:hash}});
      },
      /*
      *跳转节点详情
      * to consensus node detail
      */
      toConsensusNode: function(address,type){
        this.$router.push({path:'/consensusNode',query:{address:address,type:type}});
      },
      /*
      *获取最近14天的交易历史
      * get 14 days trading history
      */
      nulsGetHistory: function(){
        var _self = this;
        getTxHistoryList(function(res){
          if(res.success) {
            var arrayData=res.data,len=arrayData.length,myChart=[];
            for(var i=0;i<len;i++){
              /*单独处理时间，后台返回的时间格式为20180102*/
              var splitTime = arrayData[i].txDate;
              try{
                splitTime = splitTime.substring(0,4)+"-"+splitTime.substring(4,6)+"-"+splitTime.substring(6,8);
              }catch (e){
                splitTime = new Date();
              }
              myChart.push({day:splitTime,value:arrayData[i].txCount});
            }
            _self.txHistory=myChart;
          }
        });
      },
      nulsGetBlockList:function(){
        var _self = this;
        var loading = null;
        if(_self.autoLoad===1){
          loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
          });
          _self.autoLoad = 2;
        }
        /*
        *获取块列表
        * get block list
        */
        getBlockList({"pageNumber":1,"pageSize":6},function(res){
          if(res.success){
            if(res.data.list&&res.data.list.length > 0){
              _self.blockList = res.data.list;
            }else{
              _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.noBlockMessage"),type: 'warning'});
            }
          }
        });
        /*
        *获取共识详情
        * get consensus detail
        */
        getAllConsensus(function(res){
          if(res.success){
            _self.newestBlock=res.data;
          }
        });
        /*
        *获取交易列表
        * get transaction list
        */
        getTxList({"pageNumber":1,"pageSize":5},function(res){
          if(loading){
            loading.close();
          }
          if(res.success){
            if(res.data.list&&res.data.list.length > 0){
              _self.transList=res.data.list;
            }else{
              _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.noTransMessage"),type: 'warning'});
            }
            return;
          }
          if(_self.autoLoad===1) {
            _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
          }
        });
      }
    }
  }
</script>

<style>
</style>
