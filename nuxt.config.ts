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

  // (.env の NUXT_UPLOAD_API_KEY を自動紐付け)
  runtimeConfig: {
    uploadApiKey: process.env.NUXT_UPLOAD_API_KEY
  },

  fonts: {
    families: [
      { name: 'Noto Sans JP', provider: 'google', global: true }
    ]
  },

  // 本番ビルド(production)の時だけ /admin 配下のページを削除する
  hooks: {
    'pages:extend'(pages) {
      if (process.env.NODE_ENV === 'production') {
        const filteredPages = pages.filter(p => !p.path?.startsWith('/admin'))
        pages.length = 0
        pages.push(...filteredPages)
      }
    }
  }
})