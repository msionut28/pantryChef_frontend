<template>
    <div class="wrapper">
        <div class="login-wrapper">
            <div class="login-form">
                <h3>Log In</h3>
                <input class="form-control" type="text" placeholder="Username" v-model="userName">
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                <myBtn id="submit" @click="submitLogin" buttonText="SUBMIT" />
            </div>
            <div class="google-login">
                <GoogleLogin :callback="callback" />
            </div>
        </div>
    </div>
</template>

<script>
import { decodeCredential } from 'vue3-google-login';
import { mapState, mapActions } from 'vuex';
import { handleLogin, handleLogout, userPassLogin } from '../auth/auth';
import myBtn from '../components/SingleButton.vue'

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
    },
    components:{
        myBtn
    }
}
</script>

<style scoped>
.wrapper{
    background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../assets/bg/Landing.jpeg');
    background-size: cover;
    height: 100vh;
    width: 100vw;
    color: white;
    padding: 15vh;
}
.login-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: auto;
    padding-bottom: 10vh;
    width: 30vw;
    border: 1px solid rgba(256, 256, 256, 0.5);
    background-color: rgba(256,256,256,0.1);
}
.login-form{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
}
#submit{
    margin: 20px 0px;
    border-radius: 50px;
}
.google-login{
    padding-bottom: 30px;
}

input{
    background-color: rgba(256, 256, 256, 0.6);
    border: none;
    width: 80%;
    text-align: center;
    margin: 5px 0;
}
input:focus{
    background-color: rgba(256, 256, 256, 0.8);
    border: none;
    box-shadow: 0 0 5px #dbd534;
}
#submit{
    background-color: rgba(256, 256, 256, 0.6);
    border: none;
    border-radius: 50px;
    width: 80%;
    color: black
}
#submit:hover{
    background-color: rgba(256, 256, 256, 0.8);
}
</style>