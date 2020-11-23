<template>
  <v-container>
    <h1>Subjects:</h1>
    <v-row v-for="(subject,i) in subjectslist" :key="i">
      <v-col>
       
          <v-card>
            <v-card-title>
              {{subject.subjectName}}
              <v-spacer></v-spacer>
              <v-avatar color="info">10</v-avatar>
            </v-card-title>
            <v-card-subtitle>Class: {{subject.subjectClass}}</v-card-subtitle>
            <v-card-actions>
              <v-btn to="/admin/questions/addquestions" dark color="info">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn dark color="warning">
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
              <v-btn @click="deleteSubject(subject)" color="red" dark>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    subjectslist: {
      required: true,
    },
  },
  methods:{
deleteSubject(sub){
  this.$emit('deleteSub', sub)
}
  }
};
</script>
<style lang="scss" scoped>
.generalLink {
  text-decoration: none;
}
</style>
