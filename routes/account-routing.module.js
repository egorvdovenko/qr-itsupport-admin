export default [
  {
    path: '/account',
    component: () => import('~/pages/account.vue').then(m => m.default || m),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('~/pages/account/login.vue').then(m => m.default || m),
        props: ({ query = {} }) => {
          const props = {
            returnUrl: query.returnUrl
          }

          return props
        }
      },
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('~/pages/account/registration.vue').then(m => m.default || m)
      }
    ]
  }
]
