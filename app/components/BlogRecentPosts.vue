<!-- components/BlogRecentPosts.vue -->
<template>
    <div class="space-y-3">
        <h3 class="font-bold text-lg text-slate-800 flex items-center gap-2">
            <span class="w-1.5 h-4 bg-sky-400 rounded-full"></span>
            最新記事
        </h3>

        <ul class="space-y-3 text-sm">
            <li v-for="post in recentPosts" :key="post.path">
                <NuxtLink :to="post.path" class="group block p-2 rounded-md hover:bg-sky-50 transition-colors">
                    <div class="font-medium text-slate-700 group-hover:text-sky-600 transition-colors line-clamp-2">
                        {{ post.title }}
                    </div>
                    <time class="text-xs text-slate-400 mt-1 block">
                        {{ post.date }}
                    </time>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
// 最新3件の記事を取得
const { data: recentPosts } = await useAsyncData('recent-posts', () => {
    return queryCollection('content')
        .order('date', 'DESC')
        .limit(3)
        .all()
})
</script>