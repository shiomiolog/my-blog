// server/api/upload.post.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async (event) => {
  // 1. API Key チェック
  const apiKey = getHeader(event, 'x-api-key')
  const config = useRuntimeConfig()
  if (!apiKey || apiKey !== config.uploadApiKey) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // 2. リクエストボディを取得
  const body = await readBody(event)
  const filename = body?.filename || 'image.png'
  const contentType = body?.contentType || 'image/png'

  // 3. S3 Client の初期化
  const accountId = process.env.R2_ACCOUNT_ID
  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
  })

  const timestamp = Date.now()
  const originalName = filename.replace(/\s+/g, '_')
  const key = `posts/${timestamp}-${originalName}`

  const command = new PutObjectCommand({
    Bucket: 'my-blog-assets',
    Key: key,
    ContentType: contentType
  })

  // 4. 署名付きURLの発行（有効期限10分）
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 600 })
  const publicUrl = `https://blog-asset.shiomiolog.com/${key}`

  return {
    uploadUrl,
    publicUrl,
    markdown: `![${originalName}](${publicUrl})`
  }
})