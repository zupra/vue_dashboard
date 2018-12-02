const pkg = require('./package')

const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/vue_dashboard/'
        }
      }
    : {}

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:400,500,700&amp;subset=cyrillic'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#26a69a',
    height: '5px'
  },

  /*
  ** Global CSS
  */
  css: [{ src: '~assets/main.styl', lang: 'stylus' }],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/click-outside.js',
    '~plugins/vee-validate.js',
    '~/plugins/vuex-persist.js',
    '~/plugins/axios',
    '~/plugins/fullscreen'

    // '~/plugins/vue-cropper'
    //{ src: '~plugins/vee-validate.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'

    // '@nuxtjs/localtunnel'
    // ['@nuxtjs/localtunnel', { subdomain: 'zupra' }]
  ],
  /*
  ** Axios module configuration
  */
  // env: {
  //   API_URL: 'https://atlas.inaccurate.ru/'
  // },
  axios: {
    // Doc https://github.com/nuxt-community/axios-module#options
    // See https://github.com/klesarev/axios-rus-docs/tree/master/docs
    baseURL: process.env.API_URL || 'http://localhost:3005/'

    // baseURL: process.env.NODE_ENV === 'development' ? '1' : '2'
    // process.env.API_URL || 'https://atlas.inaccurate.ru/'
    // baseUrl: process.env.isDev ? '1' : '2'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ['vee-validate'],
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }

  /*
  ** Router configuration
  */
  //https://toor.co/blog/nuxtjs-smooth-scrolling-with-hash-links/
}
