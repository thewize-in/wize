<template>
  <v-navigation-drawer v-model="drawer" fixed temporary app>
    <v-list-item>
      <v-row class="flex-row-start-center">
        <v-col cols="3" class="flex-row-center-center">
          <img src="../../assets/images/profile.svg" width="35" height="35" />
        </v-col>
        <v-col cols="7">Saud Chougle</v-col>
      </v-row>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense flat>
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          v-on:click="sendTo(item.to)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
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
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { routerMixin } from '../../mixins/routerMixin';
export default {
  name: 'Drawer',
  mixins: [routerMixin],
  data() {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home', to: '/' },
        { title: 'Settings', icon: 'mdi-cog-outline', to: '/settings' },
      ],
    };
  },
  methods: {
    ...mapActions(['updateDrawer', 'updateGroup']),

    logout() {
      window.location.href = 'http://192.168.43.215:3000/api/v1/auth/logout';
    },
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit('UPDATE_DRAWER', value);
      },
    },
    group: {
      get() {
        return this.$store.state.group;
      },
      set(value) {
        this.$store.commit('UPDATE_GROUP', value);
      },
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style></style>
