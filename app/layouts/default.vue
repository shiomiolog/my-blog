<template>
    <div class="min-h-screen flex flex-col">
        <!-- ヘッダー -->
        <AppHeader />

        <!-- 各ページの中身（pages/*.vue がここに差し込まれる） -->
        <main class="flex-grow container mx-auto px-4 py-8">
            <slot />
        </main>

        <!-- フッター -->
        <AppFooter />
    </div>
</template>