import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const ui = {
  namespaced: true,
  state: { ...state },
  mutations: {
    ...mutations
  },
  actions: { ...actions },
  getters: { ...getters }
};

export { ui };
