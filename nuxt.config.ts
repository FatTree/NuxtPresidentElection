// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    "@nuxtjs/i18n",
  ],
  plugins: [
  ],
  vite: {
    server: {
      proxy: {
        '/elections/data': {
          target: 'https://db.cec.gov.tw/static/elections/data',
          changeOrigin: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_main.scss" as *;'
        }
      }
    }
  }
})