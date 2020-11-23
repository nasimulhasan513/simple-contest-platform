<template>
  <v-app class="Cursor grey lighten-4">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>


<script>
import katex from "katex";
import "katex/dist/katex.min.css";
export default {
  mounted() {
    window.katex = katex;
  },
};
</script>


<style scoped>
.Cursor {
  cursor: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/9632/happy.png");
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

