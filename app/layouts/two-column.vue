<template>
    <div class="flex min-h-screen flex-col bg-[#F2F2F2] text-slate-800">
        <AppHeader />

        <div class="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 sm:px-6 sm:py-12">
            <div
                class="bg-[#FAFAFA] px-5 py-8 ring-1 ring-slate-200/70 shadow-[0_10px_35px_rgba(15,23,42,0.07)] sm:px-8 sm:py-10 lg:flex lg:items-start lg:gap-14 lg:px-10">
                <main class="min-w-0 flex-1">
                    <slot />
                </main>

                <AppSidebar />
            </div>
        </div>

        <AppFooter />
    </div>
</template>