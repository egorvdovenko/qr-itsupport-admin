require('dotenv').config()

export default {
  endpoints: {
    login: {
      url: `${process.env.API_URL}/api/auth/login`,
      method: 'post'
    },
    logout: {
      url: `${process.env.API_URL}/api/auth/logout`,
      method: 'post'
    },
    refresh: {
      url: `${process.env.API_URL}/api/auth/refresh`,
      method: 'post'
    }
  },
  redirects: {
    login: '/account/login'
  },
  cookie: {
    domain: process.env.DOMAIN
  }
}
