<template><userLayouts>
  <v-container>
    <GeneralHeader />

    <v-card class="mt-n12" flat>
      <v-row>
        <v-col lg="4" xl="4" sm="12" md="4" align="center" class="mx-auto">
          <v-avatar size="200px" class="ma-3">
            <v-img v-if="!image" src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            <v-img v-else :src="image"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="12" class="sm-mt-8 text-center">
          <h2 class="NameOfUser">{{name}}</h2>
          <v-card-subtitle>
            <v-skeleton-loader
              v-if="!email"
              loading
              transition="fade"
              height="30"
              width="250"
              type="text"
            />
            <span v-else>{{email}}</span>
          </v-card-subtitle>

          <v-card-text>
            <v-chip class="mr-2 mt-1" color="primary">Score: {{user.score}}</v-chip>
            <v-chip
              class="mr-2 mt-1"
              color="success"
              v-if="user.solved"
            >Solved: {{user.solved ? user.solved.length : '0'}}</v-chip>
            <v-chip
              class="mr-2 mt-1"
              color="warning"
              v-if="user.unsolved"
            >Attempts: {{user.unsolved ? user.unsolved.length : '0'}}</v-chip>
            <v-chip class="mr-2 mt-1" color="error" @click="logout">Logout</v-chip>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <!--<v-alert type="success" class="mt-3">Helloo I am here for you to</v-alert>
    -->
    <ProfileSetting />
  </v-container></userLayouts>
</template>

<script>
import ProfileSetting from "@/components/ProfileSetting";
import { db } from "@/firebase";
import userLayouts from '@/layouts/userLayouts'
export default {
  components: {
    ProfileSetting,userLayouts
  },
  data() {
    return {
      name: "",
      email: "",
      image: "",
    };
  },
  firestore() {
    return {
      user: db.collection("user").doc(this.$store.getters.getUser.uid),
    };
  },
  mounted() {
    const user = this.$store.getters.getUser;
    if (user) {
      this.email = user.email;
      this.name = user.displayName;
      this.image = user.photoURL;
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("logOut");
      this.$router.replace("/");
    },
  },
  computed: {
    userData() {
      return this.$store.getters.getUser;
    },
  },
  watch: {
    userData(value) {
      if (value) {
        this.email = value.email;
        this.name = value.displayName;
        this.image = value.photoURL
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.NameOfUser {
  font-weight: 350;
}
</style>
