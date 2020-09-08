<template>
  <v-col
    cols="12"
    xs="12"
    sm="12"
    md="8"
    xl="2"
    lg="2"
    class="flex-row-between-center entrybook-stats-container"
  >
    <div v-for="(value,key) in stats" :key="key" class="stats">
      <h1>{{ value }}</h1>
      <span>{{ key }}</span>
    </div>
  </v-col>
</template>

<script>
import "../../../assets/styles/index.css";
export default {
  name: "StatsCard",
  props: ["stats"]
};
</script>

<style scoped>
.entrybook-stats-container {
  padding: 0px;
  text-align: center;
}
</style>
