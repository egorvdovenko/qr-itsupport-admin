export default {
  path: 'users',
  component: () => import('~/pages/settings/users.vue').then(m => m.default || m),
  children: [
    {
      path: '',
      name: 'UsersList',
      props: ({ query }) => {
        if (query.page) {
          return { page: Number(query.page) }
        }
      },
      component: () => import('~/pages/settings/users/list.vue').then(m => m.default || m)
    },
    {
      path: 'edit/:id?',
      name: 'UsersEdit',
      props: ({ params }) => {
        if (params.id) {
          return { id: Number(params.id) }
        }
      },
      component: () => import('~/pages/settings/users/edit.vue').then(m => m.default || m)
    }
  ]
}
