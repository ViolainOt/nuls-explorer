<template>
  <div class="nuls-warper">
    <Head/>
    <div class="nuls-home-content center notfond">
      <p>SORRY,YOU GET LOST</p>
      <p>对不起，您的网页已被火星人劫持</p>
      <div>
        <img :src="notFondPicUrl" />
      </div>
    </div>
    <Foot/>
  </div>
</template>
<script>
import Head from "../components/Head";
import Foot from "../components/Foot";
import notFondPic from "../assets/img/404.png";
export default {
  name: "notFond",
  data() {return {notFondPicUrl:notFondPic};},
  components: {Foot, Head}
}
</script>
