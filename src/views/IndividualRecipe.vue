<template>
<NavBar />
<div class="individual-container">
  <div class="editor">
    <router-link :to="`/recipes/edit/${recipe._id}`">
      <myBtn v-if="isAdmin" buttonText="EDIT"/>
    </router-link>
    <myBtn v-if="isAdmin" @click="deleteRecipe" buttonText="DELETE" />
  </div>
  <div class="wrapper">
    <div class="grid-item">
        <img :src="recipe.image" :alt="recipe.title" class="recipe-image">
        <div class="overlay">
            <div class="title">{{ recipe.title }}</div>
        </div>
    </div>
    <div class="recipe-body">
        <p class="description">
            <strong>{{ recipe.description }}</strong> 
        </p>
        <div class="details">
          <p class="detail-item">
              <strong>Cooking Time:</strong> 
              <font-awesome-icon icon="fa-solid fa-clock" /> 
              <span class="info">{{ recipe.time }}</span>
          </p>
          <p class="detail-item">
              <strong>Servings:</strong> 
              <font-awesome-icon icon="fa-solid fa-user-group" /> 
              <span class="info">{{ recipe.people }}</span>
          </p>
          <p class="detail-item">
              <strong>Calories:</strong> 
              <font-awesome-icon icon="fa-solid fa-fire-flame-curved" /> 
              <span class="info">{{ recipe.calories }}</span>
          </p>
          <p class="detail-item">
              <strong>Difficulty:</strong>
              <font-awesome-icon icon="fa-solid fa-gauge" /> 
              <span class="info">{{ recipe.difficulty }}</span>
          </p>
        </div>
        <h4 class="section-title">Ingredients:</h4>
        <ul class="ingredient-list">
            <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient }}</li>
        </ul>
        <div class="recipe-instructions">
          <p class="instructions">
            <strong>Instructions:</strong> 
            <ol>
                <li v-for="(step, index) in recipe.instructions" :key="index">
                {{ step.trim() }}
                </li>
            </ol>
          </p>
        </div>
      </div>
  </div>
</div>
</template>  

    <script>
    import { useRoute } from 'vue-router'
    import { mapState } from 'vuex';
    import NavBar from '../components/NavBar.vue';
    import myBtn from '../components/SingleButton.vue'
    const API_URL = 'http://localhost:4000/recipes'

    export default {
        name: 'IndividualRecipe',
        data: () => ({
            error: '',
            recipe: {}
        }),
        components: {
            NavBar,
            myBtn
        },
        mounted() {
            const route = useRoute()
            fetch(`${API_URL}/${route.params.id}`)
            .then(response => response.json())
            .then(result => {
                this.recipe = result
                this.recipe.instructions = this.recipe.instructions.split(/\d+[:.]/).filter(item => item.trim())
            })
        },
        computed: {
            ...mapState(['isAdmin'])
        },
        methods: {
        deleteRecipe: function() {
            fetch(`${API_URL}/${this.recipe._id}`,{
                method: 'DELETE'
            })
            .then(() => {
                this.$router.push({path: '/home'})
            })
            }
        }
        
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
