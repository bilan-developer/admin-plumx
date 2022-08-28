import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        dark: true,
        themes: {
            dark: {
                green: '#04b797',
                reed: '#f04444',
            },
        }
    }
}

export default new Vuetify(opts)
