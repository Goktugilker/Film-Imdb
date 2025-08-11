import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiKey: process.env.API_KEY,
      accessToken: process.env.ACCESS_TOKEN,
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
  ],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'tr',
    locales: [
      { code: 'tr', name: 'Türkçe', iso: 'tr-TR', file: 'tr.json' },
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
    ],
  },
})
