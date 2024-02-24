import BaseController from '@/api/controllers/Base.controller.js'

class UsersController extends BaseController {
  static prefix = '/api/users';

  getUsers (payload) {
    return this.axios({
      method: 'get',
      url: `${UsersController.prefix}`,
      params: payload
    })
  }

  getUser (id) {
    return this.axios({
      method: 'get',
      url: `${UsersController.prefix}/${id}`
    })
  }

  createUser (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      url: `${UsersController.prefix}`
    })
  }

  saveUser (payload) {
    const { id } = payload

    return this.axios({
      method: 'put',
      data: payload,
      url: `${UsersController.prefix}/${id}`
    })
  }

  deleteUser (id) {
    return this.axios({
      method: 'delete',
      url: `${UsersController.prefix}/${id}`
    })
  }
}

export default UsersController
