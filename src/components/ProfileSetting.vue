<template>
  <v-card color="basil" class="my-3">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold display-1">Overview</h1>
    </v-card-title>
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-simple-table v-if="solved.length!=0">
              <thead>
                <tr>
                  <th class="text-left">Questions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in solved" :key="a">
                  <td>{{a}}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <p v-else>You solved no question yet!</p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-simple-table v-if="unsolved.length!=0">
              <thead>
                <tr>
                  <th class="text-left">Questions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in unsolved" :key="a">
                  <td>{{a}}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <p v-else>Well Done! You have no remaining Attempts.</p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat v-if="editProfile">
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field v-model="userData.name" dense label="Name" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="userData.phone" dense label="Phone" counter="11" />
              </v-col>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="userData.birthdate"
                      label="Birthday date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="userData.birthdate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="2000-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  label="Location"
                  @click:append="getLocation()"
                  v-model="userData.location"
                  :loading="locationLoading"
                  append-icon="mdi-crosshairs-gps"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="editProfile=!editProfile" color="error" large>Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info" @click="UpdateUser" large>Update</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-card-text>
            <pre>
      Name: {{user.name}}
      Phone: {{user.phone ? user.phone : 'Empty'}}
      Birthdate: {{user.birthdate ? user.birthdate : 'Empty'}}
      Address: {{user.location ? user.location : 'Empty'}}
      </pre>
            <v-btn @click="editProfile=!editProfile" dark tile class="ml-5">
              Update Profile
              <v-icon>mdi-account-edit</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>


<script>
import { db } from "@/firebase";
import firebase from "@/firebase";
import "firebase/auth";
export default {
  data() {
    return {
      editProfile: false,
      menu: false,
      tab: null,
      items: ["Submissions", "Attempts in", "Account"],
      unsolved: [],
      solved: [],
      locationLoading: false,
      userData: {
        name: "",
        phone: "",
        location: "",
        birthdate: "",
      },
    };
  },
  firestore() {
    return {
      user: db.collection("user").doc(this.$store.getters.getUser.uid),
      questionList: db.collection("shortQuestions"),
    };
  },
  created() {
    this.userData.name = this.$store.getters.getUser.displayName;
    let solvedq = [];
    let usolvedq = [];
    const docRef = db.collection("user").get();
    const qRef = db.collection("shortQuestions").get();
    docRef
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.id == this.$store.getters.getUser.uid) {
            solvedq = doc.data().solved;
            usolvedq = doc.data().unsolved;
          }
        });
      })
      .then(() => {
        qRef.then((snapshot) => {
          snapshot.forEach((q) => {
            solvedq.forEach((s) => {
              if (s == q.id) {
                this.solved.push(q.data().questionTitle);
              }
            });
            usolvedq.forEach((s) => {
              if (s == q.id) {
                console.log(q.data().questionTitle);
                this.unsolved.push(q.data().questionTitle);
              }
            });
          });
        });
      });
  },

  methods: {
    UpdateUser() {
      this.$firestore.user.update(this.userData);
      firebase.auth().currentUser.updateProfile({
        displayName: this.userData.name,
        phoneNumber: this.userData.phone,
      });
      this.editProfile = false;
    },
    getLocation() {
      this.locationLoading = true;
      console.log("location");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCityAndCountry(position);
        },
        (error) => {
          this.locationError();
          console.log(error);
        },
        {
          timeout: 7000,
        }
      );
    },
    getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`;

      this.$http
        .get(apiUrl)
        .then((result) => {
          this.locationSuccess(result);
          console.log(result);
        })
        .catch((error) => {
          this.locationError();
          console.log(error);
        });
    },
    locationSuccess(result) {
      this.userData.location = result.data.city;
      if (result.data.country) {
        this.userData.location += `, ${result.data.country}`;
      }
      this.locationLoading = false;
    },
    locationError() {
      console.log("wokr");
      this.$q.dialog({
        title: "Error",
        message: "Could not find Geolocation",
      });
      this.locationLoading = false;
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>


<style>
/* Helper classes */
.basil {
  background-color: #f1eeee !important;
}
.basil--text {
  color: #356859 !important;
}
</style>