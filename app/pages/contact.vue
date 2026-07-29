<!-- pages/contact.vue -->
<template>
    <div class="max-w-3xl mx-auto space-y-8">
        <!-- ヘッダーカード -->
        <div class="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-100">
            <h1 class="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
                <span class="w-1.5 h-6 bg-sky-400 rounded-full"></span>
                お問い合わせ
            </h1>
            <p class="text-slate-600 text-sm sm:text-base leading-relaxed mt-3">
                当ブログに関するご意見・ご感想、ご質問や各種ご依頼などは、以下のフォームよりお気軽にお送りください。
            </p>
        </div>

        <!-- Google フォーム埋め込みエリア -->
        <div class="bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-slate-100">
            <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSe-hOmVKTut8PVtStHtviIJXSEOixi7yHk8N4bRuRRJN6B7Kw/viewform?embedded=true"
                class="w-full border-0 h-[800px] sm:h-[900px]" loading="lazy">
                読み込んでいます…
            </iframe>
        </div>

        <!-- 記事一覧へ戻る -->
        <div class="text-center pt-2">
            <NuxtLink to="/"
                class="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline px-4 py-2 rounded-md hover:bg-sky-50 transition-colors">
                ← トップページに戻る
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'お問い合わせ | 潮の香りのする猫の足跡',
    description: '「潮の香りのする猫の足跡」へのお問い合わせフォームページです。'
})
</script>