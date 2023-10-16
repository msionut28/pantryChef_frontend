<template>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          {{ recipe.title }}
        </v-card-title>
        <v-card-text>
          <h4>INGREDIENTS</h4>
          <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
          </ul>
          <p>{{ recipe.description }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    name: 'RecipeModal',
    props: {
      recipe: Object,
    },
    data() {
      return {
        dialog: false,
      };
    },
    methods: {
      closeModal() {
        this.dialog = false;
        this.$emit('close');
      },
    },
  };
  </script>
  

<style scoped>
ul{
    text-align: center;
}
li{
    list-style: none;
}

.modal-title{
    text-transform: capitalize;
}
.modal-body{
    text-align: center;
}
</style>