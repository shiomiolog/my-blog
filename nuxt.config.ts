// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    'nuxt-og-image',
    '@nuxt/fonts',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2026-07-29',

  // 🔽 ここを追加！ (.env の NUXT_UPLOAD_API_KEY を自動紐付けします)
  runtimeConfig: {
    uploadApiKey: process.env.NUXT_UPLOAD_API_KEY
  },

  fonts: {
    families: [
      { name: 'Noto Sans JP', provider: 'google', global: true }
    ]
  }
})