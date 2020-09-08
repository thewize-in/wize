<template>
  <v-container>
    <v-row class="flex-row-center-center">
      <v-col cols="12" class="flex-row-center-center">
        <v-btn medium color="primary" @click="login">Login</v-btn>
        <v-btn medium color="error" @click="logout">Logout</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  methods: {
    login() {
      window.location.href = "http://192.168.43.215:3000/api/v1/auth/login";
    },
    logout() {
      window.location.href = "http://192.168.43.215:3000/api/v1/auth/logout";
    }
  }
};
</script>

<style>
</style>