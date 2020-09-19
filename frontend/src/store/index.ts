import Vue from "vue";
import Vuex from "vuex";
import { entrybook } from "./modules/entrybook/index";
import { ui } from "./modules/ui";
import { user } from "./modules/user";

const apiVersion = "/api/v1";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    entrybook,
    ui
  }
});

export { apiVersion };
