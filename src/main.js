import App from './App.vue'
import router from './router'
import store from './store/store'
import vue3GoogleLogin from 'vue3-google-login'
import Vue3Cookies from 'vue3-cookies'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faUserGroup, faFireFlameCurved, faClock, faGauge, faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import './assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'vuetify/styles'

const vuetify = createVuetify({
  components,
  directives,
})
library.add(faUserSecret, faUserGroup, faFireFlameCurved, faClock, faGauge, faUser, faKey)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.use(vuetify)
app.use(vue3GoogleLogin, {clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID, ux_mode: 'popup',})
app.use(Vue3Cookies, {
    expireTimes: "1d",
    path: "/",
    domain: '',
    secure: true,
    sameSite: "None"
})
app.mount('#app') 