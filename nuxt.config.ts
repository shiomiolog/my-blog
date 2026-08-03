// nuxt.config.ts
export default defineNuxtConfig({
  // 💡 1. OGP画像の絶対パス生成に必要なサイトURL（ご自身の本番ドメインに変更してください）
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
  devtools: { enabled: true },
  compatibilityDate: '2026-07-29',

  // 💡 2. nuxt-og-image の動作設定
  ogImage: {
    // コンポーネント経由での描画設定を有効化
    enabled: true,
  },

  // Nuxt Content v3 の設定
  content: {
    build: {
      markdown: {
        // 見出しのアンカーリンク（<a>タグ）の自動生成をオフにする
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
  },
})