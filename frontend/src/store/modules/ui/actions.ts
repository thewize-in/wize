const actions = {
  displaySnackbarForSuccess({ commit }: any, message: string): void {
    commit("UPDATE_SNACKBAR", {
      display: true,
      color: "success",
      text: message
    });
  },
  displaySnackbarForFailure({ commit }: any, message: string): void {
    commit("UPDATE_SNACKBAR", {
      display: true,
      color: "error",
      text: message
    });
  },
  displaySnackbarForInfo({ commit }: any, message: string): void {
    commit("UPDATE_SNACKBAR", {
      display: true,
      color: "info",
      text: message
    });
  },
  updateBottomNav({ commit }: any, value: number) {
    commit("UPDATE_BOTTOM_NAV", value);
  }
};

export { actions };
