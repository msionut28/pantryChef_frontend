import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../components/Home'
import RecipeAdd from '../components/RecipeAdd'
import RecipeCreator from '../components/RecipeCreator'
import IndividualRecipe from '../components/IndividualRecipe'
import NavBar from '../components/NavBar'
import LandingPage from '../views/LandingPage.vue'
import store from '../store/store'

const routes = [
    {
        name: 'NavBar',
        path: '/nav',
        component: NavBar
    },
    {
        name: 'HomePage',
        path: '/home',
        component: HomePage
    },
    {
        name: 'RecipeAdd',
        path: '/add',
        component: RecipeAdd,
        meta: { requiresAuth: true}
    },
    {
        name: 'RecipeCreator',
        path: '/create',
        component: RecipeCreator,
        meta: { requiresAuth: true }
    },
    {
        name: 'IndividualRecipe',
        path: '/recipes/:id',
        component: IndividualRecipe
    },
    {
        name: 'LandingPage',
        path: '/landing',
        component: LandingPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isLoggedIn;
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  
    if (requiresAuth && !isAuthenticated) {
      next('/login'); 
    } else {
      next();
    }
  })

export default router