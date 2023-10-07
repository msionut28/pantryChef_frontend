<template>
    <div>
        <img :src="recipe.image" :alt="recipe.title">
        <h3>{{ recipe.title }}</h3>
        <p><strong>Description</strong>: {{ recipe.description }}</p>
        
    </div>
</template>

<script>
import { useRoute } from 'vue-router'
    const API_URL = 'http://localhost:4000/recipes'

    export default {
        name: 'IndividualRecipe',
        data: () => ({
            error: '',
            recipe: {}
        }),

        mounted() {
            const route = useRoute()
            fetch(`${API_URL}/${route.params.id}`)
            .then(response => response.json())
            .then(result => {
                this.recipe = result
            })
        },
        methods: {}
    }
</script>

<style>
    h3 {
        font-size: 12px;
    }
    img {
        max-width: 400px;
        max-height: 400px;
        height: auto;
    }
</style>