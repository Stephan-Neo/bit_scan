// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-server-utils',
  ],
  nuxtServerUtils: {
    enabled: true, // default
    enableDevTools: true, // default
    mongodbUri: process.env.MONGODB_URI,
  },
})
