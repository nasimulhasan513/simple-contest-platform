
<template>
  <v-footer id="dashboard-core-footer" class="mt-5">
    <v-container>
      <v-row align="center" no-gutters>
        <v-col
          v-for="(link, i) in links"
          :key="i"
          class="mx-auto text-center mb-sm-0 mb-5"
          cols="auto"
        >
          <v-btn :to="link.href" text v-text="link.text" />
        </v-col>

        <v-spacer class="hidden-sm-and-down" />
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "DashboardCoreFooter",

  data: () => ({
    links: [
      
      {
        href: "#",
        text: "About Us",
      },
      {
        href: "#",
        text: "Blog",
      },
    ],
  }),
};
</script>

<style lang="sass">
#dashboard-core-footer
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>

