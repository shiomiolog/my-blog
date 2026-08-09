<template>
    <section class="mt-12 rounded-lg border border-sky-100 bg-sky-50/50 p-5" aria-labelledby="article-share-heading">
        <h2 id="article-share-heading" class="mb-3 text-sm font-bold text-slate-700">
            この記事を共有
        </h2>

        <div class="flex flex-wrap gap-2">
            <a :href="xShareUrl" target="_blank" rel="noopener noreferrer"
                class="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-700">
                X
            </a>

            <a :href="blueskyShareUrl" target="_blank" rel="noopener noreferrer"
                class="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-700">
                Bluesky
            </a>

            <a :href="hatenaBookmarkUrl" target="_blank" rel="noopener noreferrer"
                class="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-700">
                はてなブックマーク
            </a>

            <button type="button"
                class="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-700"
                @click="copyUrl">
                {{ copied ? 'コピーしました' : 'URLをコピー' }}
            </button>

            <ClientOnly>
                <button v-if="canShare" type="button"
                    class="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-300 hover:text-sky-700"
                    @click="shareWithDevice">
                    端末で共有
                </button>
            </ClientOnly>
        </div>

        <p class="sr-only" aria-live="polite">
            {{ copied ? '記事のURLをコピーしました' : '' }}
        </p>
    </section>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
    path: string
}>()

const siteUrl = 'https://blog.shiomiolog.com'
const copied = ref(false)
const canShare = ref(false)

const articleUrl = computed(() => {
    return new URL(props.path, siteUrl).toString()
})

const xShareUrl = computed(() => {
    const params = new URLSearchParams({
        text: props.title,
        url: articleUrl.value
    })

    return `https://twitter.com/intent/tweet?${params.toString()}`
})

const blueskyShareUrl = computed(() => {
    const params = new URLSearchParams({
        text: `${props.title}\n${articleUrl.value}`
    })

    return `https://bsky.app/intent/compose?${params.toString()}`
})

const hatenaBookmarkUrl = computed(() => {
    const entryUrl = articleUrl.value.replace(/^https:\/\//, '')
    return `https://b.hatena.ne.jp/entry/s/${entryUrl}`
})

let copyResetTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
    canShare.value = typeof navigator.share === 'function'
})

onBeforeUnmount(() => {
    if (copyResetTimer) {
        clearTimeout(copyResetTimer)
    }
})

async function copyUrl() {
    try {
        await navigator.clipboard.writeText(articleUrl.value)
    } catch {
        const textarea = document.createElement('textarea')
        textarea.value = articleUrl.value
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        textarea.remove()
    }

    copied.value = true

    if (copyResetTimer) {
        clearTimeout(copyResetTimer)
    }

    copyResetTimer = setTimeout(() => {
        copied.value = false
    }, 2000)
}

async function shareWithDevice() {
    try {
        await navigator.share({
            title: props.title,
            text: props.title,
            url: articleUrl.value
        })
    } catch (error) {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
            console.error('記事を共有できませんでした', error)
        }
    }
}
</script>