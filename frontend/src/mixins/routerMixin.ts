import { vue } from "@/main";
import store from "@/store";

const routerMixin = {
  methods: {
    async sendTo(route: string): Promise<void> {
      try {
        await vue.$router.push(route);
      } catch (error) {
        return;
      }
    },
    goBack(): void {
      vue.$router.go(-1);
    },
    updateAppBar(value: boolean) {
      store.commit("ui/UPDATE_APP_BAR", value);
      store.commit("ui/UPDATE_NAV_BAR", false);
    }
  }
};
export { routerMixin };
