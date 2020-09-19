import { mapGetters } from "vuex";
import store from "@/store";

const snackbarMixin = {
  data() {
    return {
      timeout: 2500
    };
  },
  computed: {
    ...mapGetters("ui", ["snackbar"]),
    display: {
      get() {
        return store.getters["ui/snackbar"].display;
      },
      set(value: boolean) {
        store.commit("ui/UPDATE_SNACKBAR", {
          display: value,
          text: ""
        });
      }
    }
  }
};

export { snackbarMixin };
