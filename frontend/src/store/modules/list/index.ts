import { actions } from './actions';
import { mutations } from './mutations';
import { state } from './state';
import { getters } from './getters';

const list = {
  namespaced: true,
  state: { ...state },
  mutations: {
    ...mutations,
  },
  actions: { ...actions },
  getters: { ...getters },
};

export { list };
