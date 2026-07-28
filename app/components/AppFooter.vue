<template>
    <footer class="border-t py-6 mt-auto text-center text-sm text-gray-500">
        <div class="container mx-auto px-4">
            <div class="flex justify-center gap-4 mb-2">
                <NuxtLink to="/about">このブログについて</NuxtLink>
                <NuxtLink to="/privacy">プライバシーポリシー</NuxtLink>
                <NuxtLink to="/contact">お問い合わせ</NuxtLink>
            </div>
            <p>&copy; {{ new Date().getFullYear() }} My Blog. All rights reserved.</p>
        </div>
    </footer>
</template>