import Vue from 'vue';
import Vuex from 'vuex';
import { entrybook } from './modules/entrybook/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialog: false,
    drawer: false,
    group: null,
    settings: true,
    selected: 'all',
    snackbar: {
      display: false,
      color: '',
      text: '',
    },
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
    UPDATE_SETTINGS(state: any, value: boolean) {
      state.settings = value;
    },
    UPDATE_SNACKBAR(state: any, value: any) {
      state.snackbar = { ...value, timeout: 3000 };
    },
  },
  actions: {
    displaySnackbarForSuccess({ commit }, message: string): void {
      commit('UPDATE_SNACKBAR', {
        display: true,
        color: 'success',
        text: message,
      });
    },
    displaySnackbarForFailure({ commit }, message: string): void {
      commit('UPDATE_SNACKBAR', {
        display: true,
        color: 'error',
        text: message,
      });
    },
  },
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
    settings: (state: any) => {
      return state.settings;
    },
    snackbar: (state: any) => {
      return state.snackbar;
    },
  },

  modules: {
    entrybook,
  },
});
