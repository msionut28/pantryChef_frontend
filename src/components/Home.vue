<template>
    <h1 class="title">INSPIRE YOURSELF, SEE OUR DAILY RECOMMENDED RECIPES</h1>
   <div class="grid-container">
        <div class="grid-item"><img src="../assets/recipe_images/pizza.jpeg" alt="pizza"></div>
        <div class="grid-item"><img src="../assets/recipe_images/pasta.jpeg" alt="pasta"></div>
        <div class="grid-item"><img src="../assets/recipe_images/cream_soup.jpeg" alt="pasta"></div>
        <div class="grid-item"><img src="../assets/recipe_images/chicken_tikka_massala.webp" alt="pasta"></div>
        <div class="grid-item">CREATE YOUR OWN RECIPE</div>
        <div class="grid-item"><img src="../assets/recipe_images/lasagna.jpeg" alt="pasta"></div>
        <div class="grid-item"><img src="../assets/recipe_images/bean_caserole.jpeg" alt="pasta"></div>
        <div class="grid-item"><img src="../assets/recipe_images/shepherds_pie.jpeg" alt="pasta"></div>
        <div class="grid-item"><img src="../assets/recipe_images/sunday_roast.webp" alt="pasta"></div>
   </div>
</template>

<script>
    export default {
        name: 'HomePage'
    }
</script>

<style>
.title {
    font-size: 28px;
    margin-bottom: 30px;
}
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px; 
    height: 75vh;
    width: 85vw; 
    margin: 0 auto; 
}

.grid-item {
    color: black;
    text-align: center;
    padding: 0px;
    scale:0.9;
    transition: 0.4s ease-in-out;
    filter: grayscale(0%);
}
.grid-item:hover {
    color: black;
    text-align: center;
    padding: 0px;
    transform: scale(1.2, 1.2);
    transition: 0.5s ease-in-out;
    filter: grayscale(20%);
}

img {
    width: 25vw;
    height: 25vh
}
</style>