import devicesRoutingModule from './settings/devices-routing.module.js'
import servicesRoutingModule from './settings/services-routing.module.js'
import ticketsRoutingModule from './settings/tickets-routing.module.js'
import usersRoutingModule from './settings/users-routing.module.js'

export default [
  {
    path: '/settings',
    component: () => import('~/pages/settings.vue').then(m => m.default || m),
    children: [
      devicesRoutingModule,
      servicesRoutingModule,
      ticketsRoutingModule,
      usersRoutingModule
    ]
  }
]
