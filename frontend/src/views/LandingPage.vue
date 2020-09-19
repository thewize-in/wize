<template>
  <v-app>
    <v-row style="height: 100vh;">
      <v-col cols="12" class="flex-column-between-center" style="height: 90%;">
        <v-col cols="12" class="flex-row-center-center">
          <h1>Wize</h1>
        </v-col>
        <v-col
          cols="12"
          xl="4"
          lg="4"
          class="flex-column-center-center image-wrapper"
          style="height: 50%;"
        >
          <v-img src="../assets/images/doctor.jpg"></v-img>
          <v-btn color="secondary" large @click="install">Get the app</v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "LandingPage",
  created() {
    this.$store.commit("ui/UPDATE_APP_BAR", false);
  },
  methods: {
    install() {
      const deferredPrompt = null;
      window.addEventListener("beforeinstallprompt", e => {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.icon-container {
  padding-right: 0.5rem;
}
.icon {
  background-color: var(--main-color);
  padding: 0.3rem;
  border-radius: 50%;
}
</style>
