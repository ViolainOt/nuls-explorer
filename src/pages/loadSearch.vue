<template>
  <div class="nuls-home-content">

  </div>
</template>
<script>

export default {
  name: "loadSearch",
  data () {
    return {
      /*queryType: "",
      queryValue: "",*/
    }
  },
  filters: {
  },
  created:function(){
    var queryType = this.$route.query.queryType,
        queryValue = this.$route.query.queryValue,
        _self = this;
    switch(queryType){
      /*transactionHash*/
      case 1:
        _self.$router.push({path:'/transactionHash',query:{hash:queryValue}});
        break;
      /*accountInfo*/
      case 2:
        _self.$router.push({path:'/accountInfo',query:{address:queryValue}});
        break;
      /*blockDetail*/
      case 3:
        _self.$router.push({path:'/blockDetail',query:{hash:queryValue}});
        break;
      /*blockDetail*/
      case 4:
        _self.$router.push({path:'/blockDetail',query:{height:queryValue}});
        break;
      /*contractsDetail*/
      case 5:
        _self.$router.push({path:'/contracts/contractsDetail',query:{contractAddress:queryValue}});
        break;
      /*transactionHash 合約的hash,type為6   普通hash查詳情，沒有type*/
      case 6:
         _self.$router.push({path:'/transactionHash',query:{hash:queryValue,type:6}});
         break;
      default:
        _self.$router.push({path:'/'});
        break;
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
