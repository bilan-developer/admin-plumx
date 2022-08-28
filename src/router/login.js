export default [
	{
		path: '/admin/login',
		name: 'login',
		meta: { guest: true, title: 'Логин' },
		component: () => import('@/pages/login/index')
	},
]