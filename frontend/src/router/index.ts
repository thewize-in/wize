import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DoctorSettingsPage from '../views/DoctorSettingsPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import PatientListPage from '../views/PatientListPage.vue';
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
    path: '/settings',
    name: 'DoctorSettingsPage',
    component: DoctorSettingsPage,
    meta: { requiresAuth: true, toBeDoctor: true },
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage,
  },
  {
    path: '/patientlist',
    name: 'PatientListPage',
    component: PatientListPage,
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
