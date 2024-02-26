import BaseController from '@/api/controllers/Base.controller.js'

class AuthController extends BaseController {
  static prefix = '/api/auth'

  registration (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      baseURL: this.config.investAdminApiUrl,
      url: `${AuthController.prefix}/register`
    })
  }

  getProfile () {
    return this.axios({
      method: 'get',
      baseURL: this.config.investAdminApiUrl,
      url: `${AuthController.prefix}/profile`
    })
  }

  saveProfile (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      baseURL: this.config.investAdminApiUrl,
      url: `${AuthController.prefix}/profile`
    })
  }

  sendPasswordResetEmail (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      baseURL: this.config.investAdminApiUrl,
      url: `${AuthController.prefix}/password/reset/sendEmail`
    })
  }

  resetPassword (payload) {
    return this.axios({
      method: 'post',
      data: payload,
      baseURL: this.config.investAdminApiUrl,
      url: `${AuthController.prefix}/password/reset`
    })
  }
}

export default AuthController
