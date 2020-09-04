<template>
  <v-col
    cols="12"
    xs="12"
    sm="8"
    md="6"
    lg="4"
    xl="4"
    class="flex-row-evenly-center entrybook-list-container"
  >
    <v-container>
      <v-row>
        <v-row align="center">
          <v-col class="d-flex" cols="6" sm="6">
            <v-select :items="items" label="Patient List" v-bind="$attrs" v-model="value" flat></v-select>
          </v-col>
        </v-row>
      </v-row>
      <v-row v-if="value === 'all'" class="patient-details-container">
        <PatientDetails v-for="patient in allPatients" :patient="patient" :key="patient.name" />
      </v-row>
      <v-row v-if="value === 'done'" class="patient-details-container">
        <PatientDetails v-for="patient in donePatients" :patient="patient" :key="patient.name" />
      </v-row>
      <v-row v-if="value === 'undone'" class="patient-details-container">
        <PatientDetails v-for="patient in undonePatients" :patient="patient" :key="patient.name" />
      </v-row>
    </v-container>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
import PatientDetails from "./components/PatientDetails.vue";
import Component from "vue-class-component";
import { mapGetters, mapActions } from "vuex";

@Component({
  components: {
    PatientDetails
  },
  computed: {
    ...mapGetters("entrybook", ["allPatients", "donePatients", "undonePatient"])
  }
})
export default class BasePatientList extends Vue {
  constructor() {
    super();
  }

  data() {
    return {
      value: "all",
      items: ["all", "done", "undone"]
    };
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  padding: 12px 0px !important;
}
.patient-details-container {
  max-height: 280px !important;
  overflow: hidden scroll;
  scroll-behavior: smooth;
  padding: 0px !important;
  margin: 0px !important;
}
</style>
