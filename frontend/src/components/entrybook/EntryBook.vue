<template>
  <v-row style="height: 75vh;">
    <v-col v-if="isCreated" class="main-entrybook-container">
      <v-row class="flex-row-center-center">
        <StatsCard :stats="stats" />
      </v-row>
      <v-row class="flex-row-center-center">
        <BasePatientList />
      </v-row>
      <v-row class="flex-row-center-center">
        <BaseNextEntry />
      </v-row>
    </v-col>
    <v-col v-else class="main-entry-container flex-column-center-center">
      <v-row class="flex-column-center-center">
        <img src="../../assets/images/alert.svg" width="35" height="35" alt />
        <h4>Create new entrybook</h4>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import "../../assets/styles/colors.css";
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import StatsCard from "../entrybook/components/StatsCard.vue";
import BasePatientList from "../patientlist/BasePatientList.vue";
import BaseNextEntry from "./components/BaseNextEntry.vue";
import { mapGetters } from "vuex";

const entrybook = namespace("entrybook");

interface StatsProps {
  total: number;
  current: number;
  done: number;
  undone: number;
}

@Component({
  components: {
    StatsCard,
    BasePatientList,
    BaseNextEntry
  },
  computed: {
    ...mapGetters("entrybook", [
      "stats",
      "allPatients",
      "donePatients",
      "undonePatients",
      "isCreated"
    ])
  }
})
export default class EntryBook extends Vue {}
</script>

<style scoped>
.main-entrybook-container {
  padding: 0px !important;
}
.entrybook-stats-container,
.entrybook-list-container,
.entrybook-next-container {
  background-color: var(--main-container);
}
h4 {
  text-align: center;
  color: var(--light-text-color);
}
</style>
