<template>
    <NavBar />
    <h1>YOUR RECIPES</h1>
    <h5 v-if="recipes.length < 1">Looks like you haven't created any recipes... Why don't you give it a try? 🤔  Click <strong><router-link :to="'/create'">here</router-link></strong>!</h5>
    <li v-for="recipe in recipes" :key="recipe._id" data-bs-toggle="modal" data-bs-target="#modalId" @click="selectRecipe(recipe)" id="recipes">
        <div class="btns">
            <myBtn :buttonText="recipe.title" id="title"/> 
            <myBtn @click="deleteRecipe(recipe._id)" buttonText="DELETE" />
        </div>
    </li>
    <RecipeModal :recipe="selectedRecipe" />
</template>

<script>
import RecipeModal from '../components/RecipeModal.vue'
import NavBar from '../components/NavBar.vue';
import myBtn from '../components/SingleButton.vue'
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
        NavBar,
        myBtn
    },
    methods: {
        selectRecipe(recipe) {
            this.selectedRecipe = recipe
        },
        clearRecipe(){
            this.selectedRecipe = null
        },
        deleteRecipe(recipeid) {
            console.log(`${recipeid}`);
        fetch(`${RECIPES_URL}/${recipeid}`,{
            method: 'DELETE'
        })
        .then(() => {
            location.reload()
        })
        }
    }
}
</script>

<style scoped>
#recipes{
    padding: 10px 0px;
}
li{
    text-decoration: underline;
    cursor: pointer;
    list-style: none;
    text-transform: capitalize;
}
h4{
    font-weight: bold;
}

#title{
    background-color: transparent;
    border: none;
    color: black;
    margin: 0px 5vw; 
    transition: 0.3s ease-in-out;
    max-height: 7vh;
}
#title:hover{
    background-color: black;
    color: white;
    scale: 1.2;
}
</style>