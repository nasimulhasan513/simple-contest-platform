<template>
  <v-sheet style="margin-bottom: 75px">
    <v-app-bar app flat>
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
    <v-app-bar app class="hidden-md-and-up">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="MobileTitle">
        <router-link to="/" class="MobileLink">Contest Jam</router-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary>
      <div class="MobileTitle mt-4 ml-5 mb-n4">
        <router-link to="/" class="MobileLink">Contest Jam</router-link>
      </div>
      <v-list nav dense class="mt-3">
        <v-list-item-group v-model="group">
          <router-link v-for="nav in navs" :key="nav.title" :to="nav.to" class="MobileLink">
            <v-list-item class="pa-3">
              <v-list-item-title>
                <v-icon class="ma-2">{{nav.icon}}</v-icon>
                {{nav.title}}
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link :to="this.userStatus ? '/user' : '/login'" class="MobileLink">
            <v-list-item class="pa-3">
              <v-list-item-title>
                <v-icon class="ma-2">mdi-account-circle</v-icon>Account
              </v-list-item-title>
            </v-list-item>
          </router-link>
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
      drawer: false,
      group: null,
      navs: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-book-open",
          title: "Academic",
          to: "/academic",
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
        {
          icon: "mdi-book",
          title: "Submissions",
          to: "/submissions",
        },
      ],
    };
  },
  computed: {
    userStatus() {
      return this.$store.getters.loginstatus;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
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
  color: rgb(26, 26, 26);
}
</style>