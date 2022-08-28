import axios from 'axios';
import router from "@/router";

/*eslint no-unused-vars: "error"*/
let userData = window.localStorage.getItem('user') !== 'undefined' ? window.localStorage.getItem('user') : null;
userData = userData ? JSON.parse(userData) : null;

const state = {
    user: userData,
}

const mutations = {
    setUser(state, user) {
        state.user = user
    }
}

const actions = {
    login({commit}, data) {
        console.log(data);
        window.localStorage.setItem('token_type', 'Bearer');
        window.localStorage.setItem('access_token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token_type + ' ' + data.access_token
        commit('setUser', data.user);
        router.push({name: "main"});

    },
    logout({commit}) {
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('access_token');
        delete axios.defaults.headers.common['Authorization'];
        commit('setUser', null);

        router.push({name: "login"});


    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
