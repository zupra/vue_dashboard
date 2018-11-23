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
    // Doc: https://axios.nuxtjs.org
    // '@nuxtjs/auth' Doc: https://auth.nuxtjs.org
    '@nuxtjs/axios'

    // '@nuxtjs/localtunnel'
    // ['@nuxtjs/localtunnel', { subdomain: 'zupra' }]
  ],
  /*
  ** Axios module configuration
  */
  env: {
    API_URL: 'http://localhost:3000/api/'
  },
  axios: {
    baseURL: process.env.API_URL || 'http://localhost:3005/'

    // proxy: true,
    // proxy: {
    //   '/api': 'http://localhost:6060'
    // }
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://1' : 'http://2' //process.env.API_URL || 'https://atlas.inaccurate.ru/'

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

  /*
  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      // const findEl = async (hash, x) => {
      //   return (
      //     document.querySelector(hash) ||
      //     new Promise((resolve, reject) => {
      //       if (x > 10) {
      //         return resolve()
      //       }
      //       setTimeout(() => {
      //         resolve(findEl(hash, ++x || 1))
      //       }, 500)
      //     })
      //   )
      // }

      if (to.hash) {
        //let el = await findEl(to.hash)
        const el = document.querySelector(to.hash)
        const area = document.querySelector('#main .scrollableArea')
        if ('scrollBehavior' in document.documentElement.style) {
          return area.scrollTo({
            top: el.offsetTop,
            behavior: 'smooth'
          })
        } else {
          return area.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    }
  }
  */

  /*
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (
          to.matched.some(r => r.components.default.options.scrollToTop)
        ) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  }
*/

  /*
  router: {
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 90, y: 0 }
    }
  }
*/

  // render: {
  //   bundleRenderer: {
  //     directives: {
  //       custom1: function (el, dir) {
  //         // something ...
  //       }
  //     }
  //   }
  // }
}
