// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module'
  ],
  plugins: [
    
  ],
  // nitro: {
  //   devProxy: {
  //     '/govApi': {
  //       target: 'https://db.cec.gov.tw/static',
  //       changeOrigin: true,
  //       prependPath: true
  //     }
  //   }
  // },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://db.cec.gov.tw/static/elections/data',
          changeOrigin: true,
        },
        '/govApi': {
          target: 'https://db.cec.gov.tw/static',
          changeOrigin: true,
          prependPath: true
        },
        '/electionApi': {
          target: 'https://db.cec.gov.tw/static/elections',
          changeOrigin: true,
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
  },
  ssr:false
})
