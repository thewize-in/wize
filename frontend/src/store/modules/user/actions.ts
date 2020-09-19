import store, { apiVersion } from "@/store";
import Axios from "axios";

const actions = {
  async getUserProfile({ commit }: any): Promise<void> {
    const res = await Axios.get(`${apiVersion}/profile`, {
      withCredentials: true
    });
    if (res.status === 200) {
      store.dispatch("user/saveProfileToLocalStorage", res.data);
      commit("SET_PROFILE", res.data);
    }
  },

  saveProfileToLocalStorage({ commit }: any, data: any) {
    localStorage.setItem("profile", JSON.stringify(data));
  },
  async getProfileFromLocalStorage({ commit }: any): Promise<any> {
    const profile: string = localStorage.getItem("profile") as any;
    if (profile) {
      commit("SET_PROFILE", JSON.parse(profile));
    }
    return false;
  }
};

export { actions };
