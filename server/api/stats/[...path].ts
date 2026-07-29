// server/api/stats/[...path].ts
export default defineEventHandler(async (event) => {
  // Cloudflare Pages からバインディングされた DB を取得
  const db = event.context.cloudflare?.env?.DB

  // DBが存在しない場合（ローカル等）の安全処理
  if (!db) {
    return { views: 0, likes: 0, isLocal: true }
  }

  const path = getRouterParam(event, 'path') || '/'

  // POSTリクエストが来たら閲覧数を +1 インクリメント
  if (event.method === 'POST') {
    await db.prepare(`
      INSERT INTO article_stats (path, views)
      VALUES (?, 1)
      ON CONFLICT(path) DO UPDATE SET
        views = views + 1,
        updated_at = CURRENT_TIMESTAMP
    `).bind(path).run()
  }

  // 現在の閲覧数・いいね数を取得
  const stats = await db.prepare('SELECT views, likes FROM article_stats WHERE path = ?')
    .bind(path)
    .first() as { views: number; likes: number } | undefined

  return {
    views: stats?.views || 0,
    likes: stats?.likes || 0
  }
})