// import router from '@/router';
import { decodeCredential, googleLogout } from 'vue3-google-login';
const backendApi = process.env.VUE_APP_BACKEND_API
export const handleLogin =  async function (response, store, cookies) {
    store.dispatch('login')
    const userData = decodeCredential(response.credential)
    const timestamp = Date.now()
    const currentTime = new Date(timestamp)
    const userName = userData.given_name
    let userId = 1
    cookies.set('user_session', response.credential)
    cookies.set(cookies.set('username', userData.given_name))

    try{
        const response = await fetch(`${backendApi}/useradd`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userName,
                lastLogin: currentTime
            })
        })
        const userResponse = await fetch(`${backendApi}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const userData = await userResponse.json()
        const user = userData.find((user)=> user.userName === userName)
        if (user) {
            userId = user._id
            const membership = parseInt(user.membership)
            if (membership === 0 || null){
                console.log('you have no membership assigned');
                cookies.set('new_user', true)
                store.dispatch('modal')
            }else {
                console.log('existing user');
            }
        }
        console.log(response.status, userId)
        location.reload()
        
    }
    catch (error) {
        console.error(error)
    }
}

export const handleLogout = function (store, cookies, router) {
    googleLogout()
    cookies.remove('user_session')
    cookies.remove('admin_session')
    cookies.remove('username')
    store.dispatch('logout')
    router.push({path: '/'})
}

export async function userPassLogin(userName, password, store, cookies, router){
    try{
        console.log('trying to fetch data')
        const response = await fetch(`${backendApi}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        })
        console.log('Request SENT!')
        if(response.ok){
            const data = await response.json()
            console.log('inside the response')
            if(data.isAdmin){
                console.log('ADMIN LOGGED IN')
                store.dispatch('isAdmin')
                console.log('LOGGED IN AS AN ADMIN!')
                console.log(store.getters.isAdmin);
                cookies.set('admin_session', data.token)
                cookies.set('username', data.userName)
                router.push({path: '/home'})
            }else  if (data.token){
                store.dispatch('login')
                console.log('Store login dispatched')
                cookies.set('userpass_session', data.token)
                cookies.set('username', data.userName)
                router.push({path: '/home'})
            } else{
                location.reload()
                console.log('CREDENTIALS DO NOT MATCH OUR DATABASE');
            }
        } else{
            alert('incorrect credentials!')
        }
    }catch(error){
        console.error(error)
    }
}