<template>
  <v-col
    cols="12"
    xl="6"
    lg="6"
    md="10"
    sm="12"
    xs="12"
    class="flex-row-evenly-center entrybook-list-container"
  >
    <v-row v-if="value === 'all'" class="patient-details-container">
      <PatientListTable :list="allPatients" />
    </v-row>
    <v-row v-if="value === 'done'" class="patient-details-container">
      <PatientListTable :list="donePatients" />
    </v-row>
    <v-row v-if="value === 'undone'" class="patient-details-container">
      <PatientListTable :list="undonePatients" />
    </v-row>
  </v-col>
</template>

<script>
import Axios from "axios";
import PatientListTable from "./components/PatientListTable.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BasePatientList",
  props: ["allPatients", "donePatients", "undonePatients"],
  components: {
    PatientListTable
  },
  data() {
    return {
      value: "all",
      items: ["all", "done", "undone"]
    };
  }
};
</script>

<style scoped>
.patient-details-container,
.entrybook-list-container {
  padding: 0px !important;
  margin: 0px !important;
}
</style>
