<template>
    <div class="py-4">
        <div v-if="selectedCategory || monthQuery"
            class="mb-9 flex flex-wrap items-center justify-between gap-3 border-y border-slate-300 py-3 text-sm">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span class="font-mono text-[10px] tracking-[0.18em] text-[#5A98D8]">
                    FILTER
                </span>

                <span v-if="selectedCategory" class="text-slate-700">
                    {{ selectedCategory.parent }}
                    <template v-if="selectedCategory.child">
                        / {{ selectedCategory.child }}
                    </template>
                </span>

                <span v-if="monthQuery" class="font-mono text-xs text-slate-600">
                    {{ monthQuery }}
                </span>
            </div>

            <button type="button"
                class="font-mono text-[10px] tracking-[0.12em] text-slate-500 transition-colors hover:text-[#5A98D8]"
                @click="clearFilter">
                CLEAR FILTER
            </button>
        </div>

        <header class="mb-8">
            <p class="font-mono text-[10px] tracking-[0.28em] text-[#5A98D8]">
                NOTES
            </p>
            <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                {{ (selectedCategory || monthQuery) ? '絞り込み結果' : '記事一覧' }}
            </h1>
        </header>

        <div v-if="posts && posts.length > 0" class="border-t border-slate-300">
            <NuxtLink v-for="post in posts" :key="post.path" :to="post.path"
                class="group grid gap-3 border-b border-slate-300 py-7 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <div class="font-mono text-[11px] leading-relaxed text-slate-500">
                    <time v-if="post.date">
                        {{ post.date }}
                    </time>

                    <p v-if="post.category" class="mt-1 text-[#5A98D8]">
                        {{ post.category.parent }} / {{ post.category.child }}
                    </p>
                </div>

                <div>
                    <h2
                        class="text-xl font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-[#5A98D8]">
                        {{ post.title }}
                    </h2>

                    <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                        {{ post.description }}
                    </p>

                    <span
                        class="mt-4 inline-block font-mono text-[10px] tracking-[0.14em] text-slate-400 transition-colors group-hover:text-[#5A98D8]">
                        READ NOTE →
                    </span>
                </div>
            </NuxtLink>
        </div>

        <div v-else class="border-y border-slate-300 py-14 text-center text-sm text-slate-500">
            <p>条件に一致する記事が見つかりませんでした。</p>
            <button type="button" class="mt-4 font-mono text-[10px] tracking-[0.14em] text-[#5A98D8]"
                @click="clearFilter">
                SHOW ALL NOTES
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'two-column'
})

const PER_PAGE = 10
const route = useRoute()
const router = useRouter()

// クエリパラメータの監視
const currentPage = computed(() => Math.max(1, Number(route.query.page) || 1))
const categoryQuery = computed(() => route.query.category as string | undefined)
const subCategoryQuery = computed(() => route.query.subCategory as string | undefined)
const monthQuery = computed(() => route.query.month as string | undefined)

// 選択中のカテゴリー表示用
const selectedCategory = computed(() => {
    if (!categoryQuery.value) return null
    return {
        parent: categoryQuery.value,
        child: subCategoryQuery.value
    }
})

// 絞り込み解除処理
const clearFilter = () => {
    router.push('/')
}

function goToCategory(category: { parent: string; child: string }) {
    router.push({
        path: '/',
        query: { category: category.parent, subCategory: category.child }
    })
}

// 💡 useAsyncData の設定を強化
const { data, refresh } = await useAsyncData(
    'home-posts',
    async () => {
        const allPosts = await queryCollection('content').all()

        const filtered = allPosts.filter((post) => {
            if (categoryQuery.value && post.category?.parent !== categoryQuery.value) {
                return false
            }
            if (subCategoryQuery.value && post.category?.child !== subCategoryQuery.value) {
                return false
            }
            if (monthQuery.value && String(post.date).slice(0, 7) !== monthQuery.value) {
                return false
            }
            return true
        })

        filtered.sort((a, b) => {
            const dateA = new Date(a.date || 0).getTime()
            const dateB = new Date(b.date || 0).getTime()
            return dateB - dateA
        })

        const total = filtered.length
        const posts = filtered.slice(
            (currentPage.value - 1) * PER_PAGE,
            currentPage.value * PER_PAGE
        )

        return { posts, total }
    },
    { watch: [currentPage, categoryQuery, subCategoryQuery, monthQuery] }
)

// 💡 SSR時に空データで渡ってきた場合にクライアントで自動補完
onMounted(() => {
    if (!data.value || data.value.posts.length === 0) {
        refresh()
    }
})

const posts = computed(() => data.value?.posts ?? [])
const totalPages = computed(() => Math.max(1, Math.ceil((data.value?.total ?? 0) / PER_PAGE)))

// SEO メタ情報 & OGP
useSeoMeta({
    title: '潮の香りのする猫の足跡',
    description: '汐猫みおのブログ・日常の記録',
    ogTitle: '潮の香りのする猫の足跡',
    ogDescription: '汐猫みおのブログ・日常の記録',
    ogType: 'website',
    twitterCard: 'summary_large_image'
})

defineOgImage('ShiomioBlogTakumi', {
    title: '潮の香りのする猫の足跡',
    category: '汐猫みおのブログ',
    author: '汐猫みお',
    date: '2026-07-29'
})
</script>