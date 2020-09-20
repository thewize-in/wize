const mutations = {
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
  UPDATE_BOTTOM_NAV(state: any, value: any) {
    state.bottomNav = value;
  },
};
export { mutations };
