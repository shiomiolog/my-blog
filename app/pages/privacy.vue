<!-- pages/privacy.vue -->
<template>
    <div class="max-w-3xl mx-auto space-y-6">

        <!-- 1. プライバシーポリシー -->
        <section class="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-100 space-y-3">
            <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <span class="w-1.5 h-4 bg-sky-400 rounded-full"></span>
                プライバシーポリシー
            </h2>
            <div class="text-slate-700 text-sm leading-relaxed space-y-3">
                <div>
                    <h3 class="font-semibold text-slate-800 mb-1">1. 個人情報の利用目的</h3>
                    <p>
                        当ブログでは、お問い合わせや記事へのコメントの際、名前やメールアドレス等の個人情報を収集する場合があります。収集した個人情報は、お問い合わせに対する回答や必要な情報を電子メール等でご連絡する場合にのみ利用し、これらの目的以外では利用いたしません。
                    </p>
                </div>
                <div>
                    <h3 class="font-semibold text-slate-800 mb-1">2. 個人情報の第三者提供</h3>
                    <p>
                        当ブログでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
                    </p>
                    <ul class="list-disc list-inside ml-2 mt-1 space-y-0.5 text-slate-600">
                        <li>本人のご了解がある場合</li>
                        <li>法令等への協力のため、開示が必要となる場合</li>
                    </ul>
                </div>
                <div>
                    <h3 class="font-semibold text-slate-800 mb-1">3. 個人情報の開示・訂正・追加・削除・利用停止</h3>
                    <p>
                        ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望のある場合には、ご本人であることを確認させていただいた上、速やかに対応いたします。
                    </p>
                </div>
            </div>
        </section>

        <!-- 2. アナリティクスについて -->
        <section class="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-100 space-y-3">
            <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <span class="w-1.5 h-4 bg-sky-400 rounded-full"></span>
                アナリティクスについて
            </h2>
            <div class="text-slate-700 text-sm leading-relaxed space-y-2">
                <p>
                    当ブログでは、アクセス解析のために「Google アナリティクス」を利用しています。Google アナリティクスはトラフィックデータの収集のために Cookie（クッキー）を使用しています。
                </p>
                <p>
                    このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能は Cookie を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                </p>
                <p>
                    Google アナリティクスの規約に関しての詳細は
                    <a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank"
                        rel="noopener noreferrer" class="text-sky-600 hover:underline">Google アナリティクス利用規約</a>
                    をご確認ください。
                </p>
            </div>
        </section>

        <!-- 3. 著作権・免責事項 -->
        <section class="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-slate-100 space-y-3">
            <h2 class="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <span class="w-1.5 h-4 bg-sky-400 rounded-full"></span>
                著作権・免責事項
            </h2>
            <div class="text-slate-700 text-sm leading-relaxed space-y-3">
                <div>
                    <h3 class="font-semibold text-slate-800 mb-1">1. 免責事項</h3>
                    <p>
                        当ブログからのリンクやバナー等によって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
                    </p>
                    <p class="mt-1">
                        当ブログのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が紛れ込んだり、情報が古くなっていることもございます。当ブログに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                    </p>
                </div>
                <div>
                    <h3 class="font-semibold text-slate-800 mb-1">2. 著作権について</h3>
                    <p>
                        当ブログで掲載している文章や画像、ソースコード等の著作権・肖像権等は各権利所有者に帰属します。法的に認められている引用の範囲を超えて、無断で転載・複製・二次利用することを禁止します。
                    </p>
                </div>
            </div>

            <!-- 制定日 -->
            <div class="text-xs text-slate-400 pt-3 border-t border-slate-100">
                制定日：2026年3月30日
            </div>
        </section>

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
    title: 'プライバシーポリシー | 潮の香りのする猫の足跡',
    description: '「潮の香りのする猫の足跡」のプライバシーポリシー、アクセス解析、著作権・免責事項に関するページです。'
})
</script>