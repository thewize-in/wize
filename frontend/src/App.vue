<template>
  <v-app>
    <v-app-bar v-if="appBar" class="v-app-bar" flat app>
      <v-app-bar-nav-icon>
        <v-btn icon fab @click.stop="drawer = !drawer">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-btn icon @click="sendTo('/settings')">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar v-else class="v-app-bar" flat app>
      <v-app-bar-nav-icon>
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
    </v-app-bar>
    <Drawer />
    <v-main class="v-main">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <BottomNav v-if="appBar" />
  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import Drawer from "./components/ui/Drawer.vue";
import BottomNav from "./components/ui/BottomNav.vue";
import { routerMixin } from "./mixins/routerMixin";
export default {
  name: "App",
  mixins: [routerMixin],
  data() {
    return {};
  },
  components: {
    Drawer,
    BottomNav
  },
  methods: {
    ...mapActions(["updateDrawer"])
  },
  computed: {
    ...mapGetters(["settings", "appBar"]),
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
<style scoped>
* {
  padding: 0px;
  margin: 0px;
}
</style>
