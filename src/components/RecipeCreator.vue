<template>
<div class="container">

    <input v-if="isEditingTitle" v-model="title" type="text" class="title-input" placeholder="TYPE IN A TITLE AND HIT ENTER.." @keyup.enter="saveTitle"/>
    <div v-else>
      <h3>{{ title }}<button class="title-editor" @click="edit">EDIT</button></h3>
    </div>

  <input class="ingredients-add" v-model="newItem" @keyup.enter="addItem" placeholder="Add an item">
  <div class="verticalLines">
        <ul class="ingredients">
            <li v-for="(item, index) in createdRecipe" :key="index">
            {{ item }}
            <button @click="removeItem(index)">Remove</button>
            </li>
            <li></li>
            <li></li>
            <li></li>
            <button class="save" @click="addRecipe" v-if="createdRecipe.length> 0 && !recipeGenerated">SAVE</button>
            <button class="view-recipe" v-if="recipeGenerated" @click="viewRecipe">VIEW RECIPE</button>
        </ul>
      </div>
      <div class="chat-box">
        <p class="message">{{ description }}</p>
      </div>
</div>
</template>

<script>
export default {
  name: 'RecipeCreate',
  data: () => ({
      error: '',
      title: '',
      createdRecipe: [],
      description: '',
      newItem: '',
      recipeId: '',
      isEditingTitle: true,
      recipeGenerated: false,
      showRecipe: false
  }),
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
    console.log(`New recipe ${this.title}`);
    fetch('http://localhost:4000/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: this.title,
            ingredients: this.createdRecipe
        })
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
    this.recipeId = data._id;
    console.log(this.recipeId);
  })
  this.recipeGenerated = true;
  },
  viewRecipe: async function(){
    console.log(this.recipeId)
    console.log(this.description);
    const res = await fetch(`http://localhost:4000/generated/${this.recipeId}`)
    const recipe = await res.json()
    this.description = recipe.description
  }
 }
}
</script>

<style scoped>
.container {
  width: 480px; 
  height: 450px; 
  margin: 0 auto;   
  display: flex;
  flex-direction: column;
}
.title-input{
  width: 60%
}

.ingredients { 
    color: #858585; 
    font-size: 21px; 
    padding: 0; 
    width: 500px; 
    border: 2px solid #cecece;  
} 
.ingredients-add{
  margin-left: 25%;
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
    width: 1px; 
    float: left; 
    height: auto; 
    margin-left: 35px; 
    border-left: 1px solid green; 
    border-right: 1px solid green; 
} 
button {
  width: 15%;
  font-size: 14px;
}
.save {
  width: 20%;
  font-size: 14px;
}
</style>