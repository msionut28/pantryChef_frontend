<template>
    <NavBar />
    <h1>YOUR RECIPES</h1>
    <h5 v-if="recipes < 1">Looks like you haven't created any recipes... Why don't you give it a try? 🤔  Click <strong><router-link :to="'/create'">here</router-link></strong>!</h5>
    <li v-for="recipe in recipes" :key="recipe._id" data-bs-toggle="modal" data-bs-target="#modalId" @click="selectRecipe(recipe)">
        {{ recipe.title }}
    </li>
    <RecipeModal :recipe="selectedRecipe" />
</template>

<script>
import RecipeModal from '../components/RecipeModal.vue'
import NavBar from '../components/NavBar.vue';
const USER_URL = 'http://localhost:4000/users'
const RECIPES_URL = 'http://localhost:4000/generated'
export default{
    name: 'UserRecipe',
    data: () => ({
        user: {},
        recipes: [],
        selectedRecipe: ''
    }),
    mounted() {
        try{
            const userName = this.$cookies.get('username')
            fetch(`${USER_URL}/${userName}`)
            .then(response => response.json())
            .then(result => {
                this.user = result
                result.recipes.forEach(recipe => {
                    fetch(`${RECIPES_URL}/${recipe}`)
                    .then(response => response.json())
                    .then(res => {
                        this.recipes.push(res)
                        console.log(res);
                    })
                    .catch(error => {
                        console.log(`Error fetching the recipe: ${error}`)
                    })
                })
            })
            .catch(error => {
                console.log(`Error fetching the user: ${error}`)
            })
        } catch(error) {
        console.log(error)
    } 
    },
    components:{
        RecipeModal,
        NavBar
    },
    methods: {
        selectRecipe(recipe) {
            this.selectedRecipe = recipe
        },
        clearRecipe(){
            this.selectedRecipe = null
        },
    }
}
</script>

<style scoped>
li{
    text-decoration: underline;
    cursor: pointer;
    list-style: none;
    text-transform: capitalize;
}
h4{
    font-weight: bold;
}
</style>