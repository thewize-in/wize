import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DoctorSettingsPage from '../views/DoctorSettingsPage.vue';
import DashboardPage from '../views/DashboardPage.vue';
import ListPage from '../views/ListPage.vue';
import SignInPage from '../views/SignInPage.vue';
import ArchivesPage from '../views/Entrybook/ArchivesPage.vue';
import ArchivedListPage from '../views/Entrybook/ArchivedListPage.vue';
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
    meta: { requiresAuth: true, toBeDoctor: true },

    children: [
      {
        path: 'settings',
        name: 'DoctorSettingsPage',
        component: DoctorSettingsPage,
      },
      {
        path: 'dashboard',
        name: 'DashboardPage',
        component: DashboardPage,
      },
      {
        path: 'patientlist',
        name: 'ListPage',
        component: ListPage,
      },
      {
        path: 'entrybook',
        name: 'EntrybookPage',
        component: () => import('../views/Entrybook/EntrybookPage.vue'),
        children: [
          {
            path: '/',
            name: 'ArchivesPage',
            component: ArchivesPage,
          },
          {
            path: ':id',
            name: 'ArchivedListPage',
            component: ArchivedListPage,
          },
        ],
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
