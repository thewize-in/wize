const mutations = {
  IS_ENTRYBOOK_EXIST(state: any, value: boolean) {
    state.isCreated = value;
  },
  CREATE_NEW_ENTRYBOOK(state: any, value: boolean) {
    state.isCreated = value;
  },
  DELETE_CREATED_ENTRYBOOK(state: any, value: boolean) {
    state.isCreated = value;
  },
  GET_ENTRYBOOK(state: any, value: any) {
    state.stats = value.stats;
    state.allPatients = value.allPatients;
    state.donePatients = value.donePatients;
    state.undonePatients = value.undonePatients;
  }
};

export { mutations };
