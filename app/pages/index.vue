<template>
    <div class="max-w-4xl mx-auto py-8 px-4">
        <!-- 絞り込み表示 & 解除ボタンエリア -->
        <div v-if="selectedCategory || monthQuery"
            class="mb-6 p-3 bg-sky-50 border border-sky-200 rounded-lg flex items-center justify-between text-sm">
            <div class="flex items-center gap-2 flex-wrap text-slate-700">
                <span class="font-bold text-sky-800">絞り込み中:</span>

                <!-- カテゴリータグ -->
                <span v-if="selectedCategory"
                    class="px-2 py-0.5 bg-white border border-sky-200 text-sky-700 rounded font-medium text-xs">
                    {{ selectedCategory.parent }} <span v-if="selectedCategory.child">/ {{ selectedCategory.child
                    }}</span>
                </span>

                <!-- 月別タグ -->
                <span v-if="monthQuery"
                    class="px-2 py-0.5 bg-white border border-sky-200 text-sky-700 rounded font-medium text-xs">
                    📅 {{ monthQuery }}
                </span>
            </div>

            <!-- 全解除ボタン -->
            <button @click="clearFilter"
                class="text-xs font-semibold text-slate-500 hover:text-red-500 hover:bg-white px-2 py-1 rounded transition-colors flex items-center gap-1">
                ✕ 絞り込み解除
            </button>
        </div>

        <h1 class="text-2xl font-bold mb-6 text-slate-800">
            {{ (selectedCategory || monthQuery) ? '絞り込み結果' : '記事一覧' }}
        </h1>

        <!-- 記事が存在する場合 -->
        <div v-if="posts && posts.length > 0" class="space-y-4">
            <NuxtLink v-for="post in posts" :key="post.path" :to="post.path"
                class="block p-5 bg-white rounded-lg border border-slate-100 hover:border-sky-300 hover:shadow-sm transition-all">
                <h2 class="text-lg font-bold text-slate-800 mb-2">{{ post.title }}</h2>
                <p class="text-sm text-slate-500 line-clamp-2 mb-3">{{ post.description }}</p>
                <div class="text-xs text-slate-400">
                    <time v-if="post.date">{{ post.date }}</time>
                </div>
            </NuxtLink>
        </div>

        <!-- ゼロ件の場合の表示 -->
        <div v-else class="text-center py-12 text-slate-400">
            <p>条件に一致する記事が見つかりませんでした。</p>
            <button @click="clearFilter" class="mt-3 text-xs text-sky-600 underline hover:text-sky-800">
                すべての記事を表示する
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