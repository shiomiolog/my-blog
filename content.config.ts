import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { defineSitemapSchema } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        category: z.object({
          parent: z.string(),
          child: z.string()
        }),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        sitemap: defineSitemapSchema(),
      })
    })
  }
})