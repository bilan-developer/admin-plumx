export default [
	{
		path: '/login',
		name: 'login',
		meta: { guest: true, title: 'Логин' },
		component: () => import('@/pages/login/index')
	},
]