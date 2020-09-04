<template>
  <v-col
    cols="12"
    xs="12"
    sm="8"
    md="6"
    lg="4"
    xl="4"
    class="flex-row-evenly-center entrybook-stats-container"
  >
    <v-card
      v-for="(value,key) in stats"
      :key="key"
      class="v-card flex-column-center-center"
      width="70"
      outlined
    >
      <div class="stats">
        <h1>{{ value }}</h1>
        <p>{{ key }}</p>
      </div>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import "../../../assets/styles/index.css";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class StatsCard extends Vue {
  @Prop()
  stats!: [];
  constructor() {
    super();
  }
}
</script>

<style scoped>
.entrybook-stats-container {
  padding: 0px;
  background-color: var(--main-color);
}
.v-card {
  width: 22% !important;
  height: 90px;
  border-radius: 9px;
  color: #061131;
  background-color: var(--white-color);
}
h1,
p {
  padding: 0px;
  margin: 0px;
  width: 100%;
}
h1 {
  font-size: 32px;
}
p {
  font-size: 14px;
  color: #b3b4c8;
  font-weight: 400;
}

.stats {
  text-align: center;
}
</style>
