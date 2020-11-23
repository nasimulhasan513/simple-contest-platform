<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="info" dark large rounded v-bind="attrs" v-on="on" class="mt-5">Add Subject</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Subject Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="subjectName" label="Subject Name*" required></v-text-field>
                <v-text-field v-model="subClass" label="Class*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addSubject()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-col cols="12">
      <SubjectList :subjectslist="subjects" />
    </v-col>
  </v-row>
</template>


<script>
import { db } from "@/firebase";
import SubjectList from "@/components/SubjectList";
export default {
  components: {
    SubjectList,
  },
  data() {
    return {
      dialog: false,
      subjectName: "",
      subClass: "",
    };
  },
  firestore() {
    return {
      subjects: db.collection("subjects"),
    };
  },
  methods: {
    addSubject() {
      this.dialog = false;
      this.$firestore.subjects
        .add({
          subjectName: this.subjectName,
          subjectClass: this.subClass,
        })
        .then(() => {
          this.subjectName = "";
          this.subClass = "";
        });
    },
  },
};
</script>