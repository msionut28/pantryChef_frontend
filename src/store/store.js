import { createStore } from "vuex";

export default createStore({
    state: {
        isLoggedIn: false
    },
    mutations:{
        loginSetter(state, value){
            state.isLoggedIn = value
        }
    },
    actions: {
        login({ commit }) {
            // eslint-disable-next-line no-undef
            commit('loginSetter', true)
        },
        logout({ commit}) {
            // eslint-disable-next-line no-undef
            commit('loginSetter', false)
        }
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn
    }
})