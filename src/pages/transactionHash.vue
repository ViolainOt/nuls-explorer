<template>
    <div class="nuls-home-content">
        <!--nav start-->
        <div class="nuls-second-type">
    <nav>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">{{$t("nav.index")}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/transactionRecord' }">{{$t("second.transaction")}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t("transDetail.transDetail")}}</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>

    <div class="nuls-title text-align-center">
      {{$t("transDetail.transDetail")}}
    </div>
        </div>
    <!-- transaction detail start -->
<div class="nuls-home-content-top nuls-home-content-accountinfo tx_background tx_border">
  <div class="nuls-message-list">
      <div class="nuls-flex-cell flex">
          <div class="nuls-flex-cell-title">{{$t("transDetail.transType")}}</div>
          <div class="nuls-flex-cell-flex text-hidden">{{$t("transDetail.transTypeDetail.i"+txdetail.type)}}</div>
      </div>
      <div class="nuls-flex-cell flex">
          <div class="nuls-flex-cell-title">{{$t("transDetail.transHash")}}</div>
          <div class="nuls-flex-cell-flex text-hidden">{{hash}}</div>
      </div>
      <div class="nuls-flex-cell flex">
          <div class="nuls-flex-cell-title">{{$t("transDetail.transHeight")}}</div>
          <div class="nuls-flex-cell-flex text-hidden"><router-link :to="{path:'/blockDetail',query:{height:txdetail.blockHeight}}">{{txdetail.blockHeight}}</router-link></div>
      </div>
      <div class="nuls-flex-cell flex">
          <div class="nuls-flex-cell-title">{{$t("transDetail.transConfirmCount")}}</div>
          <div class="nuls-flex-cell-flex">{{txdetail.confirmCount}}</div>
      </div>

      <div class="nuls-flex-cell flex">
          <div class="nuls-flex-cell-title">{{$t("transDetail.transTime")}}</div>
          <div class="nuls-flex-cell-flex text-hidden">{{txdetail.time | formatDate}}</div>
      </div>
      <div class="nuls-flex-cell flex">
          <div class="nuls-flex-cell-title">{{$t("transDetail.transInput")}}</div>
          <div class="nuls-flex-cell-flex">{{txdetail.inputs|getArrayAmout}} NULS</div>
      </div>
      <div class="nuls-flex-cell flex">
          <div class="nuls-flex-cell-title">{{$t("transDetail.transOutput")}}</div>
          <div class="nuls-flex-cell-flex">{{txdetail.outputs|getArrayAmout}} NULS</div>
      </div>
      <div class="nuls-flex-cell flex">
          <div class="nuls-flex-cell-title">{{$t("transDetail.transFee")}}</div>
          <div class="nuls-flex-cell-flex">{{txdetail.fee|getInfactCoin}} NULS</div>
      </div>
  </div>
</div>
    <!-- transaction detail end -->

    <!-- transaction list start -->
    <div class="tx_list">
      <div class="float_left tx_background tx_input_content">
        <div class="tx_head">{{$t("second.enter")}}</div>
        <ul class="tx_description" :class="showAllInputs==1?'scrollHeight':'hideHeight_trans'">
          <li v-if="!txdetail.inputs[0]">
            <span class="float_left">{{$t("notice.not")}}</span>
            <span class="float_right">&nbsp;</span>
          </li>
          <li v-for="inplist in txdetail.inputs">
            <router-link :to="{path:'/accountInfo',query:{address:inplist.address}}">{{inplist.address|formatString}}</router-link>
            <span class="float_right">（{{inplist.value | getInfactCoin}}&nbsp;-&nbsp;<span @click="hashDetail(inplist.fromHash)" class="baseColor pointer">{{$t("utxoStatus.i3")}}</span>）</span>
          </li>
        </ul>
        <div v-if="txdetail.inputs[5]" class="tx_description center">
          <i @click="showMore(-1)" class="nuls-img-icon nuls-img-three-point pointer"></i>
        </div>
      </div>
      <div class="float_right tx_background tx_output_content">
        <div class="tx_head">{{$t("second.outPut")}}</div>
        <ul class="tx_description" :class="showAllOutputs==1?'scrollHeight':'hideHeight_trans'">
          <li v-if="!txdetail.outputs[0]">
            <span class="float_left">{{$t("notice.not")}}</span>
            <span class="float_right">&nbsp;</span>
          </li>
          <li v-for="outlist in txdetail.outputs">
            <router-link :to="{path:'/accountInfo',query:{address:outlist.address}}">{{outlist.address|formatString}}</router-link>
            <span class="float_right">（{{outlist.value | getInfactCoin}}&nbsp;-&nbsp;<span @click="toSpentByHash(outlist.status,outlist.index,outlist.txHash)" :class="outlist.status==3?'pointer baseColor':'enableColor'">{{$t("utxoStatus.i"+outlist.status)}}</span>）</span>
          </li>
        </ul>
        <div v-if="txdetail.outputs[5]" class="tx_description center">
          <i @click="showMore(-2)" class="nuls-img-icon nuls-img-three-point pointer"></i>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <!-- transaction list end -->
  </div>
</template>

<script>
import {getTxList,getTxByHash,getTxSpentHashDetail} from "../assets/js/nuls.js";
import {formatDate,getInfactCoin,formatString} from '../assets/js/util.js';
import {brotherComponents} from '../assets/js/public.js';
    export default {
      name: "transactionHash",
      data() {
        return {
          hash: '',
          showAllInputs: 0,
          showAllOutputs: 0,
          txdetail: {
            type: 0,
            blockHeight: 0,
            confirmCount: 0,
            time: '',
            fee: 0,
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
            inputs: [{
              txHash: '',
              index: '',
              address: '',
              value: '',
              createTime: '',
              lockTime: '',
              type: '',
              status: ''
            }]
          }
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
        },
        getArrayAmout(arraydata){
          var amount = 0,len=arraydata.length;
          for(var i = 0;i < len;i++){
            amount += arraydata[i].value;
          }
          return getInfactCoin(amount);
        }
      },
      created: function () {
        var _self = this;
        _self.hash = this.$route.query.hash;
        _self.nulstxdetail();
      },
      methods: {
        getInfactCoin(count){
          return getInfactCoin(count);
        },
        /**
         * 根据交易index和hash查询已花费的hash，并获取该hash的详情
         * Query the hash that has been spent based on the transaction index and hash, and get the details of the hash
         */
        toSpentByHash: function(status,index,hash){
          if(status == 3){
            var _self = this;
            getTxSpentHashDetail({"txHash":hash,"index":index},function(res){
              if (res.success) {
                _self.txdetail = res.data;
                _self.hash = res.data.hash;
              }else{
                _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
              }
            });
          }
        },
        /**
         * 根据交易hash查询交易详情
         * Query transaction details based on transaction hash
         */
        nulstxdetail: function () {
          var _self = this;
          getTxByHash({"hash":_self.hash},function(res){
            if (res.success) {
              _self.txdetail = res.data;
            }else{
              _self.$alert(_self.$t("notice.noNet"), _self.$t("notice.notice"), {confirmButtonText: _self.$t("notice.determine")});
            }
          })
        },
        hashDetail: function(hash){
          this.hash = hash;
          this.nulstxdetail();
        },
        showMore: function(v){
          if(v === -1){
            this.showAllInputs = this.showAllInputs=== 0 ? 1: 0;
          }else{
            this.showAllOutputs = this.showAllOutputs=== 0 ? 1: 0;
          }
        }
      },
    }
</script>

<style>
</style>
