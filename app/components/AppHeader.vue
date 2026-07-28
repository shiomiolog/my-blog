<!-- components/AppHeader.vue -->
<template>
    <header class="border-b py-4">
        <div class="container mx-auto flex items-center justify-between px-4">
            <!-- サイトタイトル / ロゴ -->
            <NuxtLink to="/"
                class="text-xl font-bold text-sky-600 hover:text-sky-500 transition-colors flex items-center gap-2">
                <span class="text-sky-400 text-lg">🐾</span>
                <span>潮の香りのする猫の足跡</span>
            </NuxtLink>

            <!-- ナビゲーションリンク -->
            <nav class="flex items-center gap-6">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/about">About</NuxtLink>
                <NuxtLink to="/privacy">Privacy</NuxtLink>
                <NuxtLink to="/contact">Contact</NuxtLink>

                <!-- 外部リンク: Portal -->
                <a href="https://example.com" target="_blank" rel="noopener noreferrer"
                    class="hover:text-sky-600 transition-colors inline-flex items-center gap-1">
                    Portal
                    <!-- 外部リンクアイコン -->
                    <svg class="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </nav>
        </div>
    </header>
</template>