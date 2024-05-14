import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/feeds',
          name: 'Feeds',
          component: () => import('../components/screens/Feeds/Feeds.vue')
        }
      ]
    },

    {
      path: '/',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('../components/screens/Login/Login.vue')
        },
        {
          path: '/register',
          name: 'Register',
          component: () => import('../components/screens/Registration/Registration.vue')
        },
        {
          path: '/registration-email',
          name: 'RegistrationEmail',
          component: () => import('../components/screens/Registration/RegistrationEmail.vue')
        },
      ]
    }
  ]
})

export default router
