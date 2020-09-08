import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import EntryBookPage from '../views/EntryBookPage.vue';
import DoctorSettingsPage from '../views/DoctorSettingsPage.vue';
import Home from '../views/Home.vue';
import Axios from 'axios';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/entrybook',
    name: 'EntryBookPage',
    component: EntryBookPage,
    meta: { requiresAuth: true, toBeDoctor: true },
  },
  {
    path: '/settings',
    name: 'DoctorSettingsPage',
    component: DoctorSettingsPage,
    meta: { requiresAuth: true, toBeDoctor: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user: any = await Axios.get('/auth/isLoggedIn');

    if (user.data.isAuthorize) {
      if (to.matched.some((record) => record.meta.toBeDoctor)) {
        const doctor: any = await Axios.get('/auth/isDoctor', {
          withCredentials: true,
        });

        if (doctor.data.isAuthorize) {
          next();
        } else {
          next('/login');
        }
      }
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
