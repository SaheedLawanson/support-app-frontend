import { createRouter, createWebHistory } from 'vue-router'
import SupportRequestView from '../views/SupportRequestView.vue'
import SignInView from '../views/SignInView.vue'
import HomeView from '../views/HomeView.vue'
import InAppShell from '../components/inAppShell.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/sign-in/:userType', name: 'sign-in', component: SignInView },
    {
      path: '/support-request',
      name: 'support-request',
      component: InAppShell,
      children: [{ path: '', name: 'tickets', component: SupportRequestView }],
    },
  ],
})

export default router
