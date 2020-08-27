<template>
  <v-container id="regular-tables" fluid tag="section">
    <base-v-component heading="All Users" link="components/simple-tables" />

    <base-material-card icon="mdi-clipboard-text" title="User Table" class="px-5 py-3">
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">ID</th>
            <th class="primary--text">Name</th>
            <th class="primary--text">Score</th>
            <th class="primary--text">Submission</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="u in user" :key="u.id">
            <td>{{u.id}}</td>
            <td>{{u.name}}</td>
            <td>{{u.score}}</td>
            <td> {{u.solved.length}} / {{u.unsolved ? u.unsolved.length : 0}}</td>
          </tr>
          
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />
  </v-container>
</template>

<script>
import MaterialCard from "@/components/base/MaterialCard.vue";
import VComponent from "@/components/base/VComponent";
import {db} from '@/firebase'
export default {
  components: {
    "base-material-card": MaterialCard,
    "base-v-component": VComponent,
  },
  firestore(){
    return {
      user: db.collection('user')
    }
  }
};
</script>
