// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
export default {
  // target: 'static',
  // generate: {
  //   fallback: true
  // },
  loading: {
    color: 'rgba(0, 136, 245, 0.5)',
    height: '5px',
    continuous: true,
  },
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/video/play/:id/:ep',
        component: resolve(__dirname, 'pages/video/play/_id.vue')
      })
    }
  },
  server: {
    host: '127.0.0.1' // default: localhost
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'life',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // {src: '~/plugins/vue-awesome-swiper', ssr: false},
    // {src: '~/plugins/dplayer', ssr: false},
    {src: '~/plugins/vue-loading-overlay', ssr: false, mode: 'client'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/device',
    ['@nuxtjs/google-analytics', {
      id: 'UA-181437668-5'
    }],
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    ['nuxt-lazy-load', {
      // These are the default values
      images: true,
      videos: true,
      audios: true,
      iframes: true,
      native: false,
      polyfill: true,
      directiveOnly: true,

      // Default image must be in the static folder
      defaultImage: '/images/loading.gif',

      // To remove class set value to false
      loadingClass: 'isLoading',
      loadedClass: 'isLoaded',
      appendClass: 'lazyLoad',

      observerConfig: {
        // See IntersectionObserver documentation
      }
    }],
    'nuxt-ssr-cache',
  ],
  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      // these are prefixes of pages that need to be cached
      // if you want to cache all pages, just include '/'
      '/',
    ],

    key(route, context) {
      // custom function to return cache key, when used previous
      // properties (useHostPrefix, pages) are ignored. return
      // falsy value to bypass the cache
      if (route === '/') {
        return 'page:home:string';
      }
      let page = route.substr(1).split('/');
      page = page.join('.');
      return `page:${page}:string`;
    },

    store: {
      type: 'redis',
      host: 'localhost',
      ttl: 10 * 60,
      configure: [
        // these values are configured
        // on redis upon initialization
        ['maxmemory', '200mb'],
        ['maxmemory-policy', 'allkeys-lru'],
      ],
    },
  },


  /*
   ** Runtime Config
   */

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.NODE_ENV === 'production' ? 'http://localhost:8000/api' : 'https://api.567.watch/api'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // extractCSS: true,
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
    // extend(config,ctx){
    //   config.plugins.unshift(new LodashModuleReplacementPlugin)
    //   config.module.rules[2].use[0].options.plugins = ['lodash']
    // },
  }
}
