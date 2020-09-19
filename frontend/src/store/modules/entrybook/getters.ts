const getters = {
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
  }
};

export { getters };
