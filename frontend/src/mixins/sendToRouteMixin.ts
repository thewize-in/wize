import { vue } from '@/main';

const sendToRouteMixin = {
  methods: {
    async sendTo(route: string): Promise<void> {
      try {
        await vue.$router.replace(route);
      } catch (error) {
        console.log('');
      }
    },
  },
};
export { sendToRouteMixin };
