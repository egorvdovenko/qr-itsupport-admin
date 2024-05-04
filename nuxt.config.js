import tokenAuth from './token-auth.config'
import tokenClaims from './token-claims.config'

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: false,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: 'Административная панель - %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
    '@/assets/less/ant-extensions/main.less'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/api',
    '@/plugins/fragment'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/router'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-token-auth-module',
    'nuxt-token-claims-module',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  styleResources: {
    less: [
      '@/assets/less/main.less'
    ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseUrl: process.env.API_URL
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  router: {
    middleware: [
      'tokenAuth',
      'tokenClaims'
    ]
  },
  tokenAuth,
  tokenClaims,
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      },
      cssModules: {
        modules: {
          localIdentName: '[module]_[local]_[hash:base64:5]'
        }
      }
    }
  }
}
