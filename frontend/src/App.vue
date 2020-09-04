<template>
  <v-app>
    <v-app-bar class="v-app-bar" flat app>
      <v-app-bar-nav-icon>
        <v-btn
          class="v-app-bar-icon-button flex-row-center-center"
          @click.stop="drawer=!drawer"
          fab
          outlined
        >
          <img src="./assets/images/profile.svg" width="20" height="20" alt="menu" />
        </v-btn>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <NewEntryDialog />
    </v-app-bar>
    <Drawer />

    <v-main class="v-main">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script >
import { mapGetters, mapState, mapActions } from "vuex";
import Drawer from "./components/ui/Drawer.vue";
import NewEntryDialog from "./components/ui/NewEntryDialog";
export default {
  name: "App",
  components: {
    Drawer,
    NewEntryDialog
  },
  methods: {
    ...mapActions(["updateDrawer"])
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit("UPDATE_DRAWER", value);
      }
    }
  }
};
</script>
<style>
* {
  padding: 0px;
  margin: 0px;
}
</style>
