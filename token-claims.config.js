export default {
  middleware: {
    claims: [{
      name: 'userRole'
    }]
  },
  cookie: {
    name: 'tokenAuth.token'
  }
}
