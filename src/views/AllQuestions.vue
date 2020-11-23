<template><userLayouts>
  <v-container>
    <v-row class="px-5">
      <v-col cols="12" v-for="(question,i) in questions" :key="i">
        <v-card tile elevation="3" rounded="5" class="QuestionCard pa-4" :to="'questions/'+question.slug">
          <v-card-text>
            <h2 class="heading questionTitle">{{question.questionTitle}}</h2>
            <v-spacer></v-spacer>
            <span class="primary--text">Score: {{question.points}}</span>
            <v-chip
              class="success difficultyLevel"
              v-if="question.difficulty == 'Easy'"
            >{{question.difficulty}}</v-chip>
            <v-chip
              class="primary difficultyLevel"
              v-if="question.difficulty == 'Medium'"
            >{{question.difficulty}}</v-chip>
            <v-chip
              class="error difficultyLevel"
              v-if="question.difficulty == 'Hard'"
            >{{question.difficulty}}</v-chip>
   </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </v-container></userLayouts>
</template>
<script>
import { db } from "@/firebase";
import userLayouts from '@/layouts/userLayouts'
export default {
  components:{
    userLayouts
  },
  data() {
    return {
      Questions: null,
    };
  },
  firestore() {
    return {
      questions: db.collection("shortQuestions"),
    };
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@500&display=swap');
.difficultyLevel {
  right: 10px;
  float: right;
  top: 1px;
}
.questionTitle{
  font-weight: 200;
  font-family: 'Baloo Da 2', cursive;
  color: black;
}
.QuestionCard{
  border-left: 5px solid rgb(44, 100, 219);
  border-radius: 10px!important;
}
</style>