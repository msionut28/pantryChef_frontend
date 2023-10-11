<template>
<div class="container">
    <div class="buttons">
        <button type="button" class="btn btn-primary">Button</button>
        <button type="button" class="btn btn-primary">Button</button>
        <button type="button" class="btn btn-primary">Button</button>
    </div>
</div>
</template>

<script>
export default {
    name: 'LandingPage'
}
</script>

<style scoped>
main {
    background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('../assets/bg/Landing.jpeg');    
}
.container {
    background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('../assets/bg/Landing.jpeg');
    background-size: cover;
    width: 100%;
    height: 100%;
    margin-left: 2%;
    margin-right: 0;
    padding-left: 20%;
}
.buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20%;
    padding-bottom: 50%;
    padding-right: 20%;
}
button {
    width: 15%;
}
</style>