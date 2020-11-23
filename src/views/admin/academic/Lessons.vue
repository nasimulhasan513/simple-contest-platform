<template>
  <v-container>
    <div class="text-center my-2">
      <v-btn @click="open" large rounded color="success" outlined dark>
        <v-icon>mdi-plus</v-icon>Add Lessons
      </v-btn>
    </div>

    <vs-dialog v-model="active">
      <div class="text-center ma-2 pa-2">
        <h2 class="mb-3">{{stats != 'edit' ? "Add a new Chapter" : "Edit lesson"}}</h2>
        <v-text-field v-model="chapterSerial" outlined dense label="Serial" />
        <v-text-field v-model="chapterName" outlined dense label="Name" />
        <v-btn @click="addChapter" x-large rounded color="success">Add</v-btn>
      </div>
    </vs-dialog>
    <v-list to="#">
      <v-card>
        <v-list-item>
          <v-list-item-content v-if="subjects.lessons">
            <v-list-item-title v-for="lesson in subjects.lessons" :key="lesson.serial">
              <div class="heading display-1">{{lesson.chapter}}</div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="editLesson(lesson)" color="primary">edit</v-btn>
                <v-btn color="error">delete</v-btn>
              </v-card-actions>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-list>
  </v-container>
</template>

<script>
import { db } from "@/firebase";
import firebase from "@/firebase";
export default {
  props: ["id"],
  data() {
    return {
      active: false,
      stats: "",
      chapterName: "",
      chapterSerial: null,
    };
  },
  firestore() {
    return {
      subjects: db.collection("subjects").doc(this.$route.params.subject),
    };
  },
  methods: {
     open(){
      this.active = true;
      this.stats = "add";
    },
    addChapter() {
      this.stats = "Add a new Chapter";
      this.$firestore.subjects
        .update({
          lessons: firebase.firestore.FieldValue.arrayUnion({
            chapter: this.chapterName,
            serial: this.chapterSerial,
          }),
        })
        .then(() => {
          this.active = false;
        });
    },
    editLesson(lesson) {
      this.active = true;
      this.stats = "edit";
      console.log(lesson);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>