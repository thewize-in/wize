import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { state } from "./state";

const user = {
  namespaced: true,
  state: { ...state },
  mutations: {
    ...mutations
  },
  actions: { ...actions },
  getters: { ...getters }
};

export { user };
