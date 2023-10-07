import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../components/Home'
import RecipeAdd from '../components/RecipeAdd'
import IndividualRecipe from '../components/IndividualRecipe'

const routes = [
    {
        name: 'HomePage',
        path: '/',
        component: HomePage
    },
    {
        name: 'RecipeAdd',
        path: '/add',
        component: RecipeAdd
    },
    {
        name: 'IndividualRecipe',
        path: '/recipes/:id',
        component: IndividualRecipe
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router