import user from '@/api/user';
import entity from '@/api/entity';

const api = {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    api: {
                        user: user,
                        entity: entity,
                    }
                }
            },
        });
    }

}

export default api
