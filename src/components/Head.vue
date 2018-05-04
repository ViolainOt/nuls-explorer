<template>
<header class="head">
<div class="nuls-head-content clearfix">
<div class="nuls-logo-content clearfix">
<router-link to="/"></router-link>
</div>
<ul class="nuls-navigation-box clearfix">
<li>
<router-link to="/">{{$t("nav.index")}}</router-link>
</li>
<li>
<span>
<router-link to="">{{$t("nav.rank")}}</router-link>
<i class="el-icon-arrow-down"></i>
</span>
<ul class="nuls-dropdown-list">
<li>
<router-link to="/cashAccount">{{$t("nav.currencyAccount")}}</router-link>
</li>
<li>
<router-link to="/pieceOfAccount">{{$t("nav.outPieceAccount")}}</router-link>
</li>
</ul>
</li>
<li>
<span class="whiteColor" :title="$t('nav.toolHit')" to="">{{$t("nav.tool")}}</span>
</li>
<li>
  <span>
  <router-link to="" class="nuls-dropdown">{{$t("nav.wallet")}}</router-link>
  <i class="el-icon-arrow-down"></i>
  </span>
  <ul class="nuls-dropdown-list">
    <li>
    <a class="pointer" @click="linkToDown">{{$t("nav.clientDownloads")}}</a>
    </li>
    <li>
    <router-link to="">{{$t("nav.webWallet")}}</router-link>
    </li>
  </ul>
</li>

</ul>

<!--language change start-->
<div class="nuls-language-box">
<!--<select @change="change($event)">
<option value="zh">中文</option>
<option value="en">English</option>
</select>-->
<span>
  <router-link to="" class="nuls-dropdown">{{langText}}</router-link>
  <i class="el-icon-arrow-down"></i>
</span>
<ul class="nuls-dropdown-list">
<li>
<a class="pointer" @click="change('zh')">中文</a>
</li>
<li>
<a class="pointer" @click="change('en')">English</a>
</li>
</ul>
</div>
<!--language change end-->

<!--search start-->
<div class="nuls-search-box">
<input placeholder="Address / Txhash / Block" class="pointer" ref="search" @keyup.enter="search" value="" type="text"/>
<i class="el-icon-search pointer" @click="search"></i>
</div>
<!--search end-->
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
/*change: function(event){
  this.$i18n.locale = event.target.value;
  brotherComponents.$emit('redrawChart');
},*/
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
