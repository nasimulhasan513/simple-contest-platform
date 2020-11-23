<template>
  <userLayouts>
    <v-container>
      <div class="Subjects px-3">
        <vs-row justify="space-between">
          <vs-col w="3" lg="3" sm="6" xs="12" class="ma-3" v-for="(sub,i) in subjects" :key="i">
            <router-link style="text-decoration:none" to="/">
              <vs-card>
                <template #title>
                  <h3>{{sub.subjectName}}</h3>
                </template>
                <template #img>
                  <img :src="sub.subjecticon" class="SubejctsLogo" alt />
                </template>
                <template #text>
                  <p>Explore the magic of {{sub.subjectName}}</p>
                </template>
                <template #interactions>
                  <vs-button danger icon>
                    <i class="bx bx-heart"></i>
                  </vs-button>
                  <vs-button class="btn-chat" shadow primary>
                    <i class="bx bx-chat"></i>
                    <span class="span">{{sub.subjectName}}</span>
                  </vs-button>
                </template>
              </vs-card>
            </router-link>
          </vs-col>
        </vs-row>
      </div>
    </v-container>
  </userLayouts>
</template>
<script>
import userLayouts from "@/layouts/userLayouts";
import { db } from "@/firebase";
export default {
  components: {
    userLayouts,
  },
  firestore() {
    return {
      subjects: db.collection("subjects"),
    };
  },
};
</script>


<style scoped>
.SubejctsLogo {
  max-width: 200px !important;
  padding: 20px !important;
}
.Subjects {
  border-radius: 30px;
  background: #f4f7f8;
}
</style>