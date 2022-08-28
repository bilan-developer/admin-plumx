import {store} from "@/storage/storage";
import axios from 'axios'


class Auth {
    constructor(store) {
        this.store = store;
        this.access_token = window.localStorage.getItem('access_token') !== 'undefined' ? window.localStorage.getItem('access_token') : null;
        let userData = window.localStorage.getItem('user') !== 'undefined' ? window.localStorage.getItem('user') : null;
        this.user = userData ? JSON.parse(userData) : null;
        console.log(this.access_token);

        if (this.access_token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.access_token;

            this.getUser();
        }
    }

    login(data) {
        window.localStorage.setItem('access_token', data.token);
        window.localStorage.setItem('user', JSON.stringify(data));

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        this.access_token = data.token;
        this.user = data;

        console.log(this.store);
        this.store.commit('auth/setUser', data);
    }

    getUser() {
        axios.get('/auth/me').then(r => {
            this.user = r.data.data;
            if (r.data.status === 200) {
                this.store.commit('auth/setUser', this.user);
                window.localStorage.setItem('user', JSON.stringify(this.user));
            } else {
                this.logout();
            }
        }).catch(r => {
            if (r.status === 401) {
                this.logout();
            }
        });
    }

    setUser(user) {
        this.user = user;
        this.store.commit('setUser', user);
        window.localStorage.setItem('user', JSON.stringify(user));

    }

    logout() {
        axios.patch('/auth/logout').then(() => {
            this.user = '';
            this.access_token = '';
            store.dispatch('auth/logout');
        });
    }

    check() {
        return !!this.access_token;
    }
}

export default Auth;
