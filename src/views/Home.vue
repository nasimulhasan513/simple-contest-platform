<template>
  <userLayouts>
    <v-parallax class="heroSection" src="../assets/images/homebg.jpg">
      <v-container>
        <v-row>
          <v-col cols="6" md="6" sm="12">
            <vs-row class="mt-8 pa-3">
              <vs-col w="4" lg="4" sm="6" xs="12" class="ma-3">
                <vs-card>
                  <template #title>
                    <h3>Pot with a plant</h3>
                  </template>
                  <template #img>
                    <img class="SubejctsLogo" src="@/assets/icons/atom.png" alt />
                  </template>
                  <template #interactions>
                    <vs-button danger icon>
                      <i class="bx bx-heart"></i>
                    </vs-button>
                    <vs-button class="btn-chat" shadow primary>
                      <i class="bx bx-chat"></i>
                      <span class="span">Physics</span>
                    </vs-button>
                  </template>
                </vs-card>
              </vs-col>
              <vs-col w="4" lg="4" sm="6" xs="12" class="ma-3">
                <vs-card>
                  <template #title>
                    <h3>Pot with a plant</h3>
                  </template>
                  <template #img>
                    <img class="SubejctsLogo" src="@/assets/icons/formula.png" alt />
                  </template>
                  <template #interactions>
                    <vs-button danger icon>
                      <i class="bx bx-heart"></i>
                    </vs-button>
                    <vs-button class="btn-chat" shadow warn>
                      <i class="bx bx-chat"></i>
                      <span class="span">Math</span>
                    </vs-button>
                  </template>
                </vs-card>
              </vs-col>
            </vs-row>
          </v-col>
          <v-col class="hidden-md-and-down">
            <v-img class="leftImage ma-10" src="@/assets/images/herohome.png"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </userLayouts>
</template>
<script>
import { db } from "@/firebase";
import userLayouts from "@/layouts/userLayouts";
export default {
  components: {
    userLayouts,
  },
  firestore() {
    return {
      user: db.collection("user"),
    };
  },
  methods: {},
};
</script>


<style lang="scss" scoped>
.heroSection {
  height: 90vh;
  margin-top: -20px;
}
.leftImage {
  width: 400px;
}

.SubejctsLogo {
  max-width: 200px;
  padding: 25px;
}
</style>