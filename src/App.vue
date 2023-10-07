<template> 
<nav class="navbar navbar-expand-sm navbar-light bg-light" id="nav">
    <div class="container">
    <a class="navbar-brand" href="/">HOME</a>
    <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavId">
      <ul class="navbar-nav me-auto mt-2 mt-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">Profile <span class="visually-hidden">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Random Recipe</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">My Recipes</a>
          <div class="dropdown-menu" aria-labelledby="dropdownId">
            <a class="dropdown-item" href="#">Create a new one</a>
            <a class="dropdown-item" href="#">View past recipes</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="d-flex my-2 my-lg-0" id="logo">
      <img src="./assets/logo/logo-2.png" alt="pantry chef logo" id="logoimg">
    </div>
  </div>
</nav>
<main>
  <router-view :key="$route.path" />
</main>
</template>

<script>

</script>

<style>
body {
  @font-face {
  font-family: 'fjallaone';
  src: URL('./assets/fonts/fjalla/FjallaOne-Regular.ttf') format('truetype');
}
}


#app {
  font-family: fjallaone;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logoimg {
  width:6vw;
  height:10vh;
}

</style>
