<template>
  <v-row class="flex-row-start-center list">
    <v-col cols="10" xl="10" lg="10" md="10" sm="10">
      <div class="flex-row-between-center">
        <h3>{{ patient.name }}</h3>
        <v-icon v-if="index === 0" color="accent">mdi-circle-medium</v-icon>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'List',
  props: ['patient', 'index'],
};
</script>

<style scoped>
.list {
  width: 100%;
}
</style>
