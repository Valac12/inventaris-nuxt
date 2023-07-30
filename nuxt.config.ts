// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', '@pinia/nuxt', '@nuxtjs/supabase'],
  runtimeConfig: {
    public: {
      supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY,
      },
    },
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
  ssr: false,
});
