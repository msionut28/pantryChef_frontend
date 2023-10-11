import { decodeCredential, googleLogout } from 'vue3-google-login';

export const handleLogin =  async function (response, store, cookies) {
    store.dispatch('login')
    const userData = decodeCredential(response.credential)
    console.log(`YOUR USER'S DATA:`, JSON.stringify(userData,null, 2));
    const timestamp = Date.now()
    const currentTime = new Date(timestamp)
    console.log(userData);
    const userName = userData.given_name
    let userId = 1
    cookies.set('user_session', response.credential)

    try{
        const response = await fetch('http://localhost:4000/useradd', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: userName,
                lastLogin: currentTime
            })
        })
        const userResponse = await fetch('http://localhost:4000/users', {
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
                store.dispatch('modal')
            }else {
                console.log('existing user');
            }
        }
        console.log(response.status, userId)
        
    }
    catch (error) {
        console.error(error)
    }
}

export const handleLogout = function (store, cookies) {
    googleLogout()
    cookies.remove('user_session')
    store.dispatch('logout')
    location.reload()
}