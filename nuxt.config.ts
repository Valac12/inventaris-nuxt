// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxthq/ui', '@pinia/nuxt', '@nuxtjs/supabase'],
  supabase: {
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  ui: {
    global: true,
    safelistColors: ['violet'],
    icons: 'all',
  },
  // use "preference: 'dark'" in colorMode if want to set dark mode by default
  colorMode: { classSuffix: '', preference: 'light' },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  runtimeConfig: {
    midtransServerKey: process.env.NUXT_MIDTRANS_SERVER_KEY,
    public: {
      midtransClientKey: process.env.NUXT_MIDTRANS_CLIENT_KEY,
    },
  },
});
