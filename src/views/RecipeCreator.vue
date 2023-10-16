<template>
<v-app class="generator">
  <NavBar />
  <v-container class="recipe-wrapper">
    <v-card outlined class="elevation-6">
      <h2 class="text-h2">Create a Recipe</h2>
      <v-card-title>
        <v-text-field
          v-if="isEditingTitle"
          v-model="title"
          label="Title"
          @keyup.enter="saveTitle"
        ></v-text-field>
        <div v-if="!isEditingTitle">
          <span class="title">{{ title }}</span>
          <v-btn @click="edit" text color="primary">EDIT</v-btn>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          v-model="newItem"
          label="Add an item"
          @keyup.enter="addItem"
        ></v-text-field>
        <v-list>
          <v-list-item
            v-for="(item, index) in createdRecipe"
            :key="index"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
            <v-btn @click="removeItem(index)" text color="error" class="delete-button">
              Remove
            </v-btn>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="footer">
        <v-btn
          v-if="createdRecipe.length > 0 && !recipeGenerated && !loading"
          @click="addRecipe"
          color="success"
          class="save-button"
        >
          Save
        </v-btn>
        <v-btn
          class="btn-primary"
          id="loading"
          v-if="loading"
          disabled
        >
          <v-progress-circular indeterminate size="20" color="white"></v-progress-circular>
          Loading...
        </v-btn>
        <myBtn
          v-if="recipeGenerated"
          @click="viewRecipe"
          buttonText="SHOW"
        />
      </v-card-actions>
    </v-card>
  </v-container>
  <v-container class="chat-box">
    <v-card>
      <v-card-text class="message">{{ description }}</v-card-text>
    </v-card>
  </v-container>
</v-app>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import myBtn from '../components/SingleButton.vue'
const backendApi = process.env.VUE_APP_BACKEND_API

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
    NavBar,
    myBtn
  },
  mounted(){
    const googleUser = this.$cookies.isKey('user_session')
    const userPass = this.$cookies.isKey('userpass_session')
    const adminUser = this.$cookies.isKey('admin_session')
    if(googleUser) {
        this.userName = this.$cookies.get('username')
    }else if(userPass){
      this.userName = this.$cookies.get('username')
    }else if(adminUser){
      this.userName = this.$cookies.get('username')
    }
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
    fetch(`${backendApi}/create`, {
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
    const res = await fetch(`${backendApi}/generated/${this.recipeId}`)
    const recipe = await res.json()
    this.description = recipe.description
    this.updateUserRecipe(this.userName)
  },
  updateUserRecipe: async function(user){
    console.log(`${this.recipeId}`);
    await fetch(`${backendApi}/users/${user}/addrecipe`, {
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
.delete-button{
    font-size: 12px;
    color: lab(53% 70 60);
    width: 5vw;
}
.generator{
  background-color: lab(93% 0 0);
}
.recipe-wrapper {
  text-align: center;
  margin: auto;
  padding: 20px;
}

.text-h2 {
  font-size: 24px;
  font-weight: bold;
}

.btn-primary {
  font-size: 12px;
  background-color: darkgrey;
  border: none;
  color: white;
}

.chat-box {
  text-align: center;
}

.message {
  font-size: 18px;
}
.save-button{
  background-color: lab(93% 0 0);
}
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>