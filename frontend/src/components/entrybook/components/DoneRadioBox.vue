<template>
  <v-row class="flex-row-center-center">
    <v-radio-group v-model="isDone" row>
      <v-radio label="Yes" :value="yes"></v-radio>
      <v-radio label="No" :value="no"></v-radio>
    </v-radio-group>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class DoneRadioBox extends Vue {
  data() {
    return {
      yes: true,
      no: false,
      isDone: true,
    };
  }
}
</script>

<style scoped></style>
