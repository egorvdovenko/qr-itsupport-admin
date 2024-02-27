import qs from 'qs'
import AuthController from '@/api/controllers/Auth.controller.js'
import DevicesController from '~/api/controllers/Devices.controller.js'
import ServicesController from '~/api/controllers/Services.controller.js'
import TicketsController from '~/api/controllers/Tickets.controller.js'
import UsersController from '~/api/controllers/Users.controller.js'
import DocumentsController from '~/api/controllers/Documents.controller.js'

export default function ({ $axios, $config }, inject) {
  $axios.defaults.paramsSerializer = params =>
    qs.stringify(params, {
      skipNulls: true,
      allowDots: true,
      encode: true
    })

  const api = {
    accountController: new AuthController($axios, $config),
    devicesController: new DevicesController($axios, $config),
    servicesController: new ServicesController($axios, $config),
    ticketsController: new TicketsController($axios, $config),
    usersController: new UsersController($axios, $config),
    documentsController: new DocumentsController($axios, $config)
  }

  inject('api', api)
}
