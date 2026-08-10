<template>
  <div v-if="page" class="mx-auto max-w-none">
    <div :class="tocLinks.length
      ? isDesktopTocOpen
        ? 'min-[1180px]:grid min-[1180px]:grid-cols-[minmax(0,1fr)_13rem] min-[1180px]:gap-10'
        : 'min-[1180px]:grid min-[1180px]:grid-cols-[minmax(0,1fr)_2.75rem] min-[1180px]:gap-6'
      : ''
      ">
      <article class="min-w-0">
        <!-- 記事ヘッダー -->
        <header class="mb-12 border-b border-slate-300 pb-8">
          <p class="font-mono text-[10px] tracking-[0.22em] text-[#5A98D8]">
            NOTE
            <template v-if="page.category">
              / {{ page.category.parent }} / {{ page.category.child }}
            </template>
          </p>

          <h1 class="mt-4 text-3xl font-semibold leading-[1.4] tracking-tight text-slate-900 sm:text-4xl">
            {{ page.title }}
          </h1>

          <div v-if="page.date" class="mt-6 font-mono text-[11px] tracking-wide text-slate-500">
            <time>{{ page.date }}</time>
          </div>
        </header>

        <!-- スマホ・タブレット用目次 -->
        <details v-if="tocLinks.length" class="group mb-10 border-y border-slate-300 py-4 min-[1180px]:hidden">
          <summary
            class="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-800 [&::-webkit-details-marker]:hidden">
            <span class="flex items-center gap-3">
              <span class="font-mono text-[10px] tracking-[0.18em] text-[#5A98D8]">
                CONTENTS
              </span>
              <span>目次</span>
            </span>

            <svg aria-hidden="true" class="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180"
              viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m6 9 6 6 6-6" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" />
            </svg>
          </summary>

          <ArticleToc :links="tocLinks" class="mt-4" />
        </details>

        <!-- 記事本文 -->
        <div class="prose prose-slate max-w-none
    prose-headings:text-slate-800 prose-headings:font-bold prose-headings:no-underline
    prose-p:leading-8
    prose-li:leading-8

    /* --- 見出しデザイン --- */
    prose-h2:scroll-mt-6
    prose-h2:text-xl sm:prose-h2:text-2xl
    prose-h2:border-l-[5px] prose-h2:border-sky-400 prose-h2:rounded-r-lg
    prose-h2:bg-gradient-to-r prose-h2:from-sky-50/70 prose-h2:to-transparent
    prose-h2:py-2.5 prose-h2:pl-4 prose-h2:pr-3
    prose-h2:mt-12 prose-h2:mb-6

    prose-h3:scroll-mt-6
    prose-h3:text-lg sm:prose-h3:text-xl
    prose-h3:border-b-2 prose-h3:border-dashed prose-h3:border-sky-200
    prose-h3:pb-2 prose-h3:mt-8 prose-h3:mb-4
    prose-h3:flex prose-h3:items-center prose-h3:gap-2
    before:prose-h3:content-['']
    before:prose-h3:inline-block
    before:prose-h3:h-2.5 before:prose-h3:w-2.5
    before:prose-h3:shrink-0
    before:prose-h3:rounded-full
    before:prose-h3:bg-sky-400

    prose-h4:text-base prose-h4:text-sky-700
    prose-h4:mt-6 prose-h4:mb-3

    /* --- テーブル --- */
    prose-table:w-full prose-table:border-collapse prose-table:text-sm
    prose-thead:bg-transparent prose-thead:text-slate-800
    prose-th:p-3 prose-th:font-semibold
    prose-td:border-b prose-td:border-slate-200 prose-td:p-3
    [&_th:nth-child(odd)]:bg-sky-50/60
    [&_td:nth-child(odd)]:bg-sky-50/40

    /* --- コードブロック --- */
    prose-pre:relative prose-pre:overflow-x-auto
    prose-pre:border prose-pre:border-slate-300
    prose-pre:bg-slate-50
    prose-pre:px-4 prose-pre:pb-4 prose-pre:pt-9
    [&_pre_code]:bg-transparent
    [&_pre_code]:text-slate-800
    [&_pre_span]:!opacity-100

    /* --- 言語名ラベル --- */
    [&_pre:has(code[class*=\'language-\'])::before]:absolute
    [&_pre:has(code[class*=\'language-\'])::before]:left-0
    [&_pre:has(code[class*=\'language-\'])::before]:top-0
    [&_pre:has(code[class*=\'language-\'])::before]:border-b
    [&_pre:has(code[class*=\'language-\'])::before]:border-r
    [&_pre:has(code[class*=\'language-\'])::before]:border-sky-200/60
    [&_pre:has(code[class*=\'language-\'])::before]:bg-sky-100
    [&_pre:has(code[class*=\'language-\'])::before]:px-2.5
    [&_pre:has(code[class*=\'language-\'])::before]:py-0.5
    [&_pre:has(code[class*=\'language-\'])::before]:font-mono
    [&_pre:has(code[class*=\'language-\'])::before]:text-[11px]
    [&_pre:has(code[class*=\'language-\'])::before]:font-bold
    [&_pre:has(code[class*=\'language-\'])::before]:text-sky-700
    [&_pre:has(code[class*=\'language-\'])::before]:rounded-br

    /* --- 言語ごとのラベル --- */
    [&_pre:has(.language-typescript)::before]:content-[\'TYPESCRIPT\']
    [&_pre:has(.language-ts)::before]:content-[\'TYPESCRIPT\']
    [&_pre:has(.language-javascript)::before]:content-[\'JAVASCRIPT\']
    [&_pre:has(.language-js)::before]:content-[\'JAVASCRIPT\']
    [&_pre:has(.language-vue)::before]:content-[\'VUE\']
    [&_pre:has(.language-html)::before]:content-[\'HTML\']
    [&_pre:has(.language-css)::before]:content-[\'CSS\']
    [&_pre:has(.language-json)::before]:content-[\'JSON\']
    [&_pre:has(.language-bash)::before]:content-[\'BASH\']
    [&_pre:has(.language-sh)::before]:content-[\'SH\']
    [&_pre:has(.language-python)::before]:content-[\'PYTHON\']

    /* --- 引用・画像・リンク --- */
    prose-blockquote:border-l-2
    prose-blockquote:border-[#5A98D8]
    prose-blockquote:not-italic
    prose-img:mx-auto
    prose-a:text-sky-600
    prose-a:underline
    prose-a:decoration-1
    prose-a:underline-offset-4
    hover:prose-a:text-sky-500">
          <ContentRenderer :value="page" />
        </div>

        <ArticleShare :title="page.title" :path="route.path" />

        <CodocSupport />

        <!-- 記事フッター -->
        <footer class="mt-14 border-t border-slate-300 pt-6">
          <NuxtLink to="/"
            class="group inline-flex items-center gap-3 text-sm text-slate-600 transition-colors hover:text-[#5A98D8]">
            <span class="font-mono text-[10px] tracking-[0.14em]">
              ← INDEX
            </span>
            <span>記事一覧へ戻る</span>
          </NuxtLink>
        </footer>
      </article>

      <!-- PC用追従目次 -->
      <aside v-if="tocLinks.length" class="hidden min-[1180px]:block">
        <!-- 開いている状態 -->
        <div v-if="isDesktopTocOpen"
          class="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-slate-300 pt-5">
          <div class="mb-4 flex items-center justify-between gap-3">
            <p class="font-mono text-[10px] tracking-[0.2em] text-[#5A98D8]">
              CONTENTS
            </p>

            <button type="button"
              class="inline-flex h-7 w-7 shrink-0 items-center justify-center text-slate-400 transition-colors hover:text-[#5A98D8]"
              aria-label="目次を閉じる" @click="isDesktopTocOpen = false">
              <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="m15 6-6 6 6 6" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" />
              </svg>
            </button>
          </div>

          <ArticleToc :links="tocLinks" />
        </div>

        <!-- 閉じている状態 -->
        <button v-else type="button"
          class="sticky top-8 flex w-full flex-col items-center gap-3 border-t border-slate-300 py-4 text-slate-400 transition-colors hover:border-[#5A98D8] hover:text-[#5A98D8]"
          aria-label="目次を開く" @click="isDesktopTocOpen = true">
          <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M8 6h11M8 12h11M8 18h11M4 6h.01M4 12h.01M4 18h.01" stroke-width="1.5" stroke-linecap="square" />
          </svg>

          <span class="font-mono text-[10px] tracking-[0.16em] [writing-mode:vertical-rl]">
            目次
          </span>
        </button>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const isDesktopTocOpen = ref(true)

// 末尾スラッシュの有無にかかわらず、同じ記事パスとして扱う
const contentPath = computed(() => {
  return route.path === '/' ? '/' : route.path.replace(/\/+$/, '')
})

// 記事データの取得
const { data: page } = await useAsyncData(
  `page-${contentPath.value}`,
  () => queryCollection('content').path(contentPath.value).first()
)

// 記事が存在しない場合は 404 エラー
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

type TocLink = {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const tocLinks = computed<TocLink[]>(() => {
  const body = page.value?.body as {
    toc?: {
      links?: TocLink[]
    }
  } | undefined

  return body?.toc?.links ?? []
})

// SEOメタ情報の設定
useSeoMeta({
  title: `${page.value.title} | 潮の香りのする猫の足跡`,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
  ogType: 'article',
  twitterCard: 'summary_large_image'
})

// OGP画像の自動生成 (タイトル・カテゴリーを反映)
defineOgImage('ShiomioBlogTakumi', {
  title: page.value.title,
  category: page.value.category
    ? `${page.value.category.parent} / ${page.value.category.child}`
    : undefined,
  author: '汐猫みお',
  date: page.value.date
})
</script>
