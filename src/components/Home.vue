<template>
    <h1 class="page-title">INSPIRE YOURSELF, SEE OUR DAILY RECOMMENDED RECIPES</h1>
    <div class="grid-container">
        <router-link v-for="(recipe, index) in recipes.slice(0, 9)" :key="recipe._id" :to="'/recipes/' + recipe._id">
        <div class="grid-item">
            <img :src="recipe.image" :alt="recipe.title">
            <div :class="{ 'overlay': true, 'recipe': index === 4 }">
                <div class="title">{{ recipe.title }}</div>
                <p class="description">{{ recipe.description }}</p>
            </div>
        </div>
        </router-link>
   </div>
</template>

<script>
const API_URL = 'http://localhost:4000/recipes'

export default {
    name: 'HomePage',
    data: () => ({
        error: '',
        recipes: []
    }),

    mounted() {
        fetch(API_URL)
        .then(response => response.json())
        .then(result => {
            this.recipes = result
        })
    },
    methods: {}
}

</script>

<style scoped>
.page-title {
    font-size: 28px;
    margin-bottom: 30px;
}
.grid-container {
    display: grid;
    justify-content: center;
    align-content: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px; 
    height: 75vh;
    width: 85vw; 
    margin: 0 auto; 
}
.grid-item {
    position: relative;
    color: black;
    text-align: center;
    padding: 0px;
    scale:0.9;
    transition: 0.4s ease-in-out;
    filter: grayscale(0%);
}
.grid-item:hover {
    color: black;
    text-align: center;
    padding: 0px;
    transform: scale(1.2, 1.2);
    transition: 0.5s ease-in-out;
    filter: grayscale(20%);
}
.overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.25s;
}
.overlay > * {
    transform: translateY(20px);
    transition: transform 0.25s;
}
.overlay:hover{
    opacity:1;
}
.overlay:hover > * {
    transform: translateY(0);
}
.recipe {
    opacity: 1;
    backdrop-filter: blur(2px);
}
img {
    display: block;
    width: 28vw;
    height: 25vh
}
.title{
    font-size: 1.5em
}
.description{
    font-size: 1.25em;
    margin-top: 0.25em;
}

</style>