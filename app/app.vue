<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()
const siteUrl = 'https://blog.shiomiolog.com'

const canonicalUrl = computed(() => {
  const path = route.path === '/'
    ? '/'
    : `${route.path.replace(/\/+$/, '')}/`

  return new URL(path, siteUrl).toString()
})

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value
    }
  ]
}))

useSeoMeta({
  ogUrl: canonicalUrl
})
</script>