<template>
  <div class="nuls-content">
    <nav>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t("second.transList")}}</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>

    <div class="nuls-title">
      {{$t("second.transaction")}}
    </div>
    <!-- transaction list start -->
    <ul class="nuls-transaction-list" ref="contentInfo">
      <!--class="yellow-card"-->
    <li v-for="(txlist,key) in transList" v-bind:class="formatTxClass(txlist.type)">
    <p>{{$t("transDetail.transTypeDetail.i"+txlist.type)}}</p>

    <p><span><router-link :to="{path:'/transactionHash',query:{hash:txlist.hash}}">{{txlist.hash}}</router-link></span><span>{{txlist.time | formatDate}}</span></p>
    <p><span>{{$t("second.block")}}{{$t("other.semicolon")}}<router-link :to="{path:'/blockDetail',query:{height:txlist.blockHeight}}">{{txlist.blockHeight}}</router-link></span><span>{{$t("second.enter")}}/{{$t("second.outPut")}}{{$t("other.semicolon")}}&nbsp;{{txlist.inputs|arrayLength}}/{{txlist.outputs|arrayLength}}</span><span>{{$t("second.fee")}}{{$t("other.semicolon")}}{{txlist.fee|getInfactCoin}} NULS</span></p>
    <template v-if="txlist.inputs[0] || txlist.outputs[0]">
      <div class="w100" :class="showScroll==key?'scrollHeight':'hideHeight'">
        <div class="w25 float_left">
          <p v-if="!txlist.inputs[0]">&nbsp;</p>
          <p v-for="inputlist in txlist.inputs"><span>
            <router-link :to="{path:'/accountInfo',query:{address:inputlist.address}}">{{inputlist.address}}</router-link>
          </span></p>
        </div>
        <div class="w20 float_left center">
          <i class="nuls-img-icon nuls-img-right-action"></i>
        </div>
        <div class="w55 float_left">
          <p v-for="outputlist in txlist.outputs"><span>
            <router-link :to="{path:'/accountInfo',query:{address:outputlist.address}}">{{outputlist.address}}</router-link>
          </span><span>{{outputlist.value|getInfactCoin}} NULS</span></p>
        </div>
      </div>
    </template>
    <div class="clear"></div>
    <template v-if="txlist.type <= 2">
      <p><span>{{$t("second.amount")}}{{$t("other.semicolon")}}{{txlist | formatTxAmount}} NULS</span></p>
    </template>
    <div v-if="txlist.inputs[5] || txlist.outputs[5]" class="list-foot"><a @click="showmore(key)"><i class="nuls-img-icon nuls-img-three-point pointer"></i></a></div>
    </li>
    </ul>
    <!-- transaction list end -->
    <div class="text-align-right">
    <el-pagination
      background
      :prev-text="$t('page.previous')"
      :next-text="$t('page.next')"
      layout="total,prev, pager, next,jumper"
    @current-change="nulstxlist"
    :page-size=this.pageSize
    :current-page=this.currentPage
    :total=this.totalDataNumber>
    </el-pagination>
    </div>
  </div>
</template>
<script>
  import {getTxList,getTxByHash,getBlockList} from "../assets/js/nuls.js";
  import {formatDate,formatTxClass,getInfactCoin,getTransactionResultAmount} from '../assets/js/util.js';
  export default {
    name: "transactionRecord",
    data () {
      return {
        showScroll: -1,
        totalDataNumber: 0,
        pageSize: 20,
        currentPage: 1,
        transList: [{
          showClass: 1,
          hash: '',
          type: '',
          index: '',
          time: '2018-01-01',
          blockHeight: '',
          fee: '',
          value: '',
          inputs: [{txHash: '', index: '', address: '', value: '', createTime: '', lockTime: '', type: '', status: ''}],
          outputs: [{
            txHash: '',
            index: '',
            address: '',
            value: '',
            createTime: '',
            lockTime: '',
            type: '',
            status: ''
          }],
          transferType: '',
          remark: '',
          status: 0,
          confirmCount: '',
          size: ''
        }]
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
      this.currentPage = isNaN(this.$route.query.currentPage)?1:parseInt(this.$route.query.currentPage,10);
      this.nulstxlist(this.currentPage);
    },
    /*
    * 监听route，处理地址栏参数变化
    * Listen for route, handle address bar parameter changes
    */
    watch: {
      '$route'(to, from) {
        var _self = this;
        _self.currentPage = parseInt(to.query.currentPage,10);
        _self.nulstxlist(_self.currentPage);
      }
    },
    methods: {
      formatTxClass:function(status){
        return formatTxClass(status);
      },
      showmore: function(v){
        this.showScroll =this.showScroll===v?-1:v;
      },
      /**
       * 加载交易记录列表
       * Load transaction list
       */
      nulstxlist:function(pageNumber){
        var _self = this;
        var loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)'
        });
        _self.currentPage = pageNumber;
        history.pushState({},"","/transactionRecord?currentPage="+pageNumber);
        getTxList({"pageNumber":pageNumber,"pageSize":_self.pageSize},function(res){
          loading.close();
          if(res.success){
            if(res.data.list){
              _self.transList=res.data.list;
              _self.totalDataNumber = res.data.total;
              /*返回网页顶部  Back to top of page*/
              document.getElementById("nuls-outter").scrollTop = 0;
            }else{
              _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.noMessage"),type: 'warning'});
            }
          }else{
            _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
          }
        });
      }
    }
  }

</script>

<style>
</style>
