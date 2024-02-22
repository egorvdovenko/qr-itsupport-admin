export default {
  path: 'services',
  component: () => import('~/pages/settings/services.vue').then(m => m.default || m),
  children: [
    {
      path: '',
      name: 'ServicesList',
      props: ({ query }) => {
        if (query.page) {
          return { page: Number(query.page) }
        }
      },
      component: () => import('~/pages/settings/services/list.vue').then(m => m.default || m)
    },
    {
      path: 'edit/:id?',
      name: 'ServicesEdit',
      props: ({ params }) => {
        if (params.id) {
          return { id: Number(params.id) }
        }
      },
      component: () => import('~/pages/settings/services/edit.vue').then(m => m.default || m)
    }
  ]
}
