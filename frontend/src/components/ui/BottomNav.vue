<template>
  <v-bottom-navigation color="primary" :value="bottomNav" horizontal fixed grow shift>
    <v-btn @click="sendTo('/dashboard')" value="dashboard">
      <span>dashboard</span>
      <v-icon>mdi-view-dashboard-outline</v-icon>
    </v-btn>

    <v-btn @click="sendTo('/patientlist')" value="patientlist">
      <span>list</span>
      <v-icon>mdi-format-list-numbered</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters } from "vuex";
import "../../assets/styles/colors.css";
import { routerMixin } from "../../mixins/routerMixin";
export default {
  name: "BottomNav",
  mixins: [routerMixin],

  computed: {
    bottomNav: {
      get() {
        return this.$store.state.bottomNav;
      },
      set(value) {
        this.$store.commit("UPDATE_BOTTOM_NAV", value);
      }
    }
  }
};
</script>

<style scoped>
.v-icon {
  margin: 0px !important;
}
.v-btn {
  height: 100% !important;
}
.v-bottom-navigation {
  box-shadow: none !important;
  border-top: 1px solid var(--outline-color) !important;
}
.v-btn__content {
  height: 100% !important;
  align-content: space-around;
}
</style>
