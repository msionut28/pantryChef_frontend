<template>
    <nav><NavBar /></nav>
    <div class="container">
        <h1>EDITING THE BLOG POST</h1>
        <div class="recipe-info">
        <p><input type="text" v-model="post.title" name="title" class="form-control" placeholder="Recipe Title"><br></p>
        <p><input type="text" v-model="post.time" name="time" class="form-control" placeholder="Cooking Time"><br></p>
        <p><input type="text" v-model="post.people" name="people" class="form-control" placeholder="Servings"><br></p>
        <p><input type="text" v-model="post.calories" name="calories" class="form-control" placeholder="Calories"><br></p>
        <p><input type="text" v-model="post.difficulty" placeholder="Difficulty" class="form-control" name="difficulty"></p>
      </div>
      <div class="ingredients-list">
        <h3>Ingredients List</h3>
        <ul>
            <li v-for="(ingredient, index) in ingredients" :key="index">{{ ingredient }} <myBtn type="button" buttonText="DELETE" @click="removeIngredient(index)" /></li>
        </ul>
      </div>
      <div class="footer">
      <p><input type="text" v-model="newIngredient" name="difficulty" class="form-control" placeholder="Add Ingredient"><myBtn type ="button" buttonText="Add" @click="addIngredient" /></p>
      <textarea class="form-control" v-model="post.description" name="description" placeholder="Recipe Description"></textarea><br>
      <textarea class="form-control" v-model="post.instructions" name="instructions" placeholder="Recipe Instructions"></textarea>
    </div>
        <p><myBtn v-on:click="editRecipe" buttonText="SAVE"/></p>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import myBtn from '@/components/SingleButton.vue';
import { useRoute } from 'vue-router';
const API_URL = 'http://localhost:4000/recipes'


export default {
    name:'EditRecipe',
    data: () => ({
        post: {
            id: '',
            title: '',
            time: '',
            people: '',
            calories: '',
            difficulty: '',
            description: '',
            instructions: '',
        },
        ingredients: [],
        newIngredient: ''
    }),
    async mounted() {
        const route = useRoute()
        try{
            const response = await fetch(`${API_URL}/${route.params.id}`)
            const data = await response.json()
            this.post.id = route.params.id
            this.post.title = data.title
            this.post.time = data.time
            this.post.people = data.people
            this.post.calories = data.calories
            this.post.difficulty = data.difficulty
            this.post.description = data.description
            this.post.instructions = data.instructions
            this.ingredients = data.ingredients
        } catch (error) {
        console.error(error)
    }
    },
    methods: {
        editRecipe: function () {
            console.log(`EDITED RECIPE ${this.post.title} `);
            fetch(`${API_URL}/${this.post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: this.post.title,
                    time: this.post.time,
                    people: this.post.people,
                    calories: this.post.calories,
                    difficulty: this.post.difficulty,
                    description: this.post.description,
                    instructions: this.post.instructions,
                    ingredients: this.ingredients
                })
            })
                .then(() => {
                    this.$router.push({path: '/home'})
                })
        },
        addIngredient: function() {
        if (this.newIngredient.trim() !== '') {
          this.ingredients.push(this.newIngredient)
          console.log(this.ingredients);
          this.newIngredient = ''
        }
  },removeIngredient(index) {
      this.ingredients.splice(index, 1);
    }
    },
    components: {
        NavBar,
        myBtn
    }
    
}
</script>