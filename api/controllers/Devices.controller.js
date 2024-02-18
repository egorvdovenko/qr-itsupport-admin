import BaseController from '@/api/controllers/Base.controller.js'

class DevicesController extends BaseController {
  static prefix = '/api/Devices';

  getDevices (payload) {
    return this.axios({
      method: 'get',
      url: `${DevicesController.prefix}`,
      params: payload
    })
  }

  getDevicesList (payload) {
    return this.axios({
      method: 'get',
      url: `${DevicesController.prefix}/list`,
      params: payload
    })
  }

  getDevicesListItems () {
    return this.axios({
      method: 'get',
      url: `${DevicesController.prefix}/listItems`
    })
  }

  getPlace (id) {
    return this.axios({
      method: 'get',
      url: `${DevicesController.prefix}/${id}`
    })
  }

  createPlace (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      url: `${DevicesController.prefix}`
    })
  }

  savePlace (payload) {
    const { id } = payload

    return this.axios({
      method: 'put',
      data: payload,
      url: `${DevicesController.prefix}/${id}`
    })
  }

  deletePlace (id) {
    return this.axios({
      method: 'delete',
      url: `${DevicesController.prefix}/${id}`
    })
  }
}

export default DevicesController
