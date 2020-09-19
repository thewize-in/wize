<template>
  <v-app-bar class="v-app-bar" flat app>
    <v-app-bar-nav-icon>
      <v-btn icon fab @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-app-bar-nav-icon>
    <v-toolbar-title>{{ name }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { routerMixin } from "../../mixins/routerMixin";
export default {
  name: "GoBack",
  props: ["name"],
  mixins: [routerMixin]
};
</script>

<style></style>
