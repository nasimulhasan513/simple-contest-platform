<template>
  <userLayouts>
    <v-container class="mt-5">
      <SingleQuestion
        v-if="singleQuestion.length!==0"
        :id="singleQuestion[0].id"
        :questionTitle="singleQuestion[0].questionTitle"
        :questionDescription="singleQuestion[0].questionDescription"
        :answer="singleQuestion[0].psanss"
        :point="singleQuestion[0].points"
      />
      <v-sheet v-else>
        <v-skeleton-loader class="mx-auto" type="card" boilerplate></v-skeleton-loader>
      </v-sheet>
    </v-container>
  </userLayouts>
</template>

<script>
import userLayouts from "@/layouts/userLayouts";
import SingleQuestion from "@/components/SingleQuestion.vue";
import { db } from "@/firebase";
export default {
  components: {
    SingleQuestion,
    userLayouts,
  },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  firestore() {
    return {
      singleQuestion: db
        .collection("shortQuestions")
        .where("slug", "==", this.id),
    };
  },
};
</script>