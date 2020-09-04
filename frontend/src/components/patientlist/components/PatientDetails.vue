<template>
  <v-row align="center" class="main">
    <v-row>
      <v-col cols="12" class="d-flex patient-details">
        <v-col cols="1" class="flex-row-start-center profile">
          <img src="../../../assets/images/profile.svg" width="15" alt />
        </v-col>
        <v-col cols="10" class="name flex-row-center-center">{{patient.name}}</v-col>
        <v-col cols="1" class="number flex-row-center-center">
          <h2>{{patient.number}}</h2>
        </v-col>
      </v-col>
    </v-row>
  </v-row>
</template>

<script lang="ts">
import "../../../assets/styles/colors.css";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PatientDetails extends Vue {
  @Prop()
  patient!: {
    name: string;
    number: string | number;
  };
  constructor() {
    super();
  }
}
</script>

<style scoped>
.patient-details {
  background-color: var(--white-color) !important;
  border-radius: 9px;
  border: 1px solid var(--outline-color) !important;
  padding: 10px;
}

.profile,
.name,
.number {
  padding: 0px;
  margin: 0px;
}

.name {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-justify: initial;
  font-size: 16px;
  text-overflow: fade(5%);
  margin: 0px;
}
.main {
  padding: 3px 12px !important;
}
</style>