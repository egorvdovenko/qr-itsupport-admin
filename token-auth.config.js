require('dotenv').config()

export default {
  endpoints: {
    login: {
      url: `${process.env.API_URL}/api/Account/login`,
      method: 'post'
    },
    logout: {
      url: `${process.env.API_URL}/api/Account/logout`,
      method: 'post'
    },
    refresh: {
      url: `${process.env.API_URL}/api/Account/refresh`,
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
