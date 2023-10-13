<template>
<div class="wrapper">
    <div class="header">
        <h1 class="title">PANTRY CHEF</h1>
        <p class="description">Pantry Chef is your ultimate culinary companion, offering a delightful fusion of inspiration and innovation in the world of food. With Pantry Chef, all you need to do is list the ingredients you have in your pantry, and watch as our AI wizard crafts a recipe just for you in seconds.</p>
    </div>
    <div class="buttons">
        <router-link :to="'/home'"><button type="button" class="btn btn-primary">BROWSE AS GUEST</button></router-link>
        <router-link :to="'/login'"><button type="button" class="btn btn-primary">LOGIN</button></router-link>
    </div>
</div>
</template>

<script>
export default {
    name: 'LandingPage',
    components:{
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('../assets/bg/Landing.jpeg');
    color: #FFF;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
}
.header {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.title{
    display: flex;
    justify-content: center;
    font-size: 50px;
    letter-spacing: 0.4em;
    font-weight: bold;
    max-height: 600px;
    text-align: center;
    color: rgba(250, 250, 250, 1);
    cursor: default;
    width: 100%; 
    outline: 5px solid;
    outline-offset: 70px;
    transition: all 1.8s cubic-bezier(0.2, 0, 0, 1.2);
    margin-bottom: auto;
}
.title:hover{
    color: rgba(238, 242, 226, 1);
    outline-color: rgba(71, 126, 232, 0);
    outline-offset: 300px;
}
.title:hover + .description{ 
    display: block;
    max-height: 600px;
    color: rgba(256, 256, 256, 1);
    font-weight: 500;
}
.description{
    color: rgba(255, 223, 186, 0.4);
    font-family: 'Raleway';
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0.15em;
    display: block;
    max-height: 0px;
    overflow: hidden;
    transition: all 1.2s cubic-bezier(0.2, 0, 0, 1.2)
}
.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    margin-top: 5%;
    gap: 10%;
}
button{
    border: none;
    background-color: rgba(256,256,256,0.7);
    color: black;
    border-radius: 50px; 
    width: 25vw;
    font-size: 30px;
    transition: transform 0.4s ease-in-out, color 0.4s ease-in-out, background-color 0.4s ease-in-out;
}
button:hover{
    transform: scale(1.2);
    box-shadow: 0 0 10px #8e8e8e;
    border: none;
    background-color: white;
    color: black
}
</style>