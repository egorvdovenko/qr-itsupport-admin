import qs from 'qs'
import AccountController from '@/api/controllers/Account.controller.js'
import FilesController from '@/api/controllers/Files.controller.js'
import DevicesController from '~/api/controllers/Devices.controller.js'
import ServicesController from '~/api/controllers/Services.controller.js'
import TicketsController from '~/api/controllers/Tickets.controller.js'
import UsersController from '~/api/controllers/Users.controller.js'

export default function ({ $axios, $config }, inject) {
  $axios.defaults.paramsSerializer = params =>
    qs.stringify(params, {
      skipNulls: true,
      allowDots: true,
      encode: true
    })

  const api = {
    accountController: new AccountController($axios, $config),
    filesController: new FilesController($axios, $config),
    devicesController: new DevicesController($axios, $config),
    servicesController: new ServicesController($axios, $config),
    ticketsController: new TicketsController($axios, $config),
    usersController: new UsersController($axios, $config)
  }

  inject('api', api)
}
