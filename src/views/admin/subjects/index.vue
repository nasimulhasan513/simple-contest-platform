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
                <input type="file" @change="uploadImage" />

                <div v-if="image">
                  <v-btn @click="deleteImage" class="DeleteImage">
                    <v-icon>fa fa-trash-alt</v-icon>
                  </v-btn>
                  <v-img :src="image" width="250"></v-img>
                </div>
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
      <SubjectList :subjectslist="subjects" @deleteSub="deleteSubject"/>
    </v-col>
  </v-row>
</template>


<script>
import { db } from "@/firebase";
import firebase from "@/firebase";
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
      image: "",
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Avatar size should be less than 2 MB!",
      ],
    };
  },
  firestore() {
    return {
      subjects: db.collection("subjects"),
    };
  },
  methods: {
    deleteSubject(sub){
      console.log(sub);
      this.$firestore.subjects.doc(sub.id).delete()
      this.deleteImage(sub.subjecticon)
    },
    deleteImage(img) {
      let image = firebase.storage().refFromURL(img);

      image
        .delete()
        .then(function () {
          console.log("image deleted");
        })
        .catch(function (error) {
          // Uh-oh, an error occurred!
          console.log("an error occurred", error);
        });
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        console.log(file);
        var storageRef = firebase
          .storage()
          .ref("subjects/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (error) => {
            console.log(error);
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.image = downloadURL;
            });
          }
        );
      }
    },
    addSubject() {
      this.dialog = false;
      this.$firestore.subjects
        .add({
          subjectName: this.subjectName,
          subjectClass: this.subClass,
          subjecticon: this.image,
        })
        .then(() => {
          this.subjectName = "";
          this.subClass = "";
          this.image = "";
        });
    },
  },
};
</script>


<style lang="scss" scoped>
.deleteImage {
  position: relative;
}
</style>