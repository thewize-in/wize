import { mapGetters } from 'vuex';
import { vue } from '@/main';

const snackbarMixin = {
  data() {
    return {
      timeout: 3000,
    };
  },
  computed: {
    ...mapGetters(['snackbar']),
    display: {
      get() {
        return vue.$store.state.snackbar.display;
      },
      set(value: boolean) {
        vue.$store.commit('UPDATE_SNACKBAR', {
          display: value,
          color: '',
          text: '',
        });
      },
    },
  },
};

export { snackbarMixin };
