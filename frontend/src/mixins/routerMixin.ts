import { vue } from '@/main';
import store from '@/store';

const routerMixin = {
  methods: {
    async sendTo(route: string): Promise<void> {
      try {
        store.commit('UPDATE_BOTTOM_NAV', route);
        await vue.$router.push(route);
      } catch (error) {
        return;
      }
    },
    async goBack(): Promise<void> {
      vue.$router.go(-1);
    },
    updateAppBar(value: boolean) {
      store.commit('UPDATE_APP_BAR', value);
    },
  },
};
export { routerMixin };
