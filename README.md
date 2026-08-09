# Nuxt Content Starter

Look at the [Nuxt Content documentation](https://content.nuxt.com) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```


## 記事の作成と公開

### 1. Markdownファイルを作成する

記事は `content/YYYY/MM/` 以下にMarkdown形式で作成します。

```text
content/2026/08/10-example.md
```

front matterは次の形式で記述します。

```yaml
---
title: 記事タイトル
date: "2026-08-10 12:00"
category:
  parent: 技術
  child: ブログ
description: 記事の概要
---

ここから記事本文です。
```

### 2. ローカルで表示を確認する

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開き、記事一覧と記事ページを確認します。

### 3. 公開用ファイルを生成する

pushする前に静的生成が成功することを確認します。

```bash
npm run generate
```

ルーティングや生成結果がおかしい場合は、Nuxtのキャッシュを削除して再実行します。

```bash
npx nuxt cleanup
npm run generate
```

### 4. GitHubへpushする

```bash
git add content/
git commit -m "Add 記事タイトル"
git push
```

GitHubへのpush後、Cloudflareで自動的にビルド・公開されます。

## OGP画像

トップページおよび各記事のOGP画像は、デプロイ時に自動生成されます。記事ごとの画像には、Markdownの次の情報が反映されます。

* 記事タイトル
* カテゴリ
* 著者名
* 公開日時

記事ごとにOGP画像を手動で作成する必要はありません。

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
