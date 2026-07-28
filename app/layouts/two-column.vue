<!-- layouts/two-column.vue -->
<template>
    <div class="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
        <AppHeader />

        <div class="container mx-auto flex-1 flex items-start justify-between px-4 py-8 gap-8 flex-col md:flex-row">
            <!-- メインエリア -->
            <main class="flex-1 min-w-0 w-full">
                <slot />
            </main>

            <!-- サイドバーエリア -->
            <AppSidebar />
        </div>

        <AppFooter />
    </div>
</template>