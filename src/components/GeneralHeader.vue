<template>
  <v-sheet style="margin-bottom: 75px">
    <v-app-bar class="grey lighten-2" app flat>
      <v-toolbar-title class="MobileTitle">Contest Jam</v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-for="nav in navs" :key="nav.title">
        <v-btn text rounded large tile :to="nav.to" class="topnav">
          <v-icon>{{nav.icon}}</v-icon>
          {{nav.title}}
        </v-btn>
      </div>
      <v-btn text large :to="this.userStatus ? '/user' : '/login'">
        <v-icon>mdi-account-circle</v-icon>Account
      </v-btn>
    </v-app-bar>
    <v-app-bar app class="hidden-md-and-up grey lighten-3">
      <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      <v-toolbar-title class="MobileTitle mx-auto">Contest Jam</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer class="hidden-md-and-up" v-model="sidebar" absolute temporary>
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="(nav, i) in navs" :key="i">
            <v-list-item-icon>
              <v-icon v-text="nav.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="nav.to" class="MobileLink">{{nav.title}}</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="this.userStatus ? '/user' : '/login'" class="MobileLink">Account</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
export default {
  name: "GeneralHeader",
  data() {
    return {
      navs: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },

        {
          icon: "mdi-help-network",
          title: "Questions",
          to: "/questions",
        },
        {
          icon: "mdi-chart-bar",
          title: "Leaderboard",
          to: "/leaderboard",
        },
      ],
      sidebar: false,
    };
  },
  computed: {
    userStatus() {
      return this.$store.getters.loginstatus;
    },
  },
  // watch: {
  //   userStatus(value) {
  //     if (value) {
  //       this.userData = true;
  //     } else {
  //       this.userData = false;
  //     }
  //   },
  // },
};
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap");
.topnav {
  margin-left: 5px;
}
.MobileTitle {
  font-family: "Grand Hotel", cursive;
  font-size: 25px;
}
.MobileLink {
  text-decoration: none;
  color: black;
}
</style>