<template>
  <div>
    <form>
      <v-select
        v-model="select"
        :items="types"
        @change="QuestionType"
        :rules="[v => !!v || 'Question Type is required']"
        label="Question Type"
        required
      ></v-select>
      <v-select
        v-model="subject"
        @click="getSubjects()"
        :items="availableSubjects"
        label="Subject"
        required
      ></v-select>
      <v-select v-model="difficulty" :items="difficultyLevels" label="Difficulty Level"></v-select>
    </form>
    <AddQuizQuestion v-if="type == 'Quiz'" :subJect="subject" />
    <v-form ref="form" v-if="type === 'Short Question'">
      <v-text-field label="Question Title" v-model="questionTitle" outlined />
      <!-- <v-textarea label="Questiion Description" v-model="questionDescription" outlined="" /> -->
      <quill-editor
        v-model="questionDescription"
        :options="editorOption"
        class="my-3 mb-7 QuillEditor"
        ref="editor" />
      <v-text-field
        shaped
        outlined
        v-model="psans"
        label="Enter Possible Short Answers"
        :counter="20"
        append-icon="mdi-plus"
        @keydown.tab.prevent="addpsans"
        required
      ></v-text-field>

      <div class="d-inline" v-for="(pans,i) in psanss" :key="i">
        <v-chip class="ml-1 mb-4">
          {{pans}}
          <span @click="DeleteOption(i)" class="red--text ml-1">&times;</span>
        </v-chip>
      </div>
      <v-text-field type="number" label="Points (min: 1- max: 5)" v-model="Points" outlined />
      <v-btn @click="submit" class="mt-2" color="success" large tile>Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import AddQuizQuestion from "@/components/admin/AddQuizQuestion";
import { db } from "@/firebase";
import katex from 'katex';
import 'katex/dist/katex.min.css';
export default {
  components: {
    AddQuizQuestion,
  },
  data() {
    return {
      types: ["Quiz", "Short Question", "Fill in The blnks"],
      difficultyLevels: ["Easy", "Medium", "Hard"],
      difficulty: "",
      type: "",
      select: null,
      psans: null,
      psanss: [],
      subject: "",
      questionTitle: "",
      questionDescription: "",
      availableSubjects: [],
      Points: 0,
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
  layout: "adminLayout",
  firestore() {
    return {
      subjects: db.collection("subjects"),
      shortQuestions: db.collection("shortQuestions"),
    };
  },

  methods: {
    QuestionType() {
      this.type = this.select;
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
    getSubjects() {
      // console.log("hello");
      this.subjects.forEach((subject) => {
        this.availableSubjects.push(subject.subjectName);
      });
    },
    sanitizeTitle(title) {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
      // Letter "d"
      slug = slug.replace(/đ/gi, "d");
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, "");
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, "-");

      return slug;
    },
    submit() {
      let ShortQuestion = {
        slug: String(this.shortQuestions.length + 1),
        created: new Date(),
        psanss: this.psanss,
        subject: this.subject,
        difficulty: this.difficulty,
        questionTitle: this.questionTitle,
        questionDescription: this.questionDescription,
        points: this.Points,
      };
      this.$firestore.shortQuestions
        .add(ShortQuestion)
        .then(() => {
          alert("added");
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
  mounted() {
      
    window.katex = katex;
    },
};
</script>

<style lang="scss" scoped>

.QuillEditor{
  min-height: 200px;
  max-height: 400px;
  overflow: auto;
  border-radius: 5px;
}
</style>
