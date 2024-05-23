import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      redirect: '/home/feeds',
      children: [
        {
          path: 'feeds',
          name: 'Feeds',
          component: () => import('../components/screens/Feeds/Feeds.vue')
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('../components/screens/Perfil/userProfile.vue')
        },
        {
          path: '/profile-professional/:id',
          name: 'ProfessionalProfile',
          component: () => import('../components/screens/Perfil/ProfessionalProfile.vue')
        },
        {
          path: '/editar-perfil',
          name: 'EditarPerfil',
          component: () => import('../components/screens/Registration/EditarPerfil.vue')
        },

        


      ]
    },

    {
      path: '/view',
      name: 'LoginView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView,
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
