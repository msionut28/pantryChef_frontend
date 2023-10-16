<template>
    <v-app>
      <NavBar />
      <v-container>
        <h1 class="headline">YOUR RECIPES</h1>
        <h5 v-if="recipes.length < 1" class="caption">
          Looks like you haven't created any recipes... Why don't you give it a try? 🤔 Click
          <router-link :to="'/create'" class="link">here</router-link>!
        </h5>
        <v-list>
          <v-list-item
            v-for="recipe in recipes"
            :key="recipe._id"
            @click="selectRecipe(recipe)"
          >
            <v-row align="center">
              <v-col cols="8">
                <v-list-item-content>
                  <v-list-item-title class="subtitle-1">
                    {{ recipe.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-col>
              <v-col cols="4" class="d-flex justify-end">
                <v-btn @click="deleteRecipe(recipe._id)" text class="error">
                  DELETE
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </v-list>
        <v-dialog v-model="isModalOpen" max-width="600px">
          <v-card>
            <v-card-title>
              {{ selectedRecipe.title }}
            </v-card-title>
            <v-card-text>
              <h4>INGREDIENTS</h4>
              <ul>
                <li v-for="ingredient in selectedRecipe.ingredients" :key="ingredient">{{ ingredient }}</li>
              </ul>
              <p>{{ selectedRecipe.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="closeModal">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-app>
  </template>
  
  <script>
//   import RecipeModal from '../components/RecipeModal.vue'
  import NavBar from '../components/NavBar.vue';
  const USER_URL = 'http://localhost:4000/users'
  const RECIPES_URL = 'http://localhost:4000/generated'
  export default {
    name: 'UserRecipe',
    data: () => ({
      user: {},
      recipes: [],
      selectedRecipe: {},
      isModalOpen: false
    }),
    mounted() {
      try {
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
                })
                .catch(error => {
                  console.log(`Error fetching the recipe: ${error}`)
                })
            })
          })
          .catch(error => {
            console.log(`Error fetching the user: ${error}`)
          })
      } catch (error) {
        console.log(error)
      }
    },
    components: {
      NavBar,
    },
    methods: {
      selectRecipe(recipe) {
        this.selectedRecipe = recipe;
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      deleteRecipe(recipeid) {
        console.log(`${recipeid}`);
        fetch(`${RECIPES_URL}/${recipeid}`, {
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
h1.headline {
  font-size: 36px;
  font-weight: bold;
}

h5.caption {
  font-size: 20px;
}

.router-link {
  text-decoration: none;
  color: #007bff;
}

v-list-item-title {
  text-decoration: underline;
  cursor: pointer;
  text-transform: capitalize;
}

v-btn.error {
  color: #f44336;
}

v-btn.error:hover {
  background-color: rgba(244, 67, 54, 0.1);
}
</style>