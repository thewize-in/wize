import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DoctorSettingsPage from '../views/DoctorSettingsPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import PatientListPage from '../views/PatientListPage.vue';
import SignInPage from '../views/SignInPage.vue';
import DoctorApp from '../DoctorApp.vue';
import Axios from 'axios';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'LandingPage',
    component: SignInPage,
  },
  {
    path: '/contactus',
    name: 'ContactUs',
    component: () => import('../views/ContactUs.vue'),
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('../views/Guide.vue'),
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: () => import('../views/AboutUs.vue'),
  },
  {
    path: '/login',
    name: 'SignInPage',
    component: SignInPage,
  },
  {
    path: '/dr',
    name: 'DoctorApp',
    component: DoctorApp,
    children: [
      {
        path: 'settings',
        name: 'DoctorSettingsPage',
        component: DoctorSettingsPage,
        meta: { requiresAuth: true, toBeDoctor: true },
      },
      {
        path: 'dashboard',
        name: 'DashboardPage',
        component: DashboardPage,
        meta: { requiresAuth: true, toBeDoctor: true },
      },
      {
        path: 'patientlist',
        name: 'PatientListPage',
        component: PatientListPage,
        meta: { requiresAuth: true, toBeDoctor: true },
      },
    ],
  },
  {
    path: '/servererror',
    name: 'ServerErrorPage',
    component: () => import('../views/error/ServerErrorPage.vue'),
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: () => import('../views/error/NotFoundPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user: any = await Axios.get('/api/v1/auth/isLoggedIn');

    if (user.data.isAuthorize) {
      if (to.matched.some((record) => record.meta.toBeDoctor)) {
        const doctor: any = await Axios.get('/api/v1/auth/isDoctor', {
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
