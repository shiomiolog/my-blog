<!-- components/content/ProsePre.vue -->
<template>
    <div class="relative my-6 rounded-lg border border-slate-200/80 bg-slate-50 overflow-hidden group">
        <!-- 左上の言語名タグ (language が存在する場合のみ表示) -->
        <div v-if="language"
            class="absolute top-0 left-0 px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase text-sky-700 bg-sky-100 border-b border-r border-sky-200/60 rounded-br z-10">
            {{ language }}
        </div>

        <!-- コード本体 -->
        <pre :class="[
            $props.class,
            language ? 'pt-9 pb-4 px-4' : 'p-4',
            'overflow-x-auto text-sm leading-relaxed text-slate-800 bg-transparent m-0'
        ]"><slot /></pre>
    </div>
</template>

<script setup lang="ts">
defineProps({
    code: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: null
    },
    filename: {
        type: String,
        default: null
    },
    highlights: {
        type: Array as () => number[],
        default: () => []
    },
    meta: {
        type: String,
        default: null
    },
    class: {
        type: String,
        default: null
    }
})
</script>