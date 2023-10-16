<template>
<NavBar />
<div class="individual-container">
    <div class="wrapper">
    <div class="grid-item">
        <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="recipe-image">
        <div class="overlay">
            <div class="title">{{ recipe.strMeal }}</div>
        </div>
    </div>
    <div class="recipe-body">
        <h4 class="section-title">Ingredients:</h4>
        <ul class="ingredient-list">
            <li v-for="(ingredient, index) in getIngredients(recipe)" :key="index">
              {{ ingredient }}
            </li>
        </ul>
        <div class="recipe-instructions">
            <p class="instructions">
            <strong>Instructions:</strong> 
            {{ recipe.strInstructions }}
            </p>
        </div>
        </div>
    </div>
</div>
</template>  

<script>
const API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php'
import NavBar from '../components/NavBar.vue';
export default {
    name: 'RandomRecipe',
    data: () =>({
        error: '',
        recipe: {}
    }),
    components: {
        NavBar
    },
    methods: {
    getIngredients(recipe) {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && measure) {
          ingredients.push(`${ingredient} - ${measure}`);
        } else {
          break;
        }
      }
      return ingredients;
    }
  },
    mounted() {
        fetch(API_URL)
        .then(response => response.json())
        .then(result => {
            this.recipe = result.meals[0]
        })
    },
}

</script>

<style scoped>
.individual-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
  
.editor {
  display: flex;
  flex-direction: row;
  margin: auto;
}

.editor button {
  margin: 10px;
}

.wrapper {
  flex-direction: column;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center; 
  text-align: center;
}

.title {
  font-size: 24px;
  margin: 20px 0;
}
.details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
  
.detail-item {
margin: 10px 20px;
transition: 0.3s ease-in-out;
cursor: default;
}
.detail-item:hover {
margin: 10px 20px;
scale: 1.2;
}
  
.recipe-body {
  text-align: left;
  margin: 20px;
  padding: 10px;
  border-left: 4px solid #3498db;
}

.instructions {
  margin: 10px 0;
}

.description, .info {
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
}

.ingredient-list {
  list-style-type: disc;
  padding-left: 20px;
}

.ingredient-list li {
  margin: 5px 0;
}

.section-title {
  font-size: 20px;
  margin: 10px 0;
}

.recipe-instructions {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 5px;
}
.grid-item {
  position: relative;
  color: black;
  text-align: center;
  padding: 0px;
  scale:0.9;
  transition: 0.4s ease-in-out;
  filter: grayscale(0%);
  box-shadow: 0 5px 10px rgba(0,0,0,0.50), 0 35px 22px rgba(0,0,0,0.16);
  max-width: 40vw;
  height: 30vh;
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
.recipe-image {
  display: block;
  width: 100%;
  height: 100%
}
</style>