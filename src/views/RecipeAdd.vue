<template>
  <NavBar />
<div class="post-wrapper">
  <div class="container">
    <h1>Add New Recipe</h1>
    <form enctype="multipart/form-data">
      <div class="recipe-info">
        <p><input type="text" v-model="recipe.title" name="title" class="form-control" placeholder="Recipe Title"><br></p>
        <p><input type="text" v-model="recipe.time" name="time" class="form-control" placeholder="Cooking Time"><br></p>
        <p><input type="text" v-model="recipe.people" name="people" class="form-control" placeholder="Servings"><br></p>
        <p><input type="text" v-model="recipe.calories" name="calories" class="form-control" placeholder="Calories"><br></p>
        <p><input type="text" v-model="recipe.difficulty" name="difficulty" class="form-control" placeholder="Difficulty"></p>
      </div>
      <div class="ingredients-list">
        <h3>Ingredients List</h3>
        <ul>
          <li v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient }} 
            <myBtn type="button" buttonText="DELETE" @click="removeIngredient" />
          </li> 
        </ul>
      </div>
      <div class="footer">
      <p>
        <input type="text" v-model="newIngredient" name="difficulty" class="form-control" placeholder="Add Ingredient">
        <myBtn type ="button" buttonText="Add" @click="addIngredient" />
      </p>
      <textarea class="form-control" v-model="recipe.description" name="description" placeholder="Recipe Description"></textarea><br>
      <textarea class="form-control" v-model="recipe.instructions" name="instructions" placeholder="Recipe Instructions"></textarea>
      <p><input type="text" v-model="recipe.image" name="image" placeholder="Link to your Image"></p>
      <p><button class="btn btn-primary" type="submit" data-bs-toggle="modal" data-bs-target="#modalId" @click.prevent="addRecipe">Add new recipe</button></p>
    </div>
  </form>
</div>
<div class="popup-notification">
  <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitleId">NEW POST</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>A NEW BLOG POST HAS BEEN ADDED!</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetForm">Close</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import NavBar from '../components/NavBar.vue';
import myBtn from '../components/SingleButton.vue'
const backendApi = process.env.VUE_APP_BACKEND_API

export default {
  name: 'RecipeAdd',
  data: () => ({
    error: '',
    recipe: {
      title: '',
      time: '',
      people: '',
      calories: '',
      difficulty: '',
      description: '',
      instructions: '',
      image: ''
    },
        ingredients: [],
        showModal: false,
        newIngredient: ''
    }),
    components: {
      NavBar,
      myBtn
    },
    methods: {
      addRecipe: function () {
  const formData = new FormData();
  formData.append("title", this.recipe.title)
  formData.append("time", this.recipe.time)
  formData.append("people", this.recipe.people)
  formData.append("calories", this.recipe.calories)
  formData.append("difficulty", this.recipe.difficulty)
  formData.append("description", this.recipe.description)
  formData.append("instructions", this.recipe.instructions)
  formData.append("image", this.recipe.image)
  this.ingredients.forEach((ingredient, index) => {
    formData.append(`ingredients[${index}]`, ingredient)
  })

  fetch(`${backendApi}/recipes/add`, {
    method: "POST",
    body: formData,
  })
  .then(res => {
    if (res.ok) {
      this.showModal = true
    } else {
      console.error("Failed to add recipe")
    }
  })
  .catch(error => {
    console.error("Error:", error)
  });
},
  resetForm: function() {
      this.recipe.title = '',
      this.recipe.time = '',
      this.recipe.people = '',
      this.recipe.calories = '',
      this.recipe.difficulty = '',
      this.recipe.description = '',
      this.recipe.instructions = '',
      this.recipe.image = ''
      this.ingredients = []
      this.showModal = false
    },addIngredient: function() {
      if (this.newIngredient.trim() !== '') {
          this.ingredients.push(this.newIngredient)
          this.newIngredient = ''
        }
  }, removeIngredient(index) {
      this.ingredients.splice(index, 1);
    }

    }
}
  
</script>

  <style scoped>
.post-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('../assets/bg/postCreator.jpeg');
  background-size: cover;
  height: 100vh;
  color: white
}
input{
  background-color: rgba(256, 256, 256, 0.6);
  border: none;
  width: auto;
  text-align: center;
  margin: 5px 0;
}
input:focus{
  background-color: rgba(256, 256, 256, 0.8);
  border: none;
  box-shadow: 0 0 5px #dbd534;
}
textarea{
  background-color: rgba(256, 256, 256, 0.6);
  border: none;
  width: auto;
  text-align: center;
  margin: 5px 0;
}
textarea:focus{
  background-color: rgba(256, 256, 256, 0.8);
  border: none;
  box-shadow: 0 0 5px #dbd534;
}
.container {
  width: 100vw;
  height: auto;
  border: 1px black solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: auto;
  border: 1px solid rgba(256, 256, 256, 0.5);
  background-color: rgba(256,256,256,0.1);
}
.recipe-info{
  display: flex;
  flex-direction: row;
}
.recipe-info > p{
  padding: 0.5%;
}
.ingredients-list {
  width: 50%;
  padding: 2.5%;
}
.footer{
  display: flex;
  flex-direction: column;
}
button{
  background-color: rgba(68, 68, 68, 1);
  border: none;
}
button:hover{
  background-color: rgb(98, 98, 98);
  border: none;
}
li{
  list-style: none;
}
.popup-notification{
  color: black;
}
  </style>