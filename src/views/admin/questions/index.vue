<template>
  <div>
    <v-container id="regular-tables" fluid tag="section">
      <base-v-component heading="Questions" />
      <v-spacer></v-spacer>
      <v-btn to="addquestion" rounded large class="info mb-3" style="left: 80%;">
        <v-icon>mdi-plus</v-icon>Add new
      </v-btn>
      <base-material-card icon="mdi-clipboard-text" title="Edit or add questions" class="px-5 py-3">
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
                <v-btn x-small @click="getUpdate(question)" text>
                  <v-icon color="success">mdi-circle-edit-outline</v-icon>
                </v-btn>
                <v-btn x-small text @click="deleteQuestion(question.id)">
                <v-icon color="error">mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </base-material-card>

      <div class="py-3" />

      <vs-dialog v-model="activedialog">
        <v-form class="ma-4" ref="form">
          <v-text-field label="Question Title" v-model="question.questionTitle" outlined />
          <!-- <v-textarea label="Questiion Description" v-model="questionDescription" outlined="" /> -->
          <quill-editor
            v-model="question.questionDescription"
            :options="editorOption"
            class="my-3 mb-7 QuillEditor"
            ref="editor"
          />
          <v-text-field
            shaped
            outlined
            v-model="question.psans"
            label="Enter Possible Short Answers"
            :counter="20"
            append-icon="mdi-plus"
            @keydown.tab.prevent="addpsans"
            @click:append="addpsans"
            required
          ></v-text-field>

          <div class="d-inline" v-for="(pans,i) in question.psanss" :key="i">
            <v-chip class="ml-1 mb-4">
              {{pans}}
              <span @click="DeleteOption(i)" class="red--text ml-1">&times;</span>
            </v-chip>
          </div>
          <v-text-field
            type="number"
            label="Points (min: 1- max: 5)"
            v-model="question.points"
            outlined
          />
          <v-btn @click="update(question.id)" class="mt-2 text-right" color="success" large tile>Update</v-btn>
        </v-form>
      </vs-dialog>
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
  data() {
    return {
      activedialog: false,
      questionTitle: "",
      psanss: "",
      psans: "",
      Points: null,
      questionDescription: "",
      question: "",
      editorOption: {
        // Some Quill options...
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            ["formula"],
          ],
        },
      },
    };
  },
  firestore() {
    return {
      questionList: db.collection("shortQuestions"),
    };
  },
  methods: {
    deleteQuestion(id){
      this.$firestore.questionList.doc(id).delete()

    },
    update(id) {
      this.$firestore.questionList.doc(id).update(this.question);
      this.activedialog = false;
    },
    getUpdate(question) {
      this.activedialog = true;
      this.id = question.id;
      this.question = question;
    },
    addpsans() {
      if (this.psans) {
        this.psanss.push(this.psans);
        this.psans = null;
      }
    },
    DeleteOption(i) {
      this.psanss.splice(i, 1);
    },
  },
};
</script>
