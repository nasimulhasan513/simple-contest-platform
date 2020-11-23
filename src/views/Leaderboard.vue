<template>
<userLayouts>
  <div>

  <v-container class="mt-2">
    <v-row>
      <v-col cols="12" class="d-flex">
        <h1>Leaderboard</h1>
        <v-spacer></v-spacer>
        <div>
          <v-text-field
            class="searchField"
            append-icon="mdi-magnify"
            rounded
            outlined
            dense
            label="Search..."
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <hr />
    <br />
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead class="grey">
          <tr>
            <th class="text-left">Position</th>
            <th class="text-left">Name</th>

            <th class="text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p,i) in user" :key="p.id">
            <td>{{ i+1 }}</td>
            <td>{{ p.name }}</td>
            <td>{{ p.score }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
  </div></userLayouts>
</template>


<script>
import { db } from "@/firebase";
import userLayouts from '@/layouts/userLayouts'
export default {
  components:{
    userLayouts
  },
  firestore() {
    return {
      user: db.collection("user").orderBy("score", "desc"),
    };
  },
};
</script>

