import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/LoginView.vue';
import Register from '../components/RegisterView.vue';
import Home from '../components/HomeView.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login');
  } else {
    next();
  }
});
export default router;
