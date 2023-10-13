<template>
    <h1>LOGIN DESIGN PAGE</h1>
    <div class="login-wrapper">
        <div class="login-form">
            <h3>Log In</h3>
            <input class="form-control" type="text" placeholder="Username" v-model="userName">
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
            <button type="button" name="" id="submit" class="btn btn-primary" @click="submitLogin">Submit</button>
        </div>
        <div class="google-login">
            <GoogleLogin :callback="callback" />
        </div>
    </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
import { mapState, mapActions } from 'vuex';
import { handleLogin, handleLogout, userPassLogin } from '../auth/auth';

export default {
    name: 'LoginPage',
    data: () => ({
        isInit: false,
        userName: '',
        password: '',
        lastLogin: '',
    }),
    computed: {
        ...mapState(['isLoggedIn'])
    },
    mounted() {
        if(this.$cookies.isKey('user_session')) {
            this.$store.dispatch('login')
            const userData = decodeCredential(this.$cookies.get('user_session'))
            this.userName = userData.given_name
        }
    },
    methods: {
        ...mapActions(['login', 'logout']),
        callback: async function (response) {
            handleLogin(response, this.$store, this.$cookies)
            this.$router.push({path: '/home'})
        },
        handleLogOut: function () {
            handleLogout(this.$store, this.$cookies, this.$router)
        },
        submitLogin: function () {
            userPassLogin(this.userName, this.password, this.$store, this.$cookies, this.$router)
        }
    }
}
</script>

<style scoped>

.login-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
    width: 30vw;
    border: 1px solid black;
}
.login-form{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.login-form > input {
    width: 80%;
    text-align: center;
    margin: 5px 0;
}
#submit{
    margin: 20px 0px;
    border-radius: 50px;
}
.google-login{
    padding-bottom: 30px;
}
</style>