<template>
    <nav aria-label="この記事の目次">
        <ol class="border-l border-slate-200">
            <li v-for="link in links" :key="link.id">
                <a :href="`#${link.id}`" class="-ml-px block border-l py-1.5 pl-4 text-xs leading-5 transition-colors"
                    :class="activeId === link.id
                        ? 'border-[#5A98D8] font-semibold text-[#417EBB]'
                        : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900'
                        " @click="scrollToHeading($event, link.id)">
                    {{ link.text }}
                </a>

                <ol v-if="link.children?.length" class="pb-1">
                    <li v-for="child in link.children" :key="child.id">
                        <a :href="`#${child.id}`"
                            class="-ml-px block border-l py-1.5 pl-7 text-xs leading-5 transition-colors" :class="activeId === child.id
                                ? 'border-[#5A98D8] font-medium text-[#417EBB]'
                                : 'border-transparent text-slate-400 hover:border-slate-300 hover:text-slate-800'
                                " @click="scrollToHeading($event, child.id)">
                            {{ child.text }}
                        </a>
                    </li>
                </ol>
            </li>
        </ol>
    </nav>
</template>

<script setup lang="ts">
type TocLink = {
    id: string
    text: string
    depth: number
    children?: TocLink[]
}

const props = defineProps<{
    links: TocLink[]
}>()

const activeId = ref('')
let animationFrame: number | undefined

const flatLinks = computed(() => {
    const result: TocLink[] = []

    const appendLinks = (links: TocLink[]) => {
        for (const link of links) {
            result.push(link)

            if (link.children?.length) {
                appendLinks(link.children)
            }
        }
    }

    appendLinks(props.links)
    return result
})

const updateActiveHeading = () => {
    const headings = flatLinks.value
        .map(link => document.getElementById(link.id))
        .filter((heading): heading is HTMLElement => Boolean(heading))

    const firstHeading = headings[0]

    if (!firstHeading) {
        activeId.value = ''
        return
    }

    let currentHeading = firstHeading

    for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 140) {
            currentHeading = heading
        }
    }

    activeId.value = currentHeading.id
}

const scheduleUpdate = () => {
    if (animationFrame !== undefined) {
        return
    }

    animationFrame = window.requestAnimationFrame(() => {
        updateActiveHeading()
        animationFrame = undefined
    })
}

const scrollToHeading = (event: MouseEvent, id: string) => {
    event.preventDefault()

    const heading = document.getElementById(id)

    if (!heading) {
        return
    }

    heading.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })

    window.history.replaceState(
        null,
        '',
        `#${encodeURIComponent(id)}`
    )
}

onMounted(() => {
    updateActiveHeading()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', scheduleUpdate)
    window.removeEventListener('resize', scheduleUpdate)

    if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame)
    }
})
</script>