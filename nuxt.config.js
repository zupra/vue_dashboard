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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#26a69a' },

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
    '~/plugins/vuex-persist.js'
    //{ src: '~plugins/vee-validate.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org
    // '@nuxtjs/auth' Doc: https://auth.nuxtjs.org
    '@nuxtjs/axios'

    // '@nuxtjs/localtunnel'
    // ['@nuxtjs/localtunnel', { subdomain: 'zupra' }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
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
      // vue-svg-loader
      /*
      const svgRule = config.module.rules.find(
        rule => rule.loader === 'url-loader'
      )
      svgRule.test = /\.(png|jpe?g|gif)$/
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      })
      */
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
}
