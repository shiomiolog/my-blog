<template>
    <div class="flex min-h-screen flex-col bg-[#F2F2F2] text-slate-800">
        <AppHeader />

        <main class="mx-auto w-full max-w-[1200px] flex-grow px-4 py-8 sm:px-6 sm:py-12">
            <div
                class="bg-[#FAFAFA] px-5 py-8 ring-1 ring-slate-200/70 shadow-[0_10px_35px_rgba(15,23,42,0.07)] sm:px-10 sm:py-12">
                <slot />
            </div>
        </main>

        <AppFooter />
    </div>
</template>