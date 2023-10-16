<template>
    <v-app class="v-app">
      <NavBar />
      <v-main>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-card class="dashboard-card">
                <v-card-title class="primary">
                  <h4 class="text-h4 white--text">Recipe Information</h4>
                </v-card-title>
                <v-card-text>
                  <div class="recipe-info">
                    <v-text-field v-model="post.title" label="Recipe Title" outlined></v-text-field>
                    <v-text-field v-model="post.time" label="Cooking Time" outlined></v-text-field>
                    <v-text-field v-model="post.people" label="Servings" outlined></v-text-field>
                    <v-text-field v-model="post.calories" label="Calories" outlined></v-text-field>
                    <v-text-field v-model="post.difficulty" label="Difficulty" outlined></v-text-field>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-card class="dashboard-card">
                <v-card-title class="primary">
                  <h4 class="text-h4 white--text">Ingredients</h4>
                </v-card-title>
                <v-card-text>
                  <div class="ingredients-list">
                    <h3 class="text-h3">Ingredients List</h3>
                    <v-list dense>
                      <v-list-item-group>
                        <v-list-item v-for="(ingredient, index) in ingredients" :key="index">
                          <v-list-item-content>
                            {{ ingredient }}
                            <v-btn @click="removeIngredient(index)" color="error" text small class="delete-button">Remove</v-btn>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="4">
              <v-card class="dashboard-card">
                <v-card-title class="primary">
                  <h4 class="text-h4 white--text">Actions</h4>
                </v-card-title>
                <v-card-text>
                  <div class="footer">
                    <v-text-field v-model="newIngredient" label="Add Ingredient" outlined></v-text-field>
                    <v-btn @click="addIngredient" color="orange" class="mt-3">Add</v-btn>
                    <v-textarea v-model="post.description" label="Recipe Description" outlined class="mt-3"></v-textarea>
                    <v-textarea v-model="post.instructions" label="Recipe Instructions" outlined class="mt-3"></v-textarea>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="editRecipe" color="success" large block>SAVE</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
<script>
import NavBar from '../components/NavBar.vue'
// import myBtn from '@/components/SingleButton.vue';
import { useRoute } from 'vue-router';
const backendApi = process.env.VUE_APP_BACKEND_API
const API_URL = `${backendApi}/recipes`


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
          this.newIngredient = ''
        }
  },removeIngredient(index) {
      this.ingredients.splice(index, 1);
    }
    },
    components: {
        NavBar,
    }
    
}
</script>
<style scoped>
.dashboard-card {
    margin: 10px;
    background-color: lab(100% 0 0);
    color: 20% 0 -20;
}

.primary {
    background-color: lab(74% 31 100%);
    color: 20% 0 -20;
}

.delete-button{
    font-size: 12px;
    color: lab(53% 70 60);
    width: 5vw;
}
.v-app {
background-color: lab(93% 0 0); 
color: 20% 0 -20;
}
</style>