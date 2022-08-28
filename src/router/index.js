import Vue from 'vue';
import VueRouter from 'vue-router';
import main from './main';
import login from './login';

const routes = [
	...main,
	...login,
];

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: routes
})

router.beforeEach((to, from, next) => {
	document.title = to.meta.title + ' - Admin EasyTour'

	if(to.matched.some(record => record.meta.all)) {
		next()
	} else {
		if(to.matched.some(record => record.meta.requiresAuth) && window.localStorage.getItem('access_token') == null) {
			next({ name: "login"})
		}	else if(to.matched.some(record => record.meta.guest) && window.localStorage.getItem('access_token') || !to.name) {
			next({ name: "main"})
		}else{
			next();
		}
	}



})

export default router;
