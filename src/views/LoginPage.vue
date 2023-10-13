<template>
    <div class="wrapper">
        <div class="login-wrapper">
            <div class="login-form">
                <h3>WELCOME</h3>
                <div class="credential">
                    <input class="form-control" type="text" placeholder="Username" v-model="userName">
                    <span class="icon"><font-awesome-icon icon="fa-solid fa-user" /></span>
                </div>
                <div class="credential">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                    <span class="icon"><font-awesome-icon icon="fa-solid fa-key" /></span>
                </div>
                <myBtn id="submit" @click="submitLogin" buttonText="SUBMIT" />
            </div>
            <div class="google-login">
                <GoogleLogin class="gauth" :callback="callback" />
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
    background-image: linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('../assets/bg/Landing.jpeg');
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
    border: 1px solid rgba(256, 256, 256, 0.3);
    border-radius: 20px;
    background-color: rgba(256,256,256,0.15);
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
    background-color: rgba(256, 256, 256, 0.8);
    border: none;
    width: 80%;
    text-align: center;
    margin: 5px 0;
    border-radius: 50px;
}
input:hover{
background-color: rgba(256, 256, 256, 1 );
border: none;
box-shadow: 0 0 5px #dbd534;
}
input:focus{
background-color: rgba(256, 256, 256, 1 );
border: none;
box-shadow: 0 0 5px #dbd534;
}
#submit{
    background-color: rgba(256, 256, 256, 0.8);
    border: none;
    border-radius: 50px;
    width: 70%;
    color: black;
    transition: 0.2s ease-in-out;
}
#submit:hover{
    background-color: rgba(256, 256, 256, 1);
    box-shadow: 0 0 5px #dbd534;
    scale: 1.1;
}
.gauth{
    background-color: transparent;
}
.credential{
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in-out;
    margin-right: 3.5vw;
}
.credential:hover{
    scale: 1.1;
}
.icon{
    padding: 5px 10px;
    border-radius: 50px;
    color: rgba(0,0,0,0.9);
    background-color: rgba(256, 256, 256, 0.9) ;
    box-shadow: 0 0 5px #dbd534;
}
h3{
    padding-bottom: 5vh;
}
</style>