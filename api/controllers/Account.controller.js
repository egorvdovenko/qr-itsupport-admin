import BaseController from '@/api/controllers/Base.controller.js'

class AccountController extends BaseController {
  static prefix = '/api/Account'

  registration (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      baseURL: this.config.investAdminApiUrl,
      url: `${AccountController.prefix}/register`
    })
  }

  getProfile () {
    return this.axios({
      method: 'get',
      baseURL: this.config.investAdminApiUrl,
      url: `${AccountController.prefix}/profile`
    })
  }

  saveProfile (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      baseURL: this.config.investAdminApiUrl,
      url: `${AccountController.prefix}/profile`
    })
  }

  sendPasswordResetEmail (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      baseURL: this.config.investAdminApiUrl,
      url: `${AccountController.prefix}/password/reset/sendEmail`
    })
  }

  resetPassword (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      baseURL: this.config.investAdminApiUrl,
      url: `${AccountController.prefix}/password/reset`
    })
  }
}

export default AccountController
