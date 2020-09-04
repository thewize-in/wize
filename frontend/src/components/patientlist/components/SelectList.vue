<template>
  <v-row align="center">
    <v-col class="d-flex" cols="6" sm="6">
      <v-select :items="items" label="Patient List" value="all" flat></v-select>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class SelectList extends Vue {
  data() {
    return {
      items: ['all', 'done', 'undone'],
    };
  }
}
</script>

<style scoped>
.row {
  width: 100% !important;
}
</style>
