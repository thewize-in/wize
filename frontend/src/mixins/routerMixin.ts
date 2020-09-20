import { vue } from '@/main';
import router from '@/router';

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
      vue.$router.go(-1);
    },
  },
};
export { routerMixin };
