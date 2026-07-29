<!-- components/content/LinkCard.vue -->
<template>
    <div class="my-6 not-prose">
        <!-- 読み込み中 -->
        <div v-if="pending"
            class="p-4 border border-slate-200 bg-slate-50 rounded-xl animate-pulse flex gap-4 items-center">
            <div class="flex-1 space-y-2">
                <div class="h-4 bg-slate-200 rounded w-3/4"></div>
                <div class="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
            <div class="w-24 h-24 bg-slate-200 rounded-lg shrink-0"></div>
        </div>

        <!-- 取得完了時 -->
        <a v-else-if="ogp" :href="url" target="_blank" rel="noopener noreferrer"
            class="group flex flex-col sm:flex-row items-stretch border border-slate-200 hover:border-sky-300 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow transition-all no-underline">
            <!-- テキスト情報 -->
            <div class="p-4 flex-1 flex flex-col justify-between min-w-0">
                <div class="space-y-1.5">
                    <p
                        class="font-bold text-slate-800 group-hover:text-sky-600 transition-colors text-sm sm:text-base line-clamp-2 leading-snug">
                        {{ ogp.title }}
                    </p>
                    <p v-if="ogp.description" class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {{ ogp.description }}
                    </p>
                </div>
                <div class="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                    <span>🌐 {{ ogp.siteName }}</span>
                </div>
            </div>

            <!-- サムネイル画像 -->
            <div v-if="ogp.image"
                class="sm:w-36 h-32 sm:h-auto bg-slate-100 shrink-0 overflow-hidden relative border-t sm:border-t-0 sm:border-l border-slate-100">
                <img :src="ogp.image" :alt="ogp.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
        </a>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    url: string
}>()

// サーバーAPIからOGP情報を非同期取得
const { data: ogp, pending } = await useFetch('/api/ogp', {
    query: { url: props.url },
    key: `ogp-${props.url}`
})
</script>