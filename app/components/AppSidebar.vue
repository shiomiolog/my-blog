<!-- components/AppSidebar.vue -->
<template>
    <aside class="w-full md:w-80 space-y-6">
        <!-- プロフィール -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <h3 class="font-bold text-lg mb-2 text-slate-800 flex items-center gap-2">
                <span class="w-1.5 h-4 bg-sky-400 rounded-full"></span>
                プロフィール
            </h3>
            <p>
                <span class="text-lg font-bold">
                    汐猫みお / SHIONE Mio
                </span>
            </p>
            <p class="text-sm text-slate-600">
                Nuxt 4 と TypeScript でブログを開発中！
            </p>
        </div>

        <!-- 最新記事（追加！） -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <BlogRecentPosts />
        </div>

        <!-- カテゴリー一覧 -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <BlogCategoryList />
        </div>

        <!-- アーカイブ一覧 -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <BlogArchiveList />
        </div>
    </aside>
</template>