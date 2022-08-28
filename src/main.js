import Vue from "vue"
import vuetify from '@/plugins/vuetify'
import App from '@/App.vue'
import Auth from '@/plugins/auth';
import Route from '@/router/index'
import {store} from '@/storage/storage';
import Notifications from 'vue-notification'
import axios from 'axios'
import VueAxios from 'vue-axios'
import api from '@/api';
import "@/plugins/index";


window.axios = axios;


Vue.use(Notifications)

Vue.use(VueAxios, axios);

Vue.use(api);

Vue.axios.defaults.baseURL = 'http://localhost/api/v2';
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


Vue.prototype.auth = new Auth(store);

new Vue({
  vuetify,
  store: store,
  router: Route,
  render: h => h(App)
}).$mount('#app')
