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
        <v-card flat>
          <v-card-text>
            <p>under construction</p>
            <v-row>
              <v-col cols="12">
                <v-col>
                  <v-text-field label="Name" outlined />
                </v-col>
                <v-col>
                  <v-text-field label="Address" outlined />
                </v-col>
              </v-col>
            </v-row>
            <v-btn class="info" large block>Update</v-btn>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>


<script>
import { db } from "@/firebase";
export default {
  data() {
    return {
      tab: null,
      items: ["Submissions", "Attempts in", "Account"],
      unsolved: [],
      solved: [],
    };
  },
  created() {
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