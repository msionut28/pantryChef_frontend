<template>
<div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light" id="nav">
        <div class="container">
            <a class="navbar-brand" href="/home">HOME</a>
            <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <!-- <li v-if="isLoggedIn" class="nav-item">
                        <a class="nav-link" href="#">Profile <span class="visually-hidden">(current)</span></a>
                    </li> -->
                    <li class="nav-item" v-if="isLoggedIn">
                        <router-link :to="'/randomrecipe'">
                            <a class="nav-link" href="#">Random Recipe</a>
                        </router-link>
                    </li>
                    <li v-if="isLoggedIn" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">My Recipes</a>
                        <div class="dropdown-menu" aria-labelledby="dropdownId">
                            <router-link :to="'/create'">
                                <a class="dropdown-item" href="#">Create a new one</a>
                            </router-link>
                            <router-link :to="userName +'/recipes'">
                                <a class="dropdown-item" href="#" >View past recipes</a>
                            </router-link>
                        </div>
                    </li>
                    <li v-if="isAdmin" class="nav-item">
                        <a href="/add" class="nav-link">New Blog Post</a>
                    </li>
                    <li v-if="isLoggedIn" class="nav-item">
                        <a class="nav-link" href="#" @click="handleLogOut">Log Out</a>
                    </li>
                    <li v-if="!isLoggedIn" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</a>
                        <div class="dropdown-menu" aria-labelledby="dropdownId">
                            <a class="dropdown-item" href="#"><GoogleLogin :callback="callback" /></a>
                            <a class="dropdown-item" href="/login">Username and Password</a>
                        </div>
                    </li>
                    <li v-if="showModal">
                        <ShowModal />
                    </li>
                </ul>
            </div>
            <p v-if="isLoggedIn">Hello, <strong>{{ userName }}</strong>!<font-awesome-icon v-if="isAdmin" icon="fa-solid fa-user-secret" /></p>
            <div class="d-flex my-2 my-lg-0" id="logo">
                <img src="../assets/logo/logo-2.png" alt="pantry chef logo" id="logoimg">
            </div>
        </div>
    </nav>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; 
import { handleLogin, handleLogout } from '../auth/auth';
import ShowModal from './ShowModal';
export default {
    name: "NavBar",
    data: () => ({
        isInit: false,
        userName: '',
        lastLogin: ''
    }),
    mounted() {
    const googleUser = this.$cookies.isKey('user_session')
    const userPass = this.$cookies.isKey('userpass_session')
    const adminUser = this.$cookies.isKey('admin_session')
    if(googleUser) {
        this.userName = this.$cookies.get('username')
    }else if(userPass){
      this.userName = this.$cookies.get('username')
    }else if(adminUser){
      this.userName = this.$cookies.get('username')
    }
    },
    computed: {
        ...mapState(['isLoggedIn', 'showModal', 'isAdmin'])
    },
    methods: {
        ...mapActions(['login', 'logout']),
        callback: async function (response) {
            handleLogin(response, this.$store, this.$cookies)
            location.reload()
        },
        handleLogOut: function () {
            handleLogout(this.$store, this.$cookies, this.$router)
        }
    },
    components: {
        ShowModal
    }
}
</script>

<style scoped>
a{
    text-decoration: none;
}
a:active{
    background-color: transparent;
    color: black
}
</style>

