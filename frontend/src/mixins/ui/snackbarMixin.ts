import { mapGetters } from 'vuex';
import store from '@/store';

const snackbarMixin = {
  data() {
    return {
      timeout: 2500,
    };
  },
  computed: {
    ...mapGetters(['snackbar']),
    display: {
      get() {
        return store.state.snackbar.display;
      },
      set(value: boolean) {
        store.commit('UPDATE_SNACKBAR', {
          display: value,
          color: '',
          text: '',
        });
      },
    },
  },
};

export { snackbarMixin };
