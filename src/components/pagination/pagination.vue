<template>
  <div class="page_content_div">
    <span class="noborder">{{$t("el.pagination.total")}}{{$t("other.semicolon")}}{{total}}</span>
    <span :class="{disable:currentPage==1}" @click="currentPage > 1 && chagnePage(currentPage-1)">{{$t("page.previous")}}</span>
    <span v-show="currentPage>4" :class="{active:currentPage==1}" @click="chagnePage(1)">1</span>
    <span v-show="currentPage-4>1">...</span>
    <span @click="chagnePage(item)" :class="{active:currentPage==item}" v-for="item in dataPageList">{{item}}</span>
    <span v-show="currentPage+3<maxPage">...</span>
    <span v-show="(maxPage-3) > currentPage" @click="chagnePage(maxPage)">{{maxPage}}</span>
    <span :class="{disable:currentPage==maxPage}" @click="currentPage < maxPage && chagnePage(currentPage+1)">{{$t("page.next")}}</span>
    <span class="noborder goto">{{$t("el.pagination.goto")}}</span>
    <div class="input_div">
      <input @blur="checkVal" v-model="jumpVal" @keyup.enter="chagnePage(jumpVal)" />
    </div>
    <span class="noborder page">{{$t("page.page")}}</span>
    <span @click="chagnePage(jumpVal)">{{$t("notice.determine")}}</span>
  </div>
</template>

<script>

export default {
  name: "nuls_pagination",
  data () {
    return {
      maxPage: 1,
      jumpVal: '',
      dataPageList : [],
    }
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    }
  },
  mounted: function () {
    this.dataList();
  },
  watch: {
    total: function (val, oldVal) {
      this.dataList();
    },
    currentPage: function (val, oldVal) {
      this.dataList();
    }
  },
  methods: {
    /**
     * 分页列表
     */
    dataList: function(){
      var propsData = this.$props;
      if(propsData.total > 0){
        var counter = 7,
            current = Number(propsData.currentPage),
            totalPage = Math.ceil(propsData.total/propsData.pageSize);
        var pageList = [];
        if(totalPage < counter || current <= 3){
          var endPage = counter > totalPage ? totalPage:counter;
          for(var i = 1; i <= endPage; i++){
            pageList.push(i);
          }
        }else{
          if(current + 3 > totalPage){
            var startPage = totalPage - counter;
            for(var i = startPage ; i <= totalPage; i++){
              pageList.push(i);
            }
          }else{
            for(var i = current - 3 ; i <= current +2; i++){
              pageList.push(i);
            }
          }
        }
        this.dataPageList=pageList;
        this.maxPage = totalPage;
      }
    },
    chagnePage: function(page){
      if(isNaN(page)){
        this.$notify({title: this.$t("notice.notice"),message: this.$t("notice.numberError"),type: 'warning'});
        return;
      }else if(page <= 0){
        page = 1;
      }else if(page > this.maxPage){
        page = this.maxPage;
      }else if(page === this.$props.currentPage){
        return;
      }
      this.$emit('doChange',page);
    },
    checkVal: function(){
      this.jumpVal = isNaN(this.jumpVal)?1:parseInt(this.jumpVal,10);
    }
  },
}
</script>

<style>

</style>
