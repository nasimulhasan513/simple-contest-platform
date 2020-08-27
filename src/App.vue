<template>
  <v-app class="grey lighten-4">
     <router-view />

    <!-- <v-footer  app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>


<script>

import katex from "katex";
import "katex/dist/katex.min.css";
export default {

  data(){
    return {
      header: undefined,
    }
  },
  beforeCreate(){    
      this.header = this.adminPath
  },
  computed: {
    adminPath() {
      const Path = this.$route.path;
      let adminPaths = [
        "/admin",
        "/admin/questions",
        "admin/users",
        "admin/subjects",
        "admin/tables",
        "admin/addquestion"
      ];
      console.log(adminPaths.includes(Path))
      return adminPaths.includes(Path);
    },
  },
  mounted() {
    window.katex = katex;
  },
};
</script>