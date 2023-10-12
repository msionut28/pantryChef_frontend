<template>
    <nav><NavBar /></nav>
    <div class="container">
        <div class="editor">
            <router-link :to="`/recipes/edit/${recipe._id}`"><button v-if="isAdmin">EDIT</button></router-link>
            <button v-if="isAdmin" @click="deleteRecipe">DELETE</button>
        </div>
        <div>
            <img :src="recipe.image" :alt="recipe.title">
            <h3>{{ recipe.title }}</h3>
            <p><strong>Description</strong>: {{ recipe.description }}</p>
            
        </div>
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { mapState } from 'vuex';
import NavBar from '../components/NavBar.vue';
const API_URL = 'http://localhost:4000/recipes'

export default {
    name: 'IndividualRecipe',
    data: () => ({
        error: '',
        recipe: {}
    }),
    components: {
        NavBar
    },
    mounted() {
        const route = useRoute()
        fetch(`${API_URL}/${route.params.id}`)
        .then(response => response.json())
        .then(result => {
            this.recipe = result
        })
    },
    computed: {
        ...mapState(['isAdmin'])
    },
    methods: {
        editRecipe: function () {

        },
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
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
}
.editor {
    flex-direction: row;
    margin: auto;
}
button {
    margin: 10px;
}
img {
    max-width: 400px;
    max-height: 400px;
    height: auto;
}
</style>