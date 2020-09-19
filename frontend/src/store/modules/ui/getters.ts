const getters = {
  dialog: (state: any) => {
    return state.dialog;
  },
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
  bottomNav: (state: any) => {
    return state.bottomNav;
  },
  appBar: (state: any) => {
    return state.appBar;
  },
  navBar: (state: any) => {
    return state.navBar;
  }
};

export { getters };
