<template>
  <v-container class="m-auto">
  <GeneralHeader/>
    <v-card>
      <v-card-title primary-title>
        <h2 class="regtitle">Create An Account</h2>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="userData.name"
                :counter="50"
                :rules="nameRules"
                label="Name"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="userData.email"
                :counter="50"
                :rules="emailRules"
                label="E-mail"
                required
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="userData.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[passwordRules.required, passwordRules.min]"
                :type="show ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                outlined
                @click:append="show = !show"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree to join at our club and maintain all of our rules and regulations?"
            required
          ></v-checkbox>

          <v-btn @click="register" dark color="indigo">Register</v-btn>
          <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  // middleweare: 'unauth',
  data: () => ({
    show: false,
    valid: true,
    passwordRules: {
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 8 || 'Min 8 characters',
    },

    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 50) || 'Name must be less than 10 characters',
    ],

    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],

    phoneRules: [(v) => !!v || 'Phone Number is required'],
    checkbox: false,
    menu: false,
    userData: {
      name: '',
      email: '',
      password: '',
    },
  }),

  methods: {
    register() {
      if (this.checkbox) {
        this.$store.dispatch('userRegistration', this.userData)
        this.$router.push('/')
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    save(date) {
      this.$refs.menu.save(date)
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
}
</script>

<style lang="scss" scoped>
.regtitle {
  font-weight: 100;
}
</style>
