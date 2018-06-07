<template>
<header class="head">
<div class="nuls-head-content">
    <div class="menu flex">
        <div class="nuls-logo-content"></div>
        <ul>
            <li><router-link to="/">{{$t("nav.index")}}</router-link></li>
            <li>
                <a>{{$t("nav.rank")}}</a>
                <i class="el-icon-arrow-down"></i>
                <div class="more left">
                    <div>
                        <router-link to="/cashAccount">{{$t("nav.currencyAccount")}}</router-link>
                    </div>
                    <div>
                        <router-link to="/pieceOfAccount">{{$t("nav.outPieceAccount")}}</router-link>
                    </div>
                </div>
            </li>
            <li><router-link to="" :title="$t('nav.toolHit')">{{$t("nav.tool")}}</router-link></li>
            <li>
                <a class="nuls-dropdown">{{$t("nav.wallet")}}</a>
                <i class="el-icon-arrow-down"></i>
                <div class="more right">
                  <div>
                    <a class="pointer" @click="linkToDown">{{$t("nav.clientDownloads")}}</a>
                  </div>
                  <div>
                    <router-link to="">{{$t("nav.webWallet")}}</router-link>
                  </div>
                </div>
            </li>
        </ul>
    </div>
    <div class="menu flex menu-border">
        <div class="nuls-search-box">
            <input placeholder="Address / Txhash / Block" class="pointer" ref="search" @keyup.enter="search" value="" type="text" />
            <i class="el-icon-search pointer" @click="search"></i>
        </div>
        <div class="nuls-language-box">
            <div class="language-outter">
                <router-link to="" class="whiteColor">{{langText}}</router-link>
                <i class="el-icon-arrow-down"></i>
            </div>
            <div class="language_list">
                <div>
                    <a class="pointer" @click="change('zh')">中文</a>
                </div>
                <div>
                    <a class="pointer" @click="change('en')">English</a>
                </div>
            </div>
        </div>
    </div>
    <div class="clear"></div>
</div>
</header>
</template>

<script>
import {getSearchDataDetail} from "../assets/js/nuls.js";
import {brotherComponents} from '../assets/js/public.js';

export default {
name: "Head",
data() {
  return {
    langText:"中文"
  }
},
methods: {
/**
* Language switching event, switching at the same time triggered the home page transaction history redraw
* 语言切换事件，切换同时触发首页的交易历史重绘
*/
change: function(lang){
  if(this.$i18n.locale !== lang){
    this.langText = lang === "zh"?"中文":"English";
    this.$i18n.locale = lang;
    brotherComponents.$emit('redrawChart');
  }


},
linkToDown: function(){
  //
  if(this.$i18n.locale == "zh"){
    window.location.href="https://nuls.io/gettestnow-zh.html";
  }else{
    window.location.href="https://nuls.io/gettestnow.html";
  }
},
search: function () {
  /*show loading*/
  var
  _self = this,
  serchVal = _self.$refs.search.value;
  if(serchVal && serchVal.length>0){
    var loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  /*change the 'serchVal' is Available*/
  getSearchDataDetail({key:serchVal},function (res) {
    if(res.success){
      _self.$router.push({path:'/loadSearch',query:{queryType:res.type,queryValue:serchVal}});
    }else{
      _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.searchFailed"),type: 'warning'});
    }
      /*hide the loader after the request finish*/
      loading.close();
    });
  }else{
    _self.$notify({title: _self.$t("notice.notice"),message: _self.$t("notice.searchNull"),type: 'warning'});
  }
  /*clear the search box*/
  _self.$refs.search.value="";
},
}
}
</script>

<style>

</style>
