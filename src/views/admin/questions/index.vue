<template>
  <div>
    <v-container id="regular-tables" fluid tag="section">
      <base-v-component heading="Simple Tables" link="components/simple-tables" />
      <v-spacer></v-spacer>
      <v-btn to="addquestion" rounded large class="info mb-3" style="left: 80%;">
        <v-icon>mdi-plus</v-icon>Add new
      </v-btn>
      <base-material-card icon="mdi-clipboard-text" title="Simple Table" class="px-5 py-3">
        <v-simple-table>
          <thead>
            <tr>
              <th class="primary--text">ID</th>
              <th class="primary--text">Title</th>
              <th class="primary--text">Subject</th>
              <th class="primary--text">Modify</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="question in questionList" :key="question.id">
              <td>{{question.id.substr(1,4)}}</td>
              <td>{{question.questionTitle}}</td>
              <td>{{question.subject}}</td>
              <td>
                <v-btn text>
                  <v-icon color="success">mdi-circle-edit-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </base-material-card>

      <div class="py-3" />
    </v-container>
  </div>
</template>

<script>
import MaterialCard from "@/components/base/MaterialCard.vue";
import VComponent from "@/components/base/VComponent";
import { db } from "@/firebase";
export default {
  components: {
    "base-material-card": MaterialCard,
    "base-v-component": VComponent,
  },
  firestore() {
    return {
      questionList: db.collection("shortQuestions"),
    };
  },
};
</script>
