import BaseController from '@/api/controllers/Base.controller.js'

class ServicesController extends BaseController {
  static prefix = '/api/services';

  getServices (payload) {
    return this.axios({
      method: 'get',
      url: `${ServicesController.prefix}`,
      params: payload
    })
  }

  getService (id) {
    return this.axios({
      method: 'get',
      url: `${ServicesController.prefix}/${id}`
    })
  }

  createService (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      url: `${ServicesController.prefix}`
    })
  }

  saveService (payload) {
    const { id } = payload

    return this.axios({
      method: 'put',
      data: payload,
      url: `${ServicesController.prefix}/${id}`
    })
  }

  deleteService (id) {
    return this.axios({
      method: 'delete',
      url: `${ServicesController.prefix}/${id}`
    })
  }
}

export default ServicesController
