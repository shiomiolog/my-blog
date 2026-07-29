<!-- app/pages/admin/upload.vue -->
<template>
    <div class="max-w-xl mx-auto p-6 space-y-6">
        <h1 class="text-xl font-bold text-slate-800">R2 画像アップローダー</h1>

        <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">API Key</label>
            <input v-model="apiKey" type="password" placeholder="パスワードを入力" class="w-full p-2 border rounded text-sm" />
        </div>

        <div @dragover.prevent @drop.prevent="handleDrop"
            class="border-2 border-dashed border-sky-200 bg-sky-50/50 rounded-lg p-8 text-center hover:bg-sky-50 transition-colors cursor-pointer">
            <p v-if="!isUploading" class="text-sm text-slate-600 font-medium">
                ここに画像をドラッグ＆ドロップ<br />またはファイルを選択
            </p>
            <p v-else class="text-sm text-sky-600 font-bold animate-pulse">
                アップロード中... 🚀
            </p>

            <input type="file" class="hidden" id="fileInput" @change="handleFileSelect" accept="image/*" />
            <label for="fileInput"
                class="mt-3 inline-block px-4 py-1.5 bg-sky-500 text-white text-xs font-semibold rounded hover:bg-sky-600 cursor-pointer">
                ファイルを選択
            </label>
        </div>

        <div v-if="uploadResult" class="p-4 bg-slate-50 rounded border border-slate-200 space-y-2">
            <p class="text-xs text-green-600 font-bold">✓ アップロード完了！（Markdownをコピーしました）</p>
            <img :src="uploadResult.url" class="max-h-40 rounded border mx-auto" />
            <input type="text" readonly :value="uploadResult.markdown"
                class="w-full p-2 bg-white border rounded text-xs font-mono" @click="selectText" />
        </div>
    </div>
</template>

<script setup lang="ts">
const apiKey = ref('')
const isUploading = ref(false)
const uploadResult = ref<{ url: string; markdown: string } | null>(null)

const selectText = (e: Event) => {
    const target = e.target as HTMLInputElement | null
    target?.select()
}

const uploadFile = async (file: File) => {
    if (!apiKey.value) {
        alert('API Keyを入力してください')
        return
    }

    isUploading.value = true

    try {
        // 1. 署名URLを取得
        const res = await $fetch('/api/upload', {
            method: 'POST',
            headers: { 'x-api-key': apiKey.value },
            body: {
                filename: file.name,
                contentType: file.type
            }
        })

        // 2. ブラウザからR2へ直接アップロード
        await fetch(res.uploadUrl, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: file
        })

        // 3. 結果の保持
        uploadResult.value = { url: res.publicUrl, markdown: res.markdown }

        // 4. クリップボード自動コピー（フォーカスエラーが起きても無視して表示を維持）
        try {
            await navigator.clipboard.writeText(res.markdown)
        } catch (e) {
            console.warn('クリップボードへの自動コピーに失敗しました（テキストボックスをクリックして手動コピーしてください）:', e)
        }

    } catch (err) {
        alert('アップロードに失敗しました')
        console.error(err)
    } finally {
        isUploading.value = false
    }
}

const handleDrop = (e: DragEvent) => {
    const files = e.dataTransfer?.files
    if (files && files[0]) uploadFile(files[0])
}

const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files[0]) uploadFile(target.files[0])
}
</script>