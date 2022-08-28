import Vue from 'vue';
import axios from 'axios';
import {store} from '@/storage/storage';

const buildAxios = () => {
    Vue.prototype.$http = axios;
    Vue.prototype.$http.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL;
    console.log(444);

    Vue.prototype.$http.interceptors.response.use(
        res => res,

        error => {

            console.log(error);
            console.log(error.response);
            if (error.response.status === 500) {
                Vue.prototype.$notify({group: 'foo', type: 'error', text: error.response.data.message});
                console.log(error.response);
                return Promise.reject(error)
            }

            if (error.response.status === 401) {
                Vue.prototype.$notify({group: 'foo', type: 'error', text: 'User not authorized.'});
                store.dispatch('auth/logout');
                return Promise.reject(error)
            }


            if (error.response.status === 422) {
                Vue.prototype.$notify({group: 'foo', type: 'error', text: 'Field validation error.'});

                console.log(error.response.data);

                Object.keys(error.response.data.errors).forEach(key => {
                    Vue.prototype.$notify({
                        group: 'foo',
                        type: 'error',
                        title: key,
                        text: error.response.data.errors[key][0]
                    });
                })
                return Promise.reject(error)

            }

            Vue.prototype.$notify({group: 'foo', type: 'error', text: error.message});

            return Promise.reject(error)
        }
    )
}

export default buildAxios;
