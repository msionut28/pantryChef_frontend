<template>
    <nav><NavBar /></nav>
    <div class="container">
        <h1>EDITING THE BLOG POST</h1>
        <p><input type="text" v-model="post.title" name="title" placeholder="Post Title"><br></p>
        <p><input type="text" v-model="post.description" name="descritpion" placeholder="Post Descritpion"><br></p>
        <p><input type="text" v-model="post.ingredients" name="ingredients" placeholder="Ingredients" disabled></p>
        <p><myBtn v-on:click="editBook" buttonText="SAVE"/></p>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import myBtn from '@/components/SingleButton.vue';
import { useRoute } from 'vue-router';
const API_URL = 'http://localhost:4000/recipes'


export default {
    name:'EditRecipe',
    data: () => ({
        post: {
            id: '',
            title: '',
            description: '',
        }
    }),
    async mounted() {
        const route = useRoute()
        try{
            const response = await fetch(`${API_URL}/${route.params.id}`)
            const data = await response.json()
            this.post.id = route.params.id
            this.post.title = data.title
            this.post.description = data.description
        } catch (error) {
        console.error(error)
    }
    },
    methods: {
        editBook: function () {
            console.log(`EDITED RECIPE ${this.post.title} `);
            fetch(`${API_URL}/${this.post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: this.post.title,
                    description: this.post.description,
                })
            })
                .then(() => {
                    this.$router.push({path: '/home'})
                })
        }
    },
    components: {
        NavBar,
        myBtn
    }
    
}
</script>