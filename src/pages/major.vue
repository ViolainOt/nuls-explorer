<template>
    <!--Main start-->
    <div class="nuls_parent_content" :class="font">
        <div class="nuls_child_content" id="nuls-outter">
            <div class="nuls-warper">
                <Head/>
                <router-view></router-view>
                <Foot/>
            </div>
        </div>
    </div>
    <!--Main end-->
</template>
<script>
import Head from "../components/Head";
import Foot from "../components/Foot";
import {brotherComponents} from '../assets/js/public.js';
import {saveDataToTemp,getDataToTemp} from "../assets/js/util.js";
export default {
    name: "major",
    data() {
        return {
            font: "font-english",
            changeType: "changeType",
        };
    },
    components: {Foot, Head},
    created: function(){
        var _self = this;
        brotherComponents.$on('reloadClass',function(){
            _self.font = _self.$i18n.locale === "zh"?"font-zh":"font-english";
        });
        var lang = getDataToTemp(this.changeType);
        if(lang === "zh" || lang === "en"){
            _self.font = "font-zh";
        }else{
            _self.font = "font-english";
        }
    },
    /*beforeRouteUpdate (to, from, next) {
      // react to route changes...
      // don't forget to call next()
      console.log(to);
      next();
    },*/
}
</script>
