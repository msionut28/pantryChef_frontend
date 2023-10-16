<template>
    <button class="btn btn-primary">{{ buttonText }}</button>
</template>

<script>
export default {
    name: 'myBtn',
    props: {
        buttonText: String
    }
}
</script>

<style scoped>
button{
  background-color: rgba(68, 68, 68, 1);
  border: none;
  width: 7.5vw;
}
button:hover{
  background-color: rgb(98, 98, 98);
  border: none;
}
</style>