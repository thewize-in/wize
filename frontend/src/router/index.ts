import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import EntryBookPage from '../views/EntryBookPage.vue';
import DoctorSettingsPage from '../views/DoctorSettingsPage.vue';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/entrybook',
    name: 'EntryBookPage',
    component: EntryBookPage,
  },
  {
    path: '/settings',
    name: 'DoctorSettingsPage',
    component: DoctorSettingsPage,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
