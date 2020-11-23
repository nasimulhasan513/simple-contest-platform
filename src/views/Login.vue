<template>
  <userLayouts>
    <div>
      <v-container class="page-login" fill-height>
        <v-row>
          <v-col>
            <v-card class="pa-3 text-center page-login__card" tile>
              <img src="@/assets/loginpage.svg" class="loginpageimg" alt />
              <v-card-text>
                <v-form ref="form" class="my-10" lazy-validation v-model="formValid">
                  <v-text-field
                    append-icon="mdi-email"
                    autocomplete="off"
                    name="login"
                    label="Email"
                    outlined
                    dense
                    rounded
                    type="text"
                    required
                    :rules="formRule.username"
                    v-model="user.email"
                  />
                  <v-text-field
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    autocomplete="off"
                    name="password"
                    label="Password"
                    outlined
                    dense
                    rounded
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    :rules="formRule.password"
                    required
                    v-model="user.password"
                  />
                  <router-link to="/">Forget Password?</router-link>
                </v-form>

                <v-alert dark dense v-if="error" color="red">{{error}}</v-alert>
                <br />
                <v-btn @click="loginWithGoogle" class="mx-2" fab dark small color="red">
                  <v-icon dark>mdi-google</v-icon>
                </v-btn>
                <v-btn @click="loginWithFacebook" class="mx-2" fab dark small color="primary">
                  <v-icon dark>mdi-facebook</v-icon>
                </v-btn>
                <v-btn @click="loginWithGithub" class="mx-2" small fab color>
                  <v-icon>mdi-github</v-icon>
                </v-btn>
              </v-card-text>
              <v-card-actions>
                <v-btn large tile color="primary" @click="login" :loading="loading">Login</v-btn>
                <v-spacer />
                <v-btn large tile color="red" dark to="register">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </userLayouts>
</template>

<script>
import userLayouts from "@/layouts/userLayouts";
export default {
  components: { userLayouts },
  name: "PageLogin",
  data() {
    return {
      show: false,
      loading: false,
      formValid: false,
      user: {
        email: "",
        password: "",
      },
      formRule: {
        username: [(v) => !!v || "Username is required"],
        password: [(v) => !!v || "Password is required"],
      },
      role: "",
    };
  },
  computed: {
    prefix() {
      return "";
    },
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch("userLogin", this.user)
      }
    },

    async loginWithGoogle() {
      await this.$store.dispatch("loginWithGoogle")
    },
    loginWithFacebook() {
      console.log("facebook");
    },
    loginWithGithub() {
      console.log("github");
    },
    routerTest(){
      this.$store.dispatch('testRoute')
    }
  },
};
</script>

<style lang="sass" scoped>
.page-login
  &__card
    max-width: 600px
    margin: 0 auto
.loginpageimg
  max-width: 200px
  margin-top: 30px
  margin-bottom: -45px
</style>
