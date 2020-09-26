import { vue } from '@/main';
import router from '@/router';
import store from '@/store';

const routerMixin = {
  methods: {
    async sendTo(route: string): Promise<void> {
      try {
        await router.push(route);
      } catch (error) {
        return;
      }
    },
    goBack(): void {
      store.commit('ui/UPDATE_DRAWER', false);
      vue.$router.go(-1);
    },
  },
};
export { routerMixin };
