<template>
<nav><NavBar /></nav>
<div class="recipe-wrapper">
    <input v-if="isEditingTitle" v-model="title" type="text" class="title-input" placeholder="TYPE IN A TITLE AND HIT ENTER.." @keyup.enter="saveTitle"/>
    <div v-else>
      <h3>
        {{ title }}
        <button type="button" id="" class="btn btn-primary editor" @click="edit">EDIT</button>
      </h3>
    </div>
  <input class="ingredients-add" v-model="newItem" @keyup.enter="addItem" placeholder="Add an item">
  <div class="verticalLines">
        <ul class="ingredients">
            <li v-for="(item, index) in createdRecipe" :key="index">
            {{ item }}
            <button type="button" class="btn btn-primary editor" @click="removeItem(index)">Remove</button>
            </li>
              <button type="button" class="btn btn-primary editor" @click="addRecipe" v-if="createdRecipe.length> 0 && !recipeGenerated && !loading">SAVE</button>
            <button class="btn btn-primary" type="button" id="loading" disabled v-if="loading">
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Loading...
              </button>
            <button type="button" name="" id="" class="btn btn-primary editor" v-if="recipeGenerated" @click="viewRecipe">VIEW RECIPE</button>
        </ul>
      </div>
      <div class="chat-box">
        <p class="message">{{ description }}</p>
      </div>
</div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'RecipeCreate',
  data: () => ({
      error: '',
      title: '',
      createdRecipe: [],
      description: '',
      newItem: '',
      recipeId: '',
      userName: '',
      isEditingTitle: true,
      recipeGenerated: false,
      loading: false,
      showRecipe: false
  }),
  components: {
    NavBar
  },
  mounted(){
    const userData = decodeCredential(this.$cookies.get('user_session'))
    this.userName = userData.given_name
  },
    methods: {
  addItem: function () {
    if (this.newItem.trim() !== '') {
      this.createdRecipe.push(this.newItem)
      this.newItem = ''
    }
    console.log(this.createdRecipe);
  },
  saveTitle: function (event) {
    const newTitle = event.target.value.trim()
    if (newTitle !== '') {
      this.title = newTitle
      this.isEditingTitle = false
      console.log(this.title);
    }
  },
  edit: function () {
    this.isEditingTitle = true
  },
  removeItem: function (index) {
    this.createdRecipe.splice(index, 1)
  },
  addRecipe: function () {
    this.loading = true
    console.log(`New recipe ${this.title}`);
    fetch('http://localhost:4000/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: this.title,
            ingredients: this.createdRecipe,
            userName: this.userName
        })
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
    this.recipeId = data._id
    console.log(this.recipeId);
    this.loading = false
    this.recipeGenerated = true
  })
  },
  viewRecipe: async function(){
    console.log(this.recipeId)
    console.log(this.description);
    const res = await fetch(`http://localhost:4000/generated/${this.recipeId}`)
    const recipe = await res.json()
    this.description = recipe.description
    this.updateUserRecipe(this.userName)
  },
  updateUserRecipe: async function(user){
    console.log(`${this.recipeId}`);
    await fetch(`http://localhost:4000/users/${user}/addrecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({recipeId: this.recipeId})
    })
    .then(res => res.json())
    console.log(`recipe added to the user: ${user}`);
  }
 }
}
</script>

<style scoped>
.recipe-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
    width: 30vw;
    border: 1px solid black;
}
.ingredients { 
  color: #858585; 
  font-size: 21px; 
  padding: 0; 
  width: 30vw; 
  border: 2px solid #cecece;  
} 
.ingredients li { 
  list-style: none; 
  border-bottom: 2px dotted #cecece; 
  text-indent: 20px; 
  height: auto;  
  padding: 10px; 
}
.ingredients li:hover { 
  background-color: #f5f5f5; 
} 
.verticalLines {
  display: flex;  
  height: auto; 
  float: left;
} 
button {
  font-size: 12px;
}
.save {
  width: 30%;
  font-size: 14px;
}
.editor, .editor:active, .editor:hover{
  background-color: darkgray;
  border: none;
}
#loading, #loading:hover{
  background-color: darkgrey;
  border: none;
}
</style>