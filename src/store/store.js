import { createStore } from "vuex";

export default createStore({
    state: {
        isLoggedIn: false,
        showModal: false
    },
    mutations:{
        loginSetter(state, value){
            state.isLoggedIn = value
        },
        modalPopUp(state, value){
            console.log('Setting showModal to:', value)
            state.showModal = value
        },
    },
    actions: {
        login({ commit }) {
            commit('loginSetter', true)
        },
        logout({ commit }) {
            commit('loginSetter', false)
        },
        modal({ commit }) {
            commit('modalPopUp', true)
        },
        noModal({ commit }) {
            commit('modalPopUp', false)
        },
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        showModal: state => state.showModal
    }
})