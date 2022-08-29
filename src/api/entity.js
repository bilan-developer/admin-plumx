import axios from 'axios'

export default {
    get(entity, params) {
        return axios.get(`/admin/${entity}`, {params: params})
    },
    show(entity, id) {
        return axios.get(`/admin/${entity}/${id}`)
    },
    destroy(entity, id) {
        return axios.delete(`/admin/${entity}/${id}`)
    },
    save(entity, params) {
        return axios.post(`/admin/${entity}`, params)
    },
    update(entity, id, params) {
        return axios.put(`/admin/${entity}/${id}`, params)
    },
}
