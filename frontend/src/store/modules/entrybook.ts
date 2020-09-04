const entrybook = {
  namespaced: true,
  state: {
    stats: {
      total: 0,
      current: 0,
      done: 0,
      undone: 0,
    },
    allPatients: [],
    donePatients: [],
    undonePatients: [],
    isCreated: false,
  },
  mutations: {
    CREATE_NEW_ENTRYBOOK(state: any, value: boolean) {
      state.isCreated = value;
    },
    DELETE_CREATED_ENTRYBOOK(state: any, value: boolean) {
      state.isCreated = value;
    },
    CREATE_NEW_ENTRY(state: any, value: any) {
      const totalPatients = state.allPatients.length;
      value['number'] = totalPatients + 1;
      state.allPatients.push(value);
      state.stats.total = state.allPatients.length;
    },
  },
  actions: {
    createNewEntryBook({ commit }: any) {
      commit('CREATE_NEW_ENTRYBOOK', true);
    },
    deleteCreatedEntryBook({ commit }: any) {
      commit('DELETE_CREATED_ENTRYBOOK', false);
    },
    createNewEntry({ commit }: any, entry: any) {
      commit('CREATE_NEW_ENTRY', entry);
    },
  },
  getters: {
    stats: (state: any) => {
      return state.stats;
    },
    allPatients: (state: any) => {
      return state.allPatients;
    },
    donePatients: (state: any) => {
      return state.donePatients;
    },
    undonePatients: (state: any) => {
      return state.undonePatients;
    },
    isCreated: (state: any) => {
      return state.isCreated;
    },
  },
};

export { entrybook };
