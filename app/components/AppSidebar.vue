<!-- components/AppSidebar.vue -->
<template>
    <aside class="w-full md:w-80 space-y-6">
        <!-- プロフィール -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <h3 class="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                <span class="w-1.5 h-4 bg-sky-400 rounded-full"></span>
                プロフィール
            </h3>

            <div class="flex flex-col items-center text-center">
                <img src="/avatar.webp" alt="汐猫みお"
                    class="w-20 h-20 rounded-full object-cover border border-slate-100 shadow-sm" />

                <p class="mt-3 text-lg font-bold text-slate-800">
                    汐猫みお / SHIONE Mio
                </p>
                <p class="text-sm text-slate-600 mt-1">
                    she/her / YouTuber（個人勢）<br />
                    Researcher? (Security, AI, Info Law) <br />
                    放送大・学部全科生&修士選科生<br />
                    学士（IT総合学）
                </p>
                <a href="https://twitter.com/shiomiolog" target="_blank" rel="noopener noreferrer" class="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-slate-900
                hover:bg-slate-700 transition-colors px-4 py-2 rounded-full">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    フォローする
                </a>
            </div>
        </div>

        <!-- 最新記事 -->
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