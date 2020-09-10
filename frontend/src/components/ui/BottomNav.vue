<template>
  <v-bottom-navigation
    :value="activeBtn"
    v-model="activeBtn"
    color="primary"
    horizontal
    fixed
    minHeight="56"
    max-height="66"
    grow
    shift
    app
  >
    <v-btn @click="sendTo('/dashboard')">
      <span>dashboard</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn @click="sendTo('/patientlist')">
      <span>list</span>
      <v-icon>mdi-format-list-numbered</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import "../../assets/styles/colors.css";
import { sendToRouteMixin } from "../../mixins/sendToRouteMixin";
export default {
  name: "BottomNav",
  mixins: [sendToRouteMixin],
  data() {
    return {
      activeBtn: 0
    };
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
</style>
