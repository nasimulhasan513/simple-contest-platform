<template>
  <v-container class="mt-2">
    <GeneralHeader />
    <v-card class="grey lighten-5 lg-ma-2">
      <v-card-title class="mt-md-3">
        <h2 class="questiontitle">{{questionTitle}}</h2>
        <v-spacer></v-spacer>
        <div class="py-8"></div>
        <!--<div class="languagefield">
          <v-select :items="languages" label="Language" outlined dense rounded v-model="slang"></v-select>
        </div>-->
      </v-card-title>
      <v-card-subtitle class="subtitle">
        <v-chip x-small>Score: {{point}}</v-chip>
        <v-chip class="mx-2" x-small>#ID: {{id}}</v-chip>
      </v-card-subtitle>
      <v-card-text class="questionbox">
        <div v-html="questionDescription" class="mt-4"></div>
      </v-card-text>
    </v-card>
    <v-sheet rounded width="300px" class="mx-auto mt-5">
      <div class="text-center">
        <v-text-field
          label="Answer"
          shaped
          outlined
          dense
          v-model="answerMatch"
          append-icon="mdi-send"
          class="answerField mx-auto ma-2"
        ></v-text-field>
        <v-btn
          @click="submitAns"
          v-if="this.$store.getters.loginstatus"
          color="success"
          :loading="loading"
          large
          tile
        >Submit</v-btn>

        <v-btn dark v-else to="/login">
          Login to submit
          <v-icon>mdi-lock</v-icon>
        </v-btn>
      </div>
    </v-sheet>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red" absolute float right dark v-bind="attrs" v-on="on" fab>
            <v-icon>mdi-alert</v-icon>
          </v-btn>
        </template>
        <v-card color="grey lighten-3">
          <v-card-title>
            <span class="headline">Report a problem</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-chip>Question #ID: {{id}}</v-chip>
                </v-col>
                <v-col cols="12">
                  <v-select
                    :items="['Spelling','Answer']"
                    label="Report Type"
                    type="password"
                    v-model="reportType"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea v-model="reportDetails" outlined label="Report Details" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark large tile class="primary" @click="dialog = false">Close</v-btn>
            <v-btn dark large tile class="red" @click="dialog = false">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import * as firebase from "firebase/app";
import { db } from "@/firebase";
export default {
  props: {
    questionTitle: {
      type: String,
      required: true,
    },
    questionDescription: {
      type: String,
      required: true,
    },
    point: {
      type: String,
      required: true,
    },
    answer: {
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      languages: ["Bangla", "English"],
      slang: "",
      dialog: false,
      reportDetails: "",
      reportType:'',
      answerMatch: "",
      loading: false,
    };
  },
  firestore() {
    return {
      user: db.collection("user"),
      submissions: db.collection("submissions"),
      reports: db.collection('reports')
    };
  },
  methods: {
    report(){
      this.$firestore.add({
        name: this.$store.getters.getUser.displayName,
        id: this.$store.getters.getUser.uid,
        reportType: this.reportType,
        reportDetails: this.reportDetails
      })
    },
    submitAns() {
      this.loading = true;
      let check = this.answer.includes(this.answerMatch);
      let questionData = {
        point: this.point,
        id: this.id,
      };
      const dataRef = this.$firestore.user.doc(this.userId);

      dataRef.get().then((doc) => {
        if (check) {
          if (!doc.data().solved.includes(questionData.id)) {
            dataRef.update({
              unsolved: firebase.firestore.FieldValue.arrayRemove(
                questionData.id
              ),
              solved: firebase.firestore.FieldValue.arrayUnion(questionData.id),
              score: firebase.firestore.FieldValue.increment(
                parseInt(questionData.point)
              ),
            });
          }
          this.$swal({
            title: "Good job!",
            text: "You solved successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$router.replace("/submissions");
          });
        } else if (doc.data().solved.includes(questionData.id)) {
          this.$swal({
            title: "Sorry!",
            text: "Your previous answer was correct",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          dataRef.update({
            unsolved: firebase.firestore.FieldValue.arrayUnion(questionData.id),
          });
          this.$swal({
            title: "Sorry!",
            text: "Try Again",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
      this.$firestore.submissions.add({
        name: this.userName,
        time: parseInt(Date.now()),
        status: check,
      });
      this.loading = false;
    },
  },
  computed: {
    userId() {
      return this.$store.getters.getUser.uid;
    },
    userName() {
      return this.$store.getters.getUser.displayName;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@500&display=swap");
.languagefield {
  max-width: 150px;
}

.questiontitle {
  font-weight: 200;
  margin-top: -30px;
  font-family: "Hind Siliguri", sans-serif;
}

.subtitle {
  margin-top: -40px;
}

// .questionbox {
//   border-top: 1px solid black;
// }

.answerField {
  max-width: 200px;
}
</style>