<template>
  <v-col cols="5" xl="5" lg="5" md="5" sm="5" class="card">
    <div class="icon flex-row-end-center">
      <v-icon color="accent">{{ icon }}</v-icon>
    </div>
    <div class="stats">
      <h1 style="font-size: 4em;">{{ stat }}</h1>
      <span class="card-name">{{ cardName }}</span>
    </div>
  </v-col>
</template>

<script>
import '../../../assets/styles/colors.css';
export default {
  name: 'DashCard',
  props: ['icon', 'cardName', 'stat'],
};
</script>

<style scoped>
.card {
  width: 45%;
}
.card-name {
  color: var(--light-text-color);
}
</style>
