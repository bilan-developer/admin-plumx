export default [
	{
		path: '',
		name: 'main',
		meta: { requiresAuth: true, title: 'Главная'},
		component: () => import('@/pages/main/index')
	},
	{
		path: '/entity/:entity',
		meta: { requiresAuth: true},
		component: {
			render: h => h('router-view')
		},
		children: [
			{
				path: '',
				meta: { requiresAuth: true, title: 'Просмотр'},
				name: 'entity',
				component: () => import('@/pages/entity/index')
			},
			{
				path: 'edit/:id',
				meta: { requiresAuth: true, title: 'Редактировать'},
				name: 'entity-edit',
				component: () => import('@/pages/entity/form')
			},
			{
				path: 'create',
				meta: { requiresAuth: true, title: 'Создать'},
				name: 'entity-create',
				component: () => import('@/pages/entity/form')
			}
		],
	},
]
