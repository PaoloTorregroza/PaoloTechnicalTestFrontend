import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        logged: false,
        userData: {}
    },
    mutations: {
        login (state, user) {
            state.logged = true
            state.userData = user
        },
        logout (state) {
            state.logged = false
            state.userData = {}
        },
        updateUser(state, user) {
            state.userData = user
        }
    },
    plugins: [createPersistedState()]
})