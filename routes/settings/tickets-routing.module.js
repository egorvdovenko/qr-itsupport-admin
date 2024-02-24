export default {
  path: 'tickets',
  component: () => import('~/pages/settings/tickets.vue').then(m => m.default || m),
  children: [
    {
      path: '',
      name: 'TicketsList',
      props: ({ query }) => {
        if (query.page) {
          return { page: Number(query.page) }
        }
      },
      component: () => import('~/pages/settings/tickets/list.vue').then(m => m.default || m)
    },
    {
      path: 'edit/:id?',
      name: 'TicketsEdit',
      props: ({ params }) => {
        if (params.id) {
          return { id: Number(params.id) }
        }
      },
      component: () => import('~/pages/settings/tickets/edit.vue').then(m => m.default || m)
    }
  ]
}
