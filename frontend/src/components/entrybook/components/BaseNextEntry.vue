<template>
  <v-col
    cols="12"
    xs="12"
    sm="8"
    md="6"
    lg="4"
    xl="4"
    class="flex-row-evenly-center entrybook-next-container"
  >
    <v-container class="main-container">
      <v-row class="flex-column-center-center next-entry-container">
        <v-col cols="12" class="done-container">Done</v-col>
        <v-row>
          <v-col cols="8" class="flex-row-start-center">
            <DoneRadioBox />
          </v-col>

          <v-col cols="4">
            <v-btn depressed color="primary" medium>next</v-btn>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DoneRadioBox from "./DoneRadioBox.vue";
import "../../../assets/styles/colors.css";

@Component({
  components: {
    DoneRadioBox
  }
})
export default class BaseNexEntry extends Vue {}
</script>

<style scoped>
.next-entry-container {
  border: 1px solid var(--outline-color) !important;
  border-radius: 9px;
  background-color: #fff;
  padding: 0px;
}
.main-container {
  padding: 0px 12px;
}

.done-container {
  color: var(--light-text-color);
  font-size: 14px;
  padding: 10px 10px 0px 10px;
}
</style>
