<template>
    <h1 class="page-title">INSPIRE YOURSELF, SEE OUR DAILY RECOMMENDED RECIPES</h1>
   <div class="grid-container">
        <div class="grid-item">
            <img class ="image" src="../assets/recipe_images/pizza.jpeg" alt="pizza">
            <div class="overlay">
                <div class="title">PIZZA</div>
                    <p class="description">Make perfect pizza at home with this classic homemade pizza recipe, including a pizza dough recipe, topping suggestions, and step-by-step instructions.</p>
            </div>
        </div>
        <div class="grid-item">
            <img class ="image" src="../assets/recipe_images/pasta.webp" alt="pasta">
            <div class="overlay">
                <div class="title">PASTA CARBONARA</div>
                    <p class="description">This bacon carbonara is a super rich, classic "bacon and egg" spaghetti dish that's great to serve for company. This recipe also makes an unusual brunch offering.</p>
            </div>
        </div>
        <div class="grid-item">
            <img class ="image" src="../assets/recipe_images/cream_soup.jpeg" alt="cream_soup">
            <div class="overlay">
                <div class="title">LEEK & POTATO CREAM SOUP</div>
                    <p class="description">Nothing's better than a bowl of hearty potato leek soup on a chilly day.</p>
            </div>
        </div>
        <div class="grid-item">
            <img class ="image" src="../assets/recipe_images/chicken_tikka_massala.webp" alt="chicken_tikka_massala">
            <div class="overlay">
                <div class="title">CHICKEN TIKKA MASALA</div>
                    <p class="description">This rich and creamy flavoursome Chicken tikka rivals any Indian restaurant! Why go out when you can make it better at home!</p>
            </div>
        </div>
        <div class="grid-item">
            <img src="../assets/recipe_images/ingredients.webp" class="image">
            <div class="overlay recipe">
                <p class="description">LIST IN YOUR ITEMS AND WE'LL COME UP WITH A SOLUTION FOR YOU</p>
            </div>
            <p>CLICK HERE TO CREATE YOUR OWN RECIPE</p>
        </div>
        <div class="grid-item">
            <img class ="image" src="../assets/recipe_images/burger.jpeg" alt="burger">
            <div class="overlay">
                <div class="title">BURGER</div>
                    <p class="description">These burgers offer a rich and meaty taste, with a punch of zesty herbs that can be customized with your preferred flavors.</p>
            </div>
        </div>
        <div class="grid-item">
            <img class ="image" src="../assets/recipe_images/macandcheese.jpeg" alt="macandcheese">
            <div class="overlay">
                <div class="title">MAC AND CHEESE</div>
                    <p class="description">Looking for a homemade alternative to boxed mac and cheese that's just as quick and easy? </p>
            </div>
        </div>
        <div class="grid-item">
            <img class ="image" src="../assets/recipe_images/mushroom_chicken.jpeg" alt="mushroom_chicken">
            <div class="overlay">
                <div class="title">CREAMY MUSHROOM CHICKEN</div>
                    <p class="description">This creamy chicken and mushroom dinner for two is really satisfying, but surprisingly low in calories.</p>
            </div>
        </div>
        <div class="grid-item">
            <img class ="image" src="../assets/recipe_images/sunday_roast.webp" alt="sunday_roast">
            <div class="overlay">
                <div class="title">SUNDAY BEEF ROAST</div>
                    <p class="description">It can take a little planning to make sure everything is on the table at the same time, but nothing can beat a home-cooked roast beef dinner! </p>
            </div>
        </div>
   </div>
</template>

<script>
    export default {
        name: 'HomePage'
    }
</script>

<style>
.page-title {
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
    position: relative;
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
.overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.25s;
}
.overlay > * {
    transform: translateY(20px);
    transition: transform 0.25s;
}
.overlay:hover{
    opacity:1;
}
.overlay:hover > * {
    transform: translateY(0);
}
.recipe {
    backdrop-filter: blur(5px);
}
img {
    display: block;
    width: 28vw;
    height: 25vh
}
.title{
    font-size: 1.5em
}
.description{
    font-size: 1.25em;
    margin-top: 0.25em;
}

</style>