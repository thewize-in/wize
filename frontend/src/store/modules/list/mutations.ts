const mutations = {
  IS_LIST_EXIST(state: any, value: boolean) {
    state.isCreated = value;
  },
  CREATE_NEW_LIST(state: any, value: boolean) {
    state.isCreated = value;
  },
  CLOSE_LIST(state: any, value: boolean) {
    state.isCreated = value;
  },
  GET_LIST(state: any, value: any) {
    state.stats = value.stats;
    state.allEntries = value.allEntries;
    state.doneEntries = value.doneEntries;
    state.undoneEntries = value.undoneEntries;
  },
};

export { mutations };
