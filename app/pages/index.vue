<!-- pages/index.vue -->
<template>
    <div>
        <!-- 全体を包むメインボックス -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-100">

            <!-- 絞り込み中のヘッダー表示 -->
            <div v-if="selectedCategory || monthQuery"
                class="mb-6 pb-4 border-b border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs text-slate-500 font-medium">絞り込み中:</span>

                    <span v-if="selectedCategory"
                        class="inline-flex items-center text-xs font-medium rounded overflow-hidden border border-sky-100">
                        <span class="bg-sky-50 text-sky-700 px-2.5 py-1">
                            {{ selectedCategory.parent }}
                        </span>
                        <span v-if="selectedCategory.child" class="bg-sky-100/60 text-sky-800 px-2.5 py-1">
                            {{ selectedCategory.child }}
                        </span>
                    </span>

                    <span v-if="monthQuery"
                        class="inline-flex items-center text-xs font-medium rounded overflow-hidden border border-sky-100">
                        <span class="bg-sky-50 text-sky-700 px-2.5 py-1">
                            {{ monthQuery }}
                        </span>
                    </span>
                </div>
                <!-- 絞り込み解除ボタン -->
                <NuxtLink to="/" class="text-xs text-slate-400 hover:text-sky-600 transition-colors">
                    ✕ 絞り込みを解除
                </NuxtLink>
            </div>

            <!-- 記事がない場合のメッセージ -->
            <div v-if="posts.length === 0" class="py-12 text-center text-slate-400 text-sm">
                該当する記事が見つかりませんでした。
            </div>

            <!-- 記事一覧 -->
            <ul v-else class="divide-y divide-slate-100">
                <li v-for="post in posts" :key="post.path" class="py-4 first:pt-0 last:pb-0">
                    <NuxtLink :to="post.path" class="block group">
                        <!-- タイトル -->
                        <h2 class="text-lg font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                            {{ post.title }}
                        </h2>

                        <!-- 概要 (description) -->
                        <p v-if="post.description" class="text-sm text-slate-600 mt-1.5 line-clamp-2">
                            {{ post.description }}
                        </p>

                        <!-- 日付 & カテゴリータグ -->
                        <div class="flex items-center gap-2 mt-2">
                            <time class="text-xs text-slate-400">
                                {{ post.date }}
                            </time>

                            <!-- カテゴリータグ (クリックでそのカテゴリーに絞り込めるリンクに変更) -->
                            <span v-if="post.category"
                                class="inline-flex items-center text-xs font-medium rounded overflow-hidden border border-sky-100 hover:opacity-80 transition-opacity cursor-pointer"
                                @click.stop.prevent="goToCategory(post.category)">
                                <span class="bg-sky-50 text-sky-700 px-2 py-0.5">
                                    {{ post.category.parent }}
                                </span>
                                <span class="bg-sky-100/60 text-sky-800 px-2 py-0.5">
                                    {{ post.category.child }}
                                </span>
                            </span>
                        </div>
                    </NuxtLink>
                </li>
            </ul>

            <!-- ページネーション -->
            <div v-if="totalPages > 1"
                class="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                <NuxtLink v-if="currentPage > 1" :to="{ query: { ...route.query, page: currentPage - 1 } }"
                    class="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline px-3 py-1 rounded-md hover:bg-sky-50 transition-colors">
                    ← 前へ
                </NuxtLink>

                <span class="text-sm text-slate-400">
                    {{ currentPage }} / {{ totalPages }}
                </span>

                <NuxtLink v-if="currentPage < totalPages" :to="{ query: { ...route.query, page: currentPage + 1 } }"
                    class="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline px-3 py-1 rounded-md hover:bg-sky-50 transition-colors">
                    次へ →
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'two-column'
})

const PER_PAGE = 10
const route = useRoute()

// クエリパラメータの監視
const currentPage = computed(() => Math.max(1, Number(route.query.page) || 1))
const categoryQuery = computed(() => route.query.category as string | undefined)
const subCategoryQuery = computed(() => route.query.subCategory as string | undefined)
const monthQuery = computed(() => route.query.month as string | undefined)

const router = useRouter()

function goToCategory(category: { parent: string; child: string }) {
    router.push({
        path: '/',
        query: { category: category.parent, subCategory: category.child }
    })
}

// 選択中のカテゴリー表示用
const selectedCategory = computed(() => {
    if (!categoryQuery.value) return null
    return {
        parent: categoryQuery.value,
        child: subCategoryQuery.value
    }
})

// データ取得 (キーにカテゴリー・月パラメータを追加し、URL変更時に再取得させる)
const { data } = await useAsyncData(
    () => `posts-page-${currentPage.value}-cat-${categoryQuery.value || 'all'}-sub-${subCategoryQuery.value || 'all'}-month-${monthQuery.value || 'all'}`,
    async () => {
        // 全件取得
        const allPosts = await queryCollection('content').order('date', 'DESC').all()

        // JS側で絞り込み
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

        const total = filtered.length
        const posts = filtered.slice(
            (currentPage.value - 1) * PER_PAGE,
            currentPage.value * PER_PAGE
        )

        return { posts, total }
    },
    { watch: [currentPage, categoryQuery, subCategoryQuery, monthQuery] }
)

const posts = computed(() => data.value?.posts ?? [])
const totalPages = computed(() => Math.max(1, Math.ceil((data.value?.total ?? 0) / PER_PAGE)))
</script>