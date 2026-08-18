<template>
    <div class="not-prose my-8">
        <div ref="container" class="flex min-h-24 w-full justify-center [&_iframe]:!max-w-full"
            :aria-busy="isLoading" />

        <p v-if="isLoading" class="text-center text-xs text-slate-400">
            Xの投稿を読み込んでいます…
        </p>

        <div v-else-if="hasError" class="border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600">
            <p>投稿を読み込めませんでした。</p>

            <a :href="url" target="_blank" rel="noopener noreferrer"
                class="mt-2 inline-flex items-center gap-1 border-b border-slate-400 text-[#417EBB] transition-colors hover:border-[#5A98D8] hover:text-[#5A98D8]">
                Xで投稿を見る
                <span aria-hidden="true">↗</span>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
type XWidgets = {
    widgets: {
        createTweet: (
            id: string,
            element: HTMLElement,
            options?: Record<string, unknown>
        ) => Promise<HTMLElement | undefined>
    }
}

declare global {
    interface Window {
        twttr?: XWidgets
    }
}

const props = defineProps<{
    url: string
}>()

const container = ref<HTMLElement | null>(null)
const isLoading = ref(true)
const hasError = ref(false)

const tweetId = computed(() => {
    return props.url.match(/\/status\/(\d+)/)?.[1] ?? ''
})

const waitForWidgets = () => {
    return new Promise<XWidgets>((resolve, reject) => {
        let attempts = 0

        const check = () => {
            if (window.twttr?.widgets?.createTweet) {
                resolve(window.twttr)
                return
            }

            attempts += 1

            if (attempts >= 100) {
                reject(new Error('X widgets could not be loaded'))
                return
            }

            window.setTimeout(check, 50)
        }

        check()
    })
}

const loadWidgets = () => {
    const existingScript = document.getElementById('twitter-wjs')

    if (!existingScript) {
        const script = document.createElement('script')

        script.id = 'twitter-wjs'
        script.src = 'https://platform.twitter.com/widgets.js'
        script.async = true
        script.charset = 'UTF-8'

        document.body.appendChild(script)
    }

    return waitForWidgets()
}

const renderTweet = async () => {
    isLoading.value = true
    hasError.value = false

    if (!container.value || !tweetId.value) {
        isLoading.value = false
        hasError.value = true
        return
    }

    container.value.innerHTML = ''

    try {
        const x = await loadWidgets()

        const element = await x.widgets.createTweet(
            tweetId.value,
            container.value,
            {
                align: 'center',
                cards: 'visible',
                conversation: 'none',
                dnt: true,
                lang: 'ja'
            }
        )

        if (!element) {
            throw new Error('X post was not found')
        }
    } catch {
        hasError.value = true
    } finally {
        isLoading.value = false
    }
}

onMounted(renderTweet)

watch(
    () => props.url,
    () => {
        renderTweet()
    }
)
</script>