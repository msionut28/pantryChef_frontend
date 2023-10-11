<template> 
<nav><NavBar /></nav>
<main>
  <router-view :key="$route.path" />
</main>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>

</style>
