<template>
  <nav><NavBar /></nav>
<div class="container">
  <h1>Add New Recipe</h1>
  <form enctype="multipart/form-data">
    <p><input type="text" v-model="recipe.title" name="title" placeholder="Recipe Title"><br></p>
    <p><input type="text" v-model="recipe.description" name="description" placeholder="Recipe Description"><br></p>
    <p><input type="file" name="image" @change="handleImageUpload" ref="fileInput"><br></p>
    <p><button type="submit" data-bs-toggle="modal" data-bs-target="#modalId" @click.prevent="addRecipe">Add new recipe</button></p>
  </form>
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
</template>
<script>
import NavBar from '../components/NavBar.vue';
export default {
  name: 'RecipeAdd',
  data: () => ({
    error: '',
    recipe: {
      title: '',
      description: '',
      image: ''
        },
        showModal: false
    }),
    components: {
      NavBar
    },
    methods: {
      addRecipe: function () {
  const formData = new FormData();
  formData.append("title", this.recipe.title)
  formData.append("description", this.recipe.description)
  formData.append("image", this.$refs.fileInput.files[0])

  fetch('http://localhost:4000/recipes/add', {
    method: "POST",
    body: formData,
  })
  .then(res => {
    if (res.ok) {
      console.log("Recipe added successfully")
    } else {
      console.error("Failed to add recipe")
    }
  })
  .catch(error => {
    console.error("Error:", error)
  });
  this.showModal = true
},
openFileInput() {
        this.$refs.fileInput.click()
    },
    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            this.recipe.image = '/assets/' + file.name
        }
    },
    resetForm() {
      this.recipe.title = ''
      this.recipe.description = ''
      this.fileInput = ''
    }
  }
}
// const myModal = new bootstrap.Modal(document.getElementById('modalId'), options)
  
</script>

  <style>
  .container {
    width: 50vw;
  }
  </style>