<template>
  <v-snackbar v-model="display" :color="snackbar.color" :timeout="timeout" flat app>
    {{ snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="display = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { snackbarMixin } from "../../mixins/ui/snackbarMixin";

export default {
  name: "Snackbar",
  mixins: [snackbarMixin]
};
</script>

