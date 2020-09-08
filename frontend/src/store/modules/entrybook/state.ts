export interface State {
  stats: {
    total: number;
    current: number;
  };
  allPatients: [];
  donePatients: [];
  undonePatients: [];
  isCreated: boolean;
}

const state = {
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
};

export { state };
