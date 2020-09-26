const getters = {
  stats: (state: any) => {
    return state.stats;
  },
  allEntries: (state: any) => {
    return state.allEntries;
  },
  doneEntries: (state: any) => {
    return state.doneEntries;
  },
  undoneEntries: (state: any) => {
    return state.undoneEntries;
  },
  isCreated: (state: any) => {
    return state.isCreated;
  },
};

export { getters };
