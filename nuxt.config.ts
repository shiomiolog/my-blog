// nuxt.config.ts
export default defineNuxtConfig({
  site: {
    url: 'https://blog.shiomiolog.com',
    name: '潮の香りのする猫の足跡'
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    'nuxt-og-image',
    '@nuxt/fonts',
  ],

  nitro: {
    preset: 'cloudflare_module',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  ogImage: {
    enabled: true,
    zeroRuntime: true,
    runtimeCacheStorage: false
  },

  devtools: { enabled: true },
  compatibilityDate: '2026-07-29',

  // Nuxt Content v3 の設定
  content: {
    build: {
      markdown: {
        toc: {
          depth: 0,
          searchDepth: 0
        },
        highlight: {
          theme: 'github-light'
        }
      }
    }
  },

  runtimeConfig: {
    uploadApiKey: process.env.NUXT_UPLOAD_API_KEY
  },

  fonts: {
    families: [
      { name: 'Noto Sans JP', provider: 'google', global: true }
    ]
  },

  hooks: {
    'pages:extend'(pages) {
      if (process.env.NODE_ENV === 'production') {
        const filteredPages = pages.filter(p => !p.path?.startsWith('/admin'))
        pages.length = 0
        pages.push(...filteredPages)
      }
    }
  },
})