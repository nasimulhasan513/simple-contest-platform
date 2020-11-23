<template>
  <v-container>
    <h1>Subjects:</h1>
    <v-row v-for="(subject,i) in subjectslist" :key="i">
      <v-col>
        <router-link :to="`questions/${subject.subjectName}`" class="generalLink">
          <v-card>
            <v-card-title>
              {{subject.subjectName}}
              <v-spacer></v-spacer>
              <v-avatar color="info">10</v-avatar>
            </v-card-title>
            <v-card-subtitle>Class: {{subject.subjectClass}}</v-card-subtitle>
            <v-card-actions>
              <v-btn dark color="info">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn dark color="warning">
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
              <v-btn color="red" dark>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </router-link>
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
};
</script>
<style lang="scss" scoped>
.generalLink {
  text-decoration: none;
}
</style>
