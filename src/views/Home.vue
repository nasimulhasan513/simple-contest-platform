<template>
  <div class="container">
      <GeneralHeader/>
    <text-editor></text-editor>
  </div>
</template>
<script>
// import * as firebase from "firebase/app";
// import "firebase/auth";
import { db } from "@/firebase";
import TextEditor from '@/components/TextEditor'

export default {
  components:{
    TextEditor,
  },
  data() {
    return {
      name: "this",
    };
  },
  firestore() {
    return {
      user: db.collection("user"),
    };
  },
  methods: {
    show() {
      console.log(this.$route.path != '/admin');
    },
  },
};
</script>


<style lang="scss" scoped>
.heroImage {
  width: 150px;
  height: 150px;
}
</style>