<!-- pages/about.vue -->
<template>
    <div class="max-w-3xl mx-auto space-y-8">
        <!-- ヘッダーカード -->
        <div class="bg-white p-6 sm:p-10 rounded-lg shadow-sm border border-slate-100 text-center">
            <!-- 🐾アイコンから画像に変更 -->
            <div
                class="w-24 h-24 mx-auto mb-4 bg-sky-50 rounded-full flex items-center justify-center shadow-inner overflow-hidden border-2 border-white ring-2 ring-sky-100">
                <img src="/avatar.webp" alt="汐猫みおのアバター" class="w-full h-full object-cover" />
            </div>
            <h1 class="text-2xl sm:text-3xl font-bold text-slate-800">汐猫みお / SHIONE Mio</h1>
            <p class="text-sky-600 font-medium text-sm mt-1">Web Developer & Researcher</p>

            <p class="text-slate-600 text-sm sm:text-base leading-relaxed mt-4 max-w-xl mx-auto">
                研究の知見、Web・セキュリティ・低レイヤーを中心とした技術メモ、読んだ本のログ、そして日々の思考を記録する個人ブログです。
                学んだことや試したことを言葉にして残す場所として運用しています。
            </p>
        </div>

        <!-- ブログについて -->
        <section class="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-100 space-y-4">
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span class="w-1.5 h-5 bg-sky-400 rounded-full"></span>
                このブログについて
            </h2>
            <p class="text-slate-600 text-sm leading-relaxed">
                「潮の香りのする猫の足跡」は、専門的なアウトプットから日々の雑記まで、自身の活動ログをストックしておくためのブログです。主に以下の4つのテーマを中心に発信しています。
            </p>

            <!-- 4つの柱（カテゴリー紹介） -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div class="p-4 bg-sky-50/40 rounded-lg border border-sky-100/80">
                    <div class="font-bold text-slate-800 flex items-center gap-2 mb-1">
                        <span class="text-lg">🔬</span> 研究 (Research)
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        専門分野の研究ノートや発表まとめ、論文の要約やサーベイの記録など。
                    </p>
                </div>

                <div class="p-4 bg-sky-50/40 rounded-lg border border-sky-100/80">
                    <div class="font-bold text-slate-800 flex items-center gap-2 mb-1">
                        <span class="text-lg">💻</span> 技術 (Tech)
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        Web開発（Nuxt / TS / Go等）、セキュリティ、低レイヤー（OS・コンパイラ・ネットワーク・C/Rust等）の検証・開発ログ。
                    </p>
                </div>

                <div class="p-4 bg-sky-50/40 rounded-lg border border-sky-100/80">
                    <div class="font-bold text-slate-800 flex items-center gap-2 mb-1">
                        <span class="text-lg">📚</span> 読書 (Books)
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        技術書・専門書から小説・新書まで、感銘を受けた書籍の書評や学びのメモ。
                    </p>
                </div>

                <div class="p-4 bg-sky-50/40 rounded-lg border border-sky-100/80">
                    <div class="font-bold text-slate-800 flex items-center gap-2 mb-1">
                        <span class="text-lg">☕</span> 日常 (Life)
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        日々考えていることや買ってよかったもののレビュー、開発雑記や雑多な手記。
                    </p>
                </div>
            </div>
        </section>

        <!-- 技術構成（テックスタック） -->
        <section class="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-100 space-y-4">
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span class="w-1.5 h-5 bg-sky-400 rounded-full"></span>
                このブログの技術構成
            </h2>
            <p class="text-slate-600 text-sm">
                当ブログは最新の技術スタックを用いて自作・運用されています。
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2">
                <div class="p-3 bg-slate-50 rounded-md border border-slate-100 flex items-center justify-between">
                    <span class="font-semibold text-slate-700">Framework</span>
                    <span class="text-xs bg-sky-100 text-sky-800 font-medium px-2.5 py-1 rounded">Nuxt 4</span>
                </div>
                <div class="p-3 bg-slate-50 rounded-md border border-slate-100 flex items-center justify-between">
                    <span class="font-semibold text-slate-700">Language</span>
                    <span class="text-xs bg-sky-100 text-sky-800 font-medium px-2.5 py-1 rounded">TypeScript</span>
                </div>
                <div class="p-3 bg-slate-50 rounded-md border border-slate-100 flex items-center justify-between">
                    <span class="font-semibold text-slate-700">CMS</span>
                    <span class="text-xs bg-sky-100 text-sky-800 font-medium px-2.5 py-1 rounded">Nuxt Content v3</span>
                </div>
                <div class="p-3 bg-slate-50 rounded-md border border-slate-100 flex items-center justify-between">
                    <span class="font-semibold text-slate-700">Styling</span>
                    <span class="text-xs bg-sky-100 text-sky-800 font-medium px-2.5 py-1 rounded">Tailwind CSS</span>
                </div>
            </div>
        </section>

        <!-- リンク / アカウント -->
        <section class="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-100 space-y-4">
            <h2 class="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span class="w-1.5 h-5 bg-sky-400 rounded-full"></span>
                Links & Accounts
            </h2>
            <div class="flex flex-wrap gap-3 pt-1">
                <a href="https://github.com/shiomiolog" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-sm font-medium transition-colors">
                    GitHub
                </a>
                <a href="https://x.com/shiomiolog" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-md text-sm font-medium transition-colors">
                    X (Twitter)
                </a>
            </div>
        </section>

        <!-- 記事一覧へ戻る -->
        <div class="text-center pt-4">
            <NuxtLink to="/"
                class="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline px-4 py-2 rounded-md hover:bg-sky-50 transition-colors">
                ← トップページに戻る
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'このブログについて | 潮の香りのする猫の足跡',
    description: '研究、Web・セキュリティ・低レイヤー技術、読書、日常の記録を発信する個人ブログ「潮の香りのする猫の足跡」の紹介ページです。'
})
</script>