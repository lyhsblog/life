export default {
  target: 'static',
  generate: {
    fallback: true
  },
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
  server: {
    host: 'localhost' // default: localhost
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'life',
    htmlAttrs: {
      lang: 'en'
    },
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
    {src: '~/plugins/vue-awesome-swiper', ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  /*
   ** Runtime Config
   */

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/api' : 'https://567pic.com/api'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
