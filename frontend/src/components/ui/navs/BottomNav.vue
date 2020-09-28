<template>
  <v-bottom-navigation
    color="primary"
    v-model="bottomNav"
    vertical
    fixed
    grow
    app
  >
    <v-btn text @click="sendTo('/dr/dashboard')">
      <span>dashboard</span>
      <v-icon>mdi-view-dashboard-outline</v-icon>
    </v-btn>
    <v-btn text @click="sendTo('/dr/patientlist')">
      <span>list</span>
      <v-icon>mdi-format-list-numbered</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { routerMixin } from "../../../mixins/routerMixin";
export default {
  name: "BottomNav",
  mixins: [routerMixin],
  computed: {
    bottomNav: {
      get() {
        return this.$store.getters["ui/bottomNav"];
      },
      set(value) {
        this.$store.commit("ui/UPDATE_BOTTOM_NAV", value);
      }
    }
  }
};
</script>

<style scoped>
.v-icon {
  margin: 0px !important;
}
.v-bottom-navigation .v-btn {
  height: 100% !important;
}
.v-bottom-navigation {
  box-shadow: none !important;
  border-top: 1px solid var(--outline-color) !important;
}
</style>