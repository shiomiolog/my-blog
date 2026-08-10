<template>
    <section class="mt-12 border-t border-slate-300 pt-6">
        <div class="grid gap-5 sm:grid-cols-[10rem_1fr] sm:items-start">
            <div>
                <p class="font-mono text-[10px] tracking-[0.2em] text-[#5A98D8]">
                    SUPPORT
                </p>

                <h2 class="mt-2 text-sm font-semibold text-slate-900">
                    活動を応援する
                </h2>

                <p class="mt-2 text-xs leading-6 text-slate-500">
                    いただいた支援は、専門書や技術書の購入などに活用します。
                </p>
            </div>

            <div class="min-w-0">
                <div id="codoc-entry-oQgWrke7ng" class="codoc-entries" data-without-body="1" data-support-message="" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
onMounted(() => {
    const existingScript = document.getElementById('codoc-cms-script')

    if (existingScript) {
        return
    }

    const script = document.createElement('script')

    script.id = 'codoc-cms-script'
    script.src = 'https://codoc.jp/js/cms.js'
    script.charset = 'UTF-8'
    script.defer = true
    script.dataset.css = 'rainbow-square'
    script.dataset.usercode = 'OZH1HBIwNg'

    document.body.appendChild(script)
})
</script>