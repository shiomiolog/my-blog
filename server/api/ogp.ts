// server/api/ogp.ts
import { parse } from 'node-html-parser'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string

  if (!url) {
    throw createError({ statusCode: 400, statusMessage: 'URL parameter is required' })
  }

  try {
    // URLのHTMLを取得
    const html = await $fetch<string>(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ShiomioBot/1.0)'
      }
    })

    const root = parse(html)

    // OGPタグの抽出ヘルパー
    const getMeta = (prop: string) =>
      root.querySelector(`meta[property="${prop}"]`)?.getAttribute('content') ||
      root.querySelector(`meta[name="${prop}"]`)?.getAttribute('content') || ''

    const title = getMeta('og:title') || root.querySelector('title')?.text || url
    const description = getMeta('og:description') || getMeta('description') || ''
    const image = getMeta('og:image') || ''
    const siteName = getMeta('og:site_name') || new URL(url).hostname

    return {
      title,
      description,
      image,
      siteName,
      url
    }
  } catch (error) {
    // 取得失敗時のフォールバック
    const hostname = new URL(url).hostname
    return {
      title: url,
      description: '',
      image: '',
      siteName: hostname,
      url
    }
  }
})