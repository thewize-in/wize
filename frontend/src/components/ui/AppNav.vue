<template>
  <v-app-bar class="v-app-bar" flat app>
    <v-app-bar-nav-icon>
      <v-btn icon fab @click.stop="drawer = !drawer">
        <img :src="profile.profilePic" alt class="profile-pic" width="30" />
      </v-btn>
    </v-app-bar-nav-icon>

    <v-spacer></v-spacer>
    <v-btn icon @click="sendTo('/dr/settings')">
      <v-icon>mdi-cog-outline</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";
import { routerMixin } from "../../mixins/routerMixin";
export default {
  name: "AppNav",
  mixins: [routerMixin],
  computed: {
    ...mapGetters("user", ["profile"]),
    drawer: {
      get() {
        return this.$store.getters["ui/drawer"];
      },
      set(value) {
        this.$store.commit("ui/UPDATE_DRAWER", value);
      }
    }
  }
};
</script>

<style scoped>
.profile-pic {
  padding: 1px;
  border-radius: 50%;
  border: 2px solid var(--outline-color);
}
</style>
