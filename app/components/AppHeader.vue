<template>
    <header class="border-b py-4">
        <div class="container mx-auto flex flex-wrap items-center justify-between px-4">
            <!-- サイトタイトル / ロゴ -->
            <NuxtLink to="/"
                class="flex items-center gap-2 whitespace-nowrap text-base font-bold text-sky-600 transition-colors hover:text-sky-500 sm:text-xl">
                <span class="text-lg text-sky-400">🐾</span>
                <span>潮の香りのする猫の足跡</span>
            </NuxtLink>

            <!-- スマホ用メニューボタン -->
            <button type="button"
                class="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700 sm:hidden"
                aria-controls="main-navigation" :aria-expanded="isMenuOpen" @click="isMenuOpen = !isMenuOpen">
                <span class="sr-only">
                    {{ isMenuOpen ? 'メニューを閉じる' : 'メニューを開く' }}
                </span>

                <!-- 閉じるアイコン -->
                <svg v-if="isMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>

                <!-- ハンバーガーアイコン -->
                <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <!-- ナビゲーションリンク -->
            <nav id="main-navigation" :class="isMenuOpen ? 'flex' : 'hidden'"
                class="w-full flex-col gap-1 pt-4 sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-6 sm:pt-0">
                <NuxtLink to="/"
                    class="rounded-md px-3 py-2 transition-colors hover:bg-sky-50 hover:text-sky-700 sm:p-0 sm:hover:bg-transparent">
                    Home
                </NuxtLink>

                <NuxtLink to="/about"
                    class="rounded-md px-3 py-2 transition-colors hover:bg-sky-50 hover:text-sky-700 sm:p-0 sm:hover:bg-transparent">
                    About
                </NuxtLink>

                <NuxtLink to="/privacy"
                    class="rounded-md px-3 py-2 transition-colors hover:bg-sky-50 hover:text-sky-700 sm:p-0 sm:hover:bg-transparent">
                    Privacy
                </NuxtLink>

                <NuxtLink to="/contact"
                    class="rounded-md px-3 py-2 transition-colors hover:bg-sky-50 hover:text-sky-700 sm:p-0 sm:hover:bg-transparent">
                    Contact
                </NuxtLink>

                <a href="https://example.com" target="_blank" rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 rounded-md px-3 py-2 transition-colors hover:bg-sky-50 hover:text-sky-700 sm:p-0 sm:hover:bg-transparent">
                    Portal
                    <svg class="h-3.5 w-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)

// ページ移動後はスマホメニューを閉じる
watch(
    () => route.fullPath,
    () => {
        isMenuOpen.value = false
    }
)
</script>