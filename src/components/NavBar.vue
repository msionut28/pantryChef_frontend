<template>
<div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light" id="nav">
<div class="container">
<a class="navbar-brand" href="/home">HOME</a>
<button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
    aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="collapsibleNavId">
    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
    <li v-if="isLoggedIn" class="nav-item">
        <a class="nav-link" href="#">Profile <span class="visually-hidden">(current)</span></a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#">Random Recipe</a>
    </li>
    <li v-if="isLoggedIn" class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">My Recipes</a>
        <div class="dropdown-menu" aria-labelledby="dropdownId">
        <a class="dropdown-item" href="/create">Create a new one</a>
        <a class="dropdown-item" href="#">View past recipes</a>
        </div>
    </li>
    <li v-if="isLoggedIn" class="nav-item">
        <a class="nav-link" href="#" @click="handleLogOut">Log Out</a>
    </li>
    <li v-if="!isLoggedIn" class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</a>
        <div class="dropdown-menu" aria-labelledby="dropdownId">
            <a class="dropdown-item" href="#"><GoogleLogin :callback="callback" /></a>
            <a class="dropdown-item" href="#">Username and Password</a>
        </div>
    </li>
    <li v-if="showModal">
        <ShowModal/>
    </li>
    </ul>
</div>
<div class="d-flex my-2 my-lg-0" id="logo">
    <img src="../assets/logo/logo-2.png" alt="pantry chef logo" id="logoimg">
</div>
</div>
</nav>
</div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
import { mapState, mapActions } from 'vuex';
import { handleLogin, handleLogout } from '../auth/auth';
import ShowModal from './ShowModal.vue';
export default {
    name: "NavBar",
    data: () => ({
        isInit: false,
        userName: '',
        lastLogin: ''
    }),
    mounted() {
        if(this.$cookies.isKey('user_session')) {
            this.$store.dispatch('login')
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name
        }
    },
    computed: {
        ...mapState(['isLoggedIn', 'showModal'])
    },
    methods: {
        ...mapActions(['login', 'logout']),
        callback: async function (response) {
            handleLogin(response, this.$store, this.$cookies)
        },
        handleLogOut: function () {
            handleLogout(this.$store, this.$cookies)
        }
    },
    components: {
        ShowModal
    }
}
</script>


