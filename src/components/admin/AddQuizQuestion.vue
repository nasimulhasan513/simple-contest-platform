<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>
        <v-icon>mdi-chat-plus</v-icon>
        <h3 class="mx-2">Add new quiz for {{this.questions.qsubject}}</h3>
      </v-card-title>
      <v-card-subtitle>Add Quiz Information</v-card-subtitle>

      <v-card-text>
        <v-text-field v-model="questions.quizTitle" label="Question Title" outlined required />
        <v-textarea
          v-model="questions.quizDescription"
          label="Question Description"
          outlined
          required
        />

        <p>Quiz Questions</p>
        <div>
          <v-expansion-panels>
            <v-expansion-panel v-for="(question,i) in questions.quizzes" :key="i">
              <v-expansion-panel-header>{{question.question}}</v-expansion-panel-header>
              <v-expansion-panel-content class="blue-grey lighten-5">
                <v-row>
                  <v-col cols="8">
                    <v-text-field v-model="question.question" />
                  </v-col>
                  <v-col cols="4">
                    <v-text-field label="Point" rounded outlined v-model="question.points" />
                  </v-col>
                </v-row>
                <div class="ma-3" v-for="(ans,j) in question.answers" :key="j">
                  <v-checkbox label="Right Answer" v-model="ans.isRight" hide-details />
                  <v-row>
                    <v-col>
                      <v-text-field v-model="ans.answer" :label="`Option ${j+1}`" required />
                    </v-col>
                    <v-col>
                      <v-btn @click="removeAns(i,j)" fab color="red" dark>
                        <v-icon>mdi-minus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>
                <v-btn color="indigo" @click="addAns(i)" class="mx-1" dark>Add Answer</v-btn>
                <v-btn @click="removeQues(i)" color="red" dark>Remove Question</v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <v-btn large tile color="primary" class="mt-3" @click="addQues" dark>Add Question</v-btn>
      </v-card-text>
      <v-card-actions>
        <div>Total Points: {{totalPoints}}</div>
        <v-spacer></v-spacer>
        <div>
          <v-btn class="mx-1" large tile color="red" dark>Cancel</v-btn>
          <v-btn large tile color="success" dark @click="submitQuiz">Submit</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { db } from "@/firebase";
export default {
  props: {
    subJect: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      questions: {
        qsubject: "",
        created: new Date(),
        quizTitle: "",
        quizDescription: "",
        totalpoint: this.totalPoint,
        quizzes: [
          {
            question: "First Question",
            points: 50,

            answers: [
              {
                isRight: false,
                answer: "First answer",
              },
              {
                isRight: false,
                answer: "Second answer",
              },
              {
                isRight: false,
                answer: "Third answer",
              },
            ],
          },
        ],
      },
    };
  },
  firestore() {
    return {
      Quizzes: db.collection("quizzes"),
    };
  },
  methods: {
    removeAns(qi, pos) {
      this.questions.quizzes[qi].answers.splice(pos, 1);
    },
    removeQues(pos) {
      this.questions.quizzes.splice(pos, 1);
    },
    addAns(qi) {
      this.questions.quizzes[qi].answers.push({
        isRight: false,
        answer: "",
      });
    },
    addQues() {
      this.questions.quizzes.push({
        question: "Question Title",
        points: 1,
        answers: [
          {
            isRight: false,
            answer: "",
          },
        ],
      });
    },

    submitQuiz() {
      this.$firestore.Quizzes.add(this.questions)
        .then(() => {
          alert("Success");
          this.$router.replace("/practice");
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  computed: {
    totalPoints() {
      var totalPoint = 0;
      this.questions.quizzes.forEach((question) => {
        totalPoint += parseInt(question.points);
      });
      return totalPoint;
    },
  },
  watch: {
    subJect: {
      // Run as soon as the component loads
      immediate: true,
      handler() {
        this.questions.qsubject = this.subJect;
      },
    },
  },
};
</script>