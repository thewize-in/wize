import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import { state } from './state';

const entrybook = {
  namespaced: true,
  state: { ...state },
  mutations: {
    ...mutations,
  },
  actions: { ...actions },
  getters: { ...getters },
};

export { entrybook };
