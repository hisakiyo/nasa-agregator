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
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
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
    '@nuxtjs/auth',
    '@nuxtjs/i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://nasa.gmarette.xyz' : 'http://' + hosts.default.host + ':' + hosts.default.port,
  },

  auth: {
    localStorage: true,
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get', propertyName: false },
        },
      },
    },
    redirect: {
      callback: '/login',
      login: '/admin',
      logout: '/admin',
      home: '/admin'
    },
  },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
    vueI18n: {
      fallbackLocale: 'fr',
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
          latest_posts_title: 'The latest news',
          latest_posts_content: 'Check out the latest articles published by NASA as well as our own articles.',
          published_date: 'Published on',
          iss_explorer_text: 'This page allows you to learn more about the International Space Station, some statistics and the current crew on board.',
          more: 'Read more..',
          madeby: 'Made by',
          and: 'and',
          back: 'Back',
          comments_title: 'Your comments',
          comments_text: 'Before being published, your comment goes through a validation stage.',
          comments_send: 'Send a comment',
          comments_pseudo: 'Pseudonym',
          comments_mail: 'Mail address',
          comments_comment: 'Comment',
          comments_send_button: 'Send',
          comments_status: 'Your comment has been successfully submitted.',
          about_first: 'This website was designed and developed by MARETTE Gauthier and CLAIRET Damien, as part of a project on Web Services during their first year of Master I2L.',
          about_second: 'It uses NASA\'s public APIs as well as internal APIs to publish articles and manage comments posted on the site (validation system).',
          about_third: 'The project has an administration interface for the management of articles and comments, accessible by',
          about_button: 'clicking here',
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
          news_manage: 'Gestion des articles',
          news: 'Articles',
          explore: 'EXPLORONS L\'ESPACE ENSEMBLE',
          explore_text: 'Vous trouverez ici un ensemble d\'informations sur le spatiale, provenant majoritairement des API de la NASA. Ce site a pour objectif de les exploiter au mieux et de mettre en avant les informations pertinentes.',
          latest_posts_title: 'Les dernières actualités',
          latest_posts_content: 'Découvrez les derniers articles publiés par la NASA ainsi que nos propres articles.',
          published_date: 'Publié le',
          iss_explorer_text: 'Cette page vous permet d\'en apprendre un peu plus sur la station spatiale internationale, quelques statistiques ainsi que l\'équipage à bord actuellement.',
          more: 'En découvrir plus..',
          madeby: 'Pensé et développé par',
          and: 'et',
          back: 'Retour',
          comments_title: 'Vos commentaires',
          comments_text: 'Avant d\'être publié, votre commentaire passe par une étape de validation.',
          comments_send: 'Envoyer un commentaire',
          comments_pseudo: 'Pseudonyme',
          comments_mail: 'Adresse mail',
          comments_comment: 'Commentaire',
          comments_send_button: 'Envoyer',
          comments_status: 'Votre commentaire a été envoyé avec succès.',
          about_first: 'Ce site internet a été pensé et développé par MARETTE Gauthier et CLAIRET Damien, dans le cadre d\'un projet sur les Web Services durant leur première année de Master I2L.',
          about_second: 'Il exploite les API publiques de la NASA ainsi que des API internes permettant de publier des articles ainsi que de gérer les commentaires postés sur le site (système de validation).',
          about_third: 'Le projet dispose d\'une interface d\'administration pour la gestion des articles et des commentaires, accessible en',
          about_button: 'cliquant ici',
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
