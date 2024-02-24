import BaseController from '@/api/controllers/Base.controller.js'

class TicketsController extends BaseController {
  static prefix = '/api/tickets';

  getTickets (payload) {
    return this.axios({
      method: 'get',
      url: `${TicketsController.prefix}`,
      params: payload
    })
  }

  getTicket (id) {
    return this.axios({
      method: 'get',
      url: `${TicketsController.prefix}/${id}`
    })
  }

  createTicket (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      url: `${TicketsController.prefix}`
    })
  }

  saveTicket (payload) {
    const { id } = payload

    return this.axios({
      method: 'put',
      data: payload,
      url: `${TicketsController.prefix}/${id}`
    })
  }

  deleteTicket (id) {
    return this.axios({
      method: 'delete',
      url: `${TicketsController.prefix}/${id}`
    })
  }
}

export default TicketsController
