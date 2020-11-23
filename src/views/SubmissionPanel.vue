<template>
<userLayouts>
  <v-container>
    <v-container id="regular-tables" fluid tag="section">
      <base-v-component heading="Submissions" link="#" />

      <base-material-card icon="mdi-clipboard-text" title="Submission Table" class="px-5 py-3">
        <v-simple-table>
          <thead>
            <tr>
              <th class="primary--text">ID</th>
              <th class="primary--text">Name</th>
              <th class="primary--text">Time</th>
              <th class="primary--text">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="submission in submissions" :key="submission.id">
              <td>{{submission.id.substr(1,4)}}</td>
              <td>{{submission.name}}</td>
              <td>{{ submission.time | moment("from", "now")}}</td>
              <td>
                <div v-if="submission.status" class="success--text">
                  Correct
                  <v-icon small color="success">fa fa-check-circle</v-icon>
                </div>
                <div v-else class="error--text">
                  Wrong Answer
                  <v-icon small color="error">fa fa-times</v-icon>
                </div>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </base-material-card>
      <div class="py-3" />
    </v-container>
  </v-container></userLayouts>
</template>

<script>
import { db } from "@/firebase";
import MaterialCard from "@/components/base/MaterialCard.vue";
import VComponent from "../components/base/VComponent.vue";
import userLayouts from '@/layouts/userLayouts'
export default {
  components: {
    "base-material-card": MaterialCard,
    "base-v-component": VComponent,
    userLayouts
  },
  firestore() {
    return {
      submissions: db.collection("submissions").orderBy('time','desc'),
    };
  },
};
</script>
