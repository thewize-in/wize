<template>
  <v-navigation-drawer v-model="drawer" fixed temporary app>
    <v-list-item>
      <v-row class="flex-row-start-center">
        <v-col cols="3" class="profile-container flex-row-start-start">
          <img :src="profile.profilePic" class="profile-pic" alt="profile" />
        </v-col>
        <v-col cols="12" class="flex-column-start-start">
          <div class="name-container">
            <span class="name">{{ profile.displayName }}</span>
          </div>
          <div class="email-container">
            <small class="email">{{ profile.email }}</small>
          </div>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense flat class="pa-2">
      <v-list-item-group>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          v-on:click="sendTo(item.to)"
        >
          <v-list-item-icon>
            <v-icon medium>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, index) in misc"
            :key="index"
            v-on:click="sendTo(item.to)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-on:click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { routerMixin } from "../../mixins/routerMixin";
export default {
  name: "Drawer",
  mixins: [routerMixin],

  data() {
    return {
      items: [
        {
          title: "Entrybook",
          icon: "mdi-notebook-outline",
          to: "/dr/entrybook"
        },
        { title: "Settings", icon: "mdi-cog-outline", to: "/dr/settings" }
      ],
      misc: [
        { title: "Guide", to: "/guide" },
        { title: "Contact Us", to: "/contactus" },
        { title: "About Us", to: "/aboutus" }
      ]
    };
  },
  computed: {
    ...mapGetters("user", ["profile"]),
    drawer: {
      get() {
        return this.$store.getters["ui/drawer"];
      },
      set(value) {
        this.$store.commit("ui/UPDATE_DRAWER", value);
      }
    },
    group: {
      get() {
        return this.$store.getters["ui/group"];
      },
      set(value) {
        this.$store.commit("ui/UPDATE_GROUP", value);
      }
    }
  },
  methods: {
    ...mapActions("ui", ["updateGroup"]),

    async logout() {
      localStorage.clear();
      window.location.href = "/api/v1/auth/logout";
    }
  },

  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>

<style scoped>
.profile-container {
  padding-bottom: 0px;
}
.profile-pic {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.2rem;
  padding: 0rem !important;
}
.name {
  font-weight: bold;
}
.email {
  color: var(--light-text-color);
}
</style>
