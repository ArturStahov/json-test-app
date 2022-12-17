import { createRouter, createWebHistory } from 'vue-router'
import { Pages } from '../constants/pages';

const AuthPage = () => import('../pages/AuthPage/AuthPage.vue');
const BoardPage = () => import('../pages/BoardPage/BoardPage.vue');

const routes = [
  {
    path: '/',
    name: Pages.Auth,
    component: AuthPage
  },
  {
    path: `/${Pages.BOARD}`,
    name: Pages.BOARD,
    component: BoardPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;