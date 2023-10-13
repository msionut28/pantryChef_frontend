import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faUserGroup, faFireFlameCurved, faClock, faGauge, faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import Vue3Cookies from 'vue3-cookies'
import store from './store/store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './assets/css/styles.css'

library.add(faUserSecret, faUserGroup, faFireFlameCurved, faClock, faGauge, faUser, faKey)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.use(vue3GoogleLogin, {clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID, ux_mode: 'popup',})
app.use(Vue3Cookies, {
    expireTimes: "1d",
    path: "/",
    domain: '',
    secure: true,
    sameSite: "None"
})
app.mount('#app') 