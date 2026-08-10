<template>
    <div class="mx-auto max-w-4xl">
        <header class="border-b border-slate-300 pb-10">
            <p class="mb-5 text-xs font-semibold tracking-[0.24em] text-[#5A98D8]">
                CONTACT
            </p>

            <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                お問い合わせ
            </h1>

            <p class="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                当ブログに関するご意見・ご感想、ご質問や各種ご依頼などは、
                以下のフォームよりお送りください。
            </p>
        </header>

        <section class="grid gap-6 border-b border-slate-300 py-10 sm:grid-cols-[10rem_1fr]">
            <div>
                <p class="text-xs font-semibold tracking-[0.2em] text-[#5A98D8]">
                    01
                </p>
                <h2 class="mt-2 text-base font-bold text-slate-900">
                    Contact Form
                </h2>
            </div>

            <div class="min-w-0 border-t border-slate-200 pt-4">
                <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSe-hOmVKTut8PVtStHtviIJXSEOixi7yHk8N4bRuRRJN6B7Kw/viewform?embedded=true"
                    title="お問い合わせフォーム" class="h-[800px] w-full border-0 sm:h-[900px]" loading="lazy">
                    読み込んでいます…
                </iframe>
            </div>
        </section>

        <footer class="pt-8">
            <NuxtLink to="/" class="text-sm text-slate-500 transition-colors hover:text-[#5A98D8]">
                ← 記事一覧へ戻る
            </NuxtLink>
        </footer>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'お問い合わせ | 潮の香りのする猫の足跡',
    description: '「潮の香りのする猫の足跡」へのお問い合わせフォームページです。'
})
</script>