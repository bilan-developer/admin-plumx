import axios from 'axios'

export default {
    login(params) {
        return axios.post(`/auth/login`, params)
    },
    saveFields(params) {
        return axios.put(`/user/fields`, params)
    },
}