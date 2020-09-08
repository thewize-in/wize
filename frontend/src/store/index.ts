import Vue from 'vue';
import Vuex from 'vuex';
import { entrybook } from './modules/entrybook/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialog: false,
    drawer: false,
    group: null,
    selected: 'all',
  },
  mutations: {
    UPDATE_DRAWER(state: any, value: boolean) {
      state.drawer = value;
    },
    UPDATE_GROUP(state: any, value: boolean) {
      state.group = value;
    },
    UPDATE_DIALOG(state: any, value: boolean) {
      state.dialog = value;
    },
    UPDATE_SELECTED(state: any, value: string) {
      state.selected = value;
    },
  },
  actions: {},
  getters: {
    drawer: (state: any) => {
      return state.drawer;
    },
    group: (state: any) => {
      return state.group;
    },
    selected: (state: any) => {
      return state.selected;
    },
  },

  modules: {
    entrybook,
  },
});
