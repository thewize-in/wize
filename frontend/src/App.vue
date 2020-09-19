<template>
  <v-app>
    <v-main class="v-main">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style scoped>
* {
  padding: 0px;
  margin: 0px;
  scroll-behavior: smooth;
}
</style>
