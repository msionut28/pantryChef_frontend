import { createStore } from "vuex";

export default createStore({
    state: {
        isLoggedIn: false,
        showModal: false,
        isAdmin: false,
    },
    mutations:{
        loginSetter(state, value){
            state.isLoggedIn = value
        },
        modalPopUp(state, value){
            console.log('Setting showModal to:', value)
            state.showModal = value
        },
        adminChecker(state, value){
            console.log('Setting isAdmin to:', value)
            state.isAdmin = value
        }
    },
    actions: {
        login({ commit }) {
            commit('loginSetter', true)
        },
        logout({ commit }) {
            commit('loginSetter', false)
            commit('adminChecker', false)
        },
        modal({ commit }) {
            commit('modalPopUp', true)
        },
        noModal({ commit }) {
            commit('modalPopUp', false)
        },
        isAdmin({ commit }) {
            commit('adminChecker', true)
            commit('loginSetter', true)
        }
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
        showModal: state => state.showModal,
        isAdmin: state => state.isAdmin
    }
})