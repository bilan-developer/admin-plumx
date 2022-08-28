import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);


const currency =  {
    state: {
        name: 'EUR',
    },
};

const loading =  {
    state: {
        status: false
    },
    mutations: {
        startLoading (state) {
            state.status = true
        },
        stopLoading (state) {
            state.status = false
        }
    }
};

const url =  {
    state: {
        params: window.location.search,
    },
    mutations: {
        setParams (state, params) {
            state.params = params
        }
    }
};

// create a Vuex store instance
export const store = new Vuex.Store({
    modules: {
        currency  : currency,
        auth  : auth,
        loading  : loading,
        url  : url,
    }
});