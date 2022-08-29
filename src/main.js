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
import DatetimePicker from 'vuetify-datetime-picker'

window.axios = axios;


Vue.use(Notifications)
Vue.use(VueAxios, axios);
Vue.use(DatetimePicker)

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;


Vue.use(api);


Vue.prototype.auth = new Auth(store);

new Vue({
  vuetify,
  store: store,
  router: Route,
  render: h => h(App)
}).$mount('#app')
