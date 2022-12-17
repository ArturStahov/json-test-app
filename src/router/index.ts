import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../Pages/HomePage/HomePage.vue";
import { Pages } from '../constants/pages';

const routes = [
  {
    path: '/',
    name: Pages.HOME,
    component: HomePage
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router