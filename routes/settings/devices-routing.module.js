export default {
  path: 'devices',
  component: () => import('~/pages/settings/devices.vue').then(m => m.default || m),
  children: [
    {
      path: '',
      name: 'DevicesList',
      props: ({ query }) => {
        if (query.page) {
          return { page: Number(query.page) }
        }
      },
      component: () => import('~/pages/settings/devices/list.vue').then(m => m.default || m)
    },
    {
      path: 'edit/:id?',
      name: 'DevicesEdit',
      props: ({ params }) => {
        if (params.id) {
          return { id: Number(params.id) }
        }
      },
      component: () => import('~/pages/settings/devices/edit.vue').then(m => m.default || m)
    }
  ]
}
