import BaseController from '@/api/controllers/Base.controller.js'

class DevicesController extends BaseController {
  static prefix = '/api/devices';

  getDevices (payload) {
    return this.axios({
      method: 'get',
      url: `${DevicesController.prefix}`,
      params: payload
    })
  }

  getDevice (id) {
    return this.axios({
      method: 'get',
      url: `${DevicesController.prefix}/${id}`
    })
  }

  createDevice (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      url: `${DevicesController.prefix}`
    })
  }

  saveDevice (payload) {
    const { id } = payload

    return this.axios({
      method: 'put',
      data: payload,
      url: `${DevicesController.prefix}/${id}`
    })
  }

  deleteDevice (id) {
    return this.axios({
      method: 'delete',
      url: `${DevicesController.prefix}/${id}`
    })
  }
}

export default DevicesController
