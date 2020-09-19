import store from "@/store";
import { mapActions } from "vuex";

const userProfileMixin = {
  async created() {
    const profile = await store.dispatch("user/getProfileFromLocalStorage");
    if (!profile) {
      await store.dispatch("user/getUserProfile");
    }
  }
};

export { userProfileMixin };
