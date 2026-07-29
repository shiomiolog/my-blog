<!-- components/BlogArchiveList.vue -->
<template>
    <div class="space-y-3">
        <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
            <span class="w-1.5 h-4 bg-sky-400 rounded-full"></span>
            アーカイブ
        </h3>

        <!-- 読み込み中表示 -->
        <div v-if="pending && !posts?.length" class="text-xs text-slate-400 animate-pulse">
            読み込み中...
        </div>

        <div v-else class="space-y-2 text-sm">
            <details v-for="(group, index) in archiveTree" :key="group.year" :open="index === 0" class="group">
                <summary
                    class="font-semibold text-slate-700 cursor-pointer list-none flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-sky-50 hover:text-sky-600 transition-colors">
                    <span class="flex items-center gap-1.5">
                        <svg class="w-3.5 h-3.5 text-slate-400 transition-transform group-open:rotate-90 group-open:text-sky-500"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                        {{ group.year }}年
                    </span>
                </summary>

                <ul class="ml-4 pl-3 border-l-2 border-sky-100 space-y-1 mt-1">
                    <li v-for="item in group.months" :key="item.month">
                        <NuxtLink :to="{ path: '/', query: { month: `${group.year}-${item.monthStr}` } }"
                            class="text-slate-500 hover:text-sky-600 transition-colors flex justify-between items-center py-1 px-2 rounded hover:bg-sky-50/60">
                            <span>{{ item.month }}月</span>
                            <span class="text-xs text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full font-medium">
                                {{ item.count }}
                            </span>
                        </NuxtLink>
                    </li>
                </ul>
            </details>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data: posts, pending, refresh } = useAsyncData('all-archives', () => {
    return queryCollection('content').all()
}, { lazy: true })

onMounted(() => {
    if (!posts.value || posts.value.length === 0) {
        refresh()
    }
})

interface MonthItem {
    month: number
    monthStr: string
    count: number
}

interface YearGroup {
    year: string
    months: MonthItem[]
}

const archiveTree = computed<YearGroup[]>(() => {
    if (!posts.value) return []

    const rawCounts: Record<string, number> = {}

    for (const post of posts.value) {
        if (!post.date) continue
        const yearMonth = String(post.date).slice(0, 7)
        rawCounts[yearMonth] = (rawCounts[yearMonth] || 0) + 1
    }

    const yearsMap: Record<string, MonthItem[]> = {}

    for (const [ym, count] of Object.entries(rawCounts)) {
        const parts = ym.split('-')
        const year = parts[0]
        const monthStr = parts[1]

        if (!year || !monthStr) continue

        const month = Number(monthStr)

        if (!yearsMap[year]) {
            yearsMap[year] = []
        }

        yearsMap[year].push({ month, monthStr, count })
    }

    return Object.keys(yearsMap)
        .sort((a, b) => Number(b) - Number(a))
        .map(year => ({
            year,
            months: (yearsMap[year] || []).sort((a, b) => b.month - a.month)
        }))
})
</script>