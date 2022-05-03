import colors from 'vuetify/es5/util/colors'
import * as hosts from './hosts.config.js'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - NASA Agregator',
    title: 'NASA Agregator',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.scss'
  ],

  //Server Middleware
  serverMiddleware: {
    '/api': '~/api'
  },

  // Server configuration
  server: {
    host: hosts.default.host, // default: localhost
    port: hosts.default.port // default: 3000
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          english: 'English',
          french: 'French',
          welcome: 'Welcome',
          home: 'Home',
          login: 'Login',
          about: 'About',
          news: 'News',
          dashboard: 'Dashboard',
          welcome_message: 'Welcome to the NASA Agregator',
          news_manage: 'News Management',
          comments_manage: 'Comments Management',
          explore: 'LET\'S EXPLORE SPACE TOGETHER',
          explore_text: 'You will find here a set of information on space, mostly from NASA APIs. This site aims to exploit them as well as possible and to put forward the relevant information.',
        },
        fr: {
          english: 'Anglais',
          french: 'Français',
          welcome: 'Bienvenue',
          home: 'Accueil',
          login: 'Connexion',
          welcome_message: 'Bienvenue sur l\'agrégateur NASA',
          about: 'À propos',
          dashboard: 'Tableau de bord',
          comments_manage: 'Gestion des commentaires',
          news_manage: 'Gestion des news',
          news: 'Articles',
          explore: 'EXPLORONS L\'ESPACE ENSEMBLE',
          explore_text: 'Vous trouverez ici un ensemble d\'informations sur le spatiale, provenant majoritairement des API de la NASA. Ce site a pour objectif de les exploiter au mieux et de mettre en avant les informations pertinentes.',
        },
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    transpile: [
      "three",
      "threeJS-object-controls"
    ]
  }
}
