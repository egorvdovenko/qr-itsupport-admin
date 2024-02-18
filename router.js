import Vue from 'vue'
import Router from 'vue-router'
import accountRoutingModule from '@/routes/account-routing.module.js'
import settingsRoutingModule from '@/routes/settings-routing.module.js'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior () {
      return { x: 0, y: 0 }
    },
    routes: [
      {
        path: '/',
        name: 'Index',
        component: () => import('~/pages/index.vue').then(m => m.default || m)
      },
      ...accountRoutingModule,
      ...settingsRoutingModule
    ]
  })
}
