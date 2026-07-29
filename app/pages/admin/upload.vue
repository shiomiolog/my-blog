<!-- app/pages/admin/upload.vue -->
<template>
    <div class="max-w-2xl mx-auto p-6 space-y-6">
        <h1 class="text-xl font-bold text-slate-800">R2 画像アップローダー</h1>

        <!-- API Key 入力 -->
        <div>
            <label class="block text-xs font-semibold text-slate-500 mb-1">API Key</label>
            <input v-model="apiKey" type="password" placeholder="パスワードを入力" class="w-full p-2 border rounded text-sm" />
        </div>

        <!-- 1. ファイル選択エリア -->
        <div @dragover.prevent @drop.prevent="handleDrop"
            class="border-2 border-dashed border-sky-200 bg-sky-50/50 rounded-lg p-6 text-center hover:bg-sky-50 transition-colors cursor-pointer">
            <p v-if="!isCompressing" class="text-sm text-slate-600 font-medium">
                ここに画像をドラッグ＆ドロップ<br />またはファイルを選択
            </p>
            <p v-else class="text-sm text-sky-600 font-bold animate-pulse">
                WebPへ変換・圧縮中... ⚡
            </p>

            <input type="file" ref="fileInputRef" class="hidden" id="fileInput" @change="handleFileSelect"
                accept="image/*" multiple />
            <label for="fileInput"
                class="mt-3 inline-block px-4 py-1.5 bg-sky-500 text-white text-xs font-semibold rounded hover:bg-sky-600 cursor-pointer">
                ファイルを選択
            </label>
        </div>

        <!-- 2. アップロード待機（確認）エリア -->
        <div v-if="pendingFiles.length > 0" class="p-4 bg-sky-50/60 rounded-lg border border-sky-200 space-y-3">
            <div class="flex items-center justify-between border-b border-sky-100 pb-2">
                <h2 class="text-xs font-bold text-sky-800">選択中のファイル（{{ pendingFiles.length }}件）</h2>
                <button @click="clearPendingFiles" class="text-xs text-slate-400 hover:text-slate-600">
                    すべて解除
                </button>
            </div>

            <!-- 選択中ファイルのプレビューリスト -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div v-for="(item, index) in pendingFiles" :key="index"
                    class="relative bg-white p-2 rounded border border-slate-200 flex flex-col items-center">
                    <img :src="item.previewUrl" class="w-full h-24 object-cover rounded mb-1" />
                    <p class="text-[10px] text-slate-600 truncate w-full text-center">{{ item.file.name }}</p>
                    <p class="text-[9px] text-emerald-600 font-bold">
                        {{ (item.originalSize / 1024 / 1024).toFixed(1) }}MB → {{ (item.file.size / 1024).toFixed(0)
                        }}KB
                    </p>

                    <!-- 個別削除ボタン -->
                    <button @click="removePendingFile(index)"
                        class="absolute -top-1.5 -right-1.5 bg-slate-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500 transition-colors">
                        ✕
                    </button>
                </div>
            </div>

            <!-- アップロード実行ボタン -->
            <button @click="uploadPendingFiles" :disabled="isUploading"
                class="w-full py-2 bg-sky-600 text-white text-sm font-bold rounded-lg hover:bg-sky-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                <span v-if="isUploading" class="animate-pulse">アップロード中... 🚀</span>
                <span v-else>この内容でアップロード実行</span>
            </button>
        </div>

        <!-- 3. アップロード完了済み履歴リスト -->
        <div v-if="uploadedHistory.length > 0" class="space-y-4 pt-4 border-t border-slate-200">
            <div class="flex items-center justify-between">
                <h2 class="text-sm font-bold text-slate-700">アップロード履歴 ({{ uploadedHistory.length }}件)</h2>
                <button @click="uploadedHistory = []"
                    class="text-xs text-slate-400 hover:text-red-500 transition-colors">
                    履歴をクリア
                </button>
            </div>

            <div class="space-y-3">
                <div v-for="(item, index) in uploadedHistory" :key="index"
                    class="p-3 bg-slate-50 rounded border border-slate-200 flex items-center gap-4">
                    <img :src="item.url" class="w-16 h-16 object-cover rounded border bg-white flex-shrink-0" />

                    <div class="flex-1 min-w-0 space-y-1">
                        <p class="text-xs font-medium text-slate-700 truncate">{{ item.filename }}</p>
                        <div class="flex items-center gap-2">
                            <input type="text" readonly :value="item.markdown"
                                class="w-full p-1.5 bg-white border rounded text-xs font-mono text-slate-600"
                                @click="selectText" />
                            <button @click="copyToClipboard(item.markdown)"
                                class="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs rounded font-medium transition-colors whitespace-nowrap">
                                コピー
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import imageCompression from 'browser-image-compression'

if (!process.dev) {
    throw showError({
        statusCode: 404,
        statusMessage: 'Page Not Found'
    })
}

interface PendingFile {
    file: File
    previewUrl: string
    originalSize: number
}

interface UploadedItem {
    filename: string
    url: string
    markdown: string
}

const apiKey = ref('')
const isCompressing = ref(false)
const isUploading = ref(false)
const pendingFiles = ref<PendingFile[]>([])
const uploadedHistory = ref<UploadedItem[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)

const selectText = (e: Event) => {
    const target = e.target as HTMLInputElement | null
    target?.select()
}

const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text)
        alert('Markdownをコピーしました！')
    } catch (e) {
        console.warn('手動コピーに失敗しました', e)
    }
}

// 画像圧縮・WebP化の設定と処理
const compressImage = async (file: File): Promise<File> => {
    const options = {
        maxSizeMB: 1,           // 最大1MB以下に抑える
        maxWidthOrHeight: 1920, // 長辺の最大サイズを 1920px にリサイズ
        useWebWorker: true,     // バックグラウンドで高速処理
        fileType: 'image/webp'  // 自動で WebP フォーマットへ変換
    }

    try {
        const compressedBlob = await imageCompression(file, options)
        const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp"
        return new File([compressedBlob], newFileName, { type: 'image/webp' })
    } catch (error) {
        console.error('圧縮エラー:', error)
        return file
    }
}

// ファイル選択時に自動圧縮
const addFilesToPending = async (files: FileList | File[]) => {
    isCompressing.value = true

    try {
        const fileList = Array.from(files)
        for (const file of fileList) {
            if (!file || !file.type.startsWith('image/')) continue

            const compressedFile = await compressImage(file)

            pendingFiles.value.push({
                file: compressedFile,
                previewUrl: URL.createObjectURL(compressedFile),
                originalSize: file.size
            })
        }
    } finally {
        isCompressing.value = false
    }
}

const removePendingFile = (index: number) => {
    const item = pendingFiles.value[index]
    if (item) {
        URL.revokeObjectURL(item.previewUrl)
        pendingFiles.value.splice(index, 1)
    }
}

const clearPendingFiles = () => {
    pendingFiles.value.forEach(item => {
        if (item?.previewUrl) {
            URL.revokeObjectURL(item.previewUrl)
        }
    })
    pendingFiles.value = []
    const inputEl = fileInputRef.value
    if (inputEl) {
        inputEl.value = ''
    }
}

const uploadPendingFiles = async () => {
    if (!apiKey.value) {
        alert('API Keyを入力してください')
        return
    }

    if (pendingFiles.value.length === 0) return

    isUploading.value = true

    try {
        for (const item of pendingFiles.value) {
            if (!item) continue
            const file = item.file

            // 1. 署名URLと日付番号付きファイル名を取得
            const res = await $fetch<{ uploadUrl: string; publicUrl: string; markdown: string }>('/api/upload', {
                method: 'POST',
                headers: { 'x-api-key': apiKey.value },
                body: {
                    filename: file.name,
                    contentType: file.type
                }
            })

            // 2. R2へアップロード
            await fetch(res.uploadUrl, {
                method: 'PUT',
                headers: { 'Content-Type': file.type },
                body: file
            })

            // 3. サーバーが命名したファイル名を履歴に保存
            const savedFileName = res.publicUrl.split('/').pop() || file.name

            uploadedHistory.value.unshift({
                filename: savedFileName,
                url: res.publicUrl,
                markdown: res.markdown
            })

            URL.revokeObjectURL(item.previewUrl)
        }

        pendingFiles.value = []
        const inputEl = fileInputRef.value
        if (inputEl) {
            inputEl.value = ''
        }

        const firstHistory = uploadedHistory.value[0]
        if (firstHistory) {
            try {
                await navigator.clipboard.writeText(firstHistory.markdown)
            } catch (e) {
                console.warn('自動コピー失敗:', e)
            }
        }

    } catch (err) {
        alert('一部またはすべてのアップロードに失敗しました')
        console.error(err)
    } finally {
        isUploading.value = false
    }
}

const handleDrop = (e: DragEvent) => {
    const files = e.dataTransfer?.files
    if (files && files.length > 0) addFilesToPending(files)
}

const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement | null
    if (target?.files && target.files.length > 0) addFilesToPending(target.files)
}
</script>