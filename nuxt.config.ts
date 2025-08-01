import tailwindcss from '@tailwindcss/vite'

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
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

})
