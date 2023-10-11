import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../views/Home'
import RecipeAdd from '../views/RecipeAdd'
import RecipeCreator from '../views/RecipeCreator'
import IndividualRecipe from '../views/IndividualRecipe'
import NavBar from '../components/NavBar'
import LandingPage from '../views/LandingPage.vue'
import LoginPage from '../views/LoginPage.vue'
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
        component: HomePage,
    },
    {
        name: 'RecipeAdd',
        path: '/add',
        component: RecipeAdd,
        meta: { requiresAuth: true }
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
        component: IndividualRecipe,
    },
    {
        name: 'LandingPage',
        path: '/',
        component: LandingPage,
    },
    {
        name: 'LoginPage',
        path: '/login',
        component: LoginPage,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
    next()
    } else {
    next('/login')
    }
} else {
    to.meta.showNavBar = true; 
    next();
}
});
  

export default router