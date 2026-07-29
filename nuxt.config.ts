// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    'nuxt-og-image',
    '@nuxt/fonts',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  fonts: {
    families: [
      { name: 'Noto Sans JP', provider: 'google', global: true }
    ]
  }
})