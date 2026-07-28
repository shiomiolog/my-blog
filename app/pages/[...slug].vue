<!-- pages/[...slug].vue -->
<template>
  <div v-if="page" class="max-w-3xl mx-auto">
    <article class="bg-white p-6 sm:p-10 rounded-lg shadow-sm border border-slate-100">
      <!-- 1. 記事ヘッダー (タイトル・日付 & カテゴリー) -->
      <header class="mb-8 pb-6 border-b border-slate-100">
        <!-- タイトル -->
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight mb-4">
          {{ page.title }}
        </h1>

        <!-- 投稿日時 & カテゴリータグ (横並び) -->
        <div class="flex flex-wrap items-center gap-3 text-xs">
          <!-- 投稿日時 -->
          <div v-if="page.date" class="text-slate-400 flex items-center gap-1.5">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time>{{ page.date }}</time>
          </div>

          <!-- カテゴリータグ -->
          <div v-if="page.category">
            <span class="inline-flex items-center font-medium rounded overflow-hidden border border-sky-100">
              <span class="bg-sky-50 text-sky-700 px-2 py-0.5">
                {{ page.category.parent }}
              </span>
              <span class="bg-sky-100/60 text-sky-800 px-2 py-0.5">
                {{ page.category.child }}
              </span>
            </span>
          </div>
        </div>
      </header>
      <!-- 2. 記事本文 -->

      <div class="prose prose-slate max-w-none 
            prose-headings:text-slate-800 prose-headings:font-bold prose-headings:no-underline
            [&_h1_a]:text-inherit [&_h1_a]:no-underline
            [&_h2_a]:text-inherit [&_h2_a]:no-underline
            [&_h3_a]:text-inherit [&_h3_a]:no-underline
            [&_h4_a]:text-inherit [&_h4_a]:no-underline
            
            /* --- 見出しデザイン --- */
            prose-h2:text-xl sm:prose-h2:text-2xl 
            prose-h2:border-l-[5px] prose-h2:border-sky-400 prose-h2:rounded-r-lg
            prose-h2:bg-gradient-to-r prose-h2:from-sky-50/70 prose-h2:to-transparent 
            prose-h2:py-2.5 prose-h2:pl-4 prose-h2:pr-3 
            prose-h2:mt-12 prose-h2:mb-6
            
            prose-h3:text-lg sm:prose-h3:text-xl 
            prose-h3:border-b-2 prose-h3:border-dashed prose-h3:border-sky-200 
            prose-h3:pb-2 prose-h3:mt-8 prose-h3:mb-4 
            prose-h3:flex prose-h3:items-center prose-h3:gap-2
            before:prose-h3:content-[''] before:prose-h3:inline-block before:prose-h3:w-2.5 before:prose-h3:h-2.5 before:prose-h3:rounded-full before:prose-h3:bg-sky-400
            
            prose-h4:text-base prose-h4:text-sky-700 prose-h4:mt-6 prose-h4:mb-3
            
            /* --- テーブル (表) の縦縞（奇数列）カスタマイズ --- */
            prose-table:border-collapse prose-table:w-full prose-table:text-sm
            prose-thead:bg-transparent prose-thead:text-slate-800
            prose-th:p-3 prose-th:font-semibold
            prose-td:p-3 prose-td:border-b prose-td:border-slate-100
            [&_th:nth-child(odd)]:bg-sky-50/60
            [&_td:nth-child(odd)]:bg-sky-50/40
            
            /* --- コードブロック本体 --- */
            prose-pre:relative prose-pre:pt-9 prose-pre:pb-4 prose-pre:px-4 prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200/80 prose-pre:overflow-hidden
            [&_pre_code]:bg-transparent [&_pre_code]:text-slate-800
            [&_pre_span]:!opacity-100
            
            /* --- 言語名ラベルの共通枠組み (ダブルクォーテーションを排除) --- */
            [&_pre:has(code[class*=\'language-\'])::before]:absolute
            [&_pre:has(code[class*=\'language-\'])::before]:top-0
            [&_pre:has(code[class*=\'language-\'])::before]:left-0
            [&_pre:has(code[class*=\'language-\'])::before]:px-2.5
            [&_pre:has(code[class*=\'language-\'])::before]:py-0.5
            [&_pre:has(code[class*=\'language-\'])::before]:text-[11px]
            [&_pre:has(code[class*=\'language-\'])::before]:font-mono
            [&_pre:has(code[class*=\'language-\'])::before]:font-bold
            [&_pre:has(code[class*=\'language-\'])::before]:text-sky-700
            [&_pre:has(code[class*=\'language-\'])::before]:bg-sky-100
            [&_pre:has(code[class*=\'language-\'])::before]:rounded-br
            [&_pre:has(code[class*=\'language-\'])::before]:border-b
            [&_pre:has(code[class*=\'language-\'])::before]:border-r
            [&_pre:has(code[class*=\'language-\'])::before]:border-sky-200/60
            
            /* --- 言語ごとのテキスト定義 --- */
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
            
            /* 本文内リンク */
            prose-a:text-sky-600 hover:prose-a:text-sky-500">
        <ContentRenderer :value="page" />
      </div>
      <!-- 3. フッター (一覧へ戻るボタン) -->
      <footer class="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center">
        <NuxtLink to="/"
          class="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline px-3 py-2 rounded-md hover:bg-sky-50 transition-colors">
          ← 記事一覧に戻る
        </NuxtLink>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 記事データの取得
const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

// 記事が存在しない場合は 404 エラー
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// SEOメタ情報の設定
useSeoMeta({
  title: `${page.value.title} | 潮の香りのする猫の足跡`,
  description: page.value.description
})
</script>