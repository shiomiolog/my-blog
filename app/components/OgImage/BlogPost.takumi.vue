<!-- components/OgImage/BlogPost.takumi.vue -->
<template>
    <div style="
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: #ffffff;
            border: 15px solid #7dd3fc;
            padding: 48px 56px;
            font-family: 'Noto Sans JP', sans-serif;
        ">
        <!-- 上部: プロフィール(左) + サイトロゴ(右) -->
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: #e0f2fe;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                ">
                    🐾
                </div>
                <span style="font-size: 24px; color: #0f172a; font-weight: 600;">
                    汐猫みお
                </span>
            </div>

            <span style="font-size: 22px; color: #0f172a; font-weight: 700;">
                潮の香りのする猫の足跡
            </span>
        </div>

        <!-- 中央: タイトル → 線 → カテゴリー -->
        <div style="
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
        ">
            <span :style="{
                fontSize: titleFontSize,
                fontWeight: 700,
                color: '#0f172a',
                lineHeight: 1.5
            }">
                {{ title }}
            </span>

            <!-- タイトル下の淡い青線 -->
            <div style="
                height: 3px;
                width: 100%;
                background: #7dd3fc;
                margin-top: 24px;
                margin-bottom: 16px;
                border-radius: 2px;
            "></div>

            <!-- 線の下にカテゴリー -->
            <span v-if="category" style="
                font-size: 18px;
                color: #64748b;
            ">
                {{ category }}
            </span>
        </div>

        <!-- 下部: 名前 & 日付 (左下) -->
        <div style="display: flex; align-items: flex-end; justify-content: space-between; pt-2;">
            <div style="display: flex; flex-direction: column; gap: 2px;">
                <span style="font-size: 18px; font-weight: 700; color: #334155;">
                    {{ author || '汐猫みお' }}
                </span>
                <span v-if="date" style="font-size: 14px; color: #94a3b8; font-weight: 500;">
                    {{ date }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    title: string
    category?: string
    author?: string
    date?: string
}>()

// タイトルの文字数に応じてフォントサイズを調整
const titleFontSize = computed(() => {
    const len = props.title.length
    if (len > 30) return '36px'
    if (len > 20) return '44px'
    return '52px'
})
</script>