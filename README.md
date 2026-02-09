# MOSVA 民泊備品まとめサイト

民泊運営に必要な備品・消耗品をカテゴリ別にまとめたWebサイトです。
Notion APIと連携し、Notionで商品を管理できます。

## 特徴

- 🔍 **商品検索機能**: 商品名やカテゴリで簡単に検索
- 🏷️ **カテゴリフィルター**: カテゴリごとに商品を絞り込み
- 📱 **レスポンシブデザイン**: スマホ・タブレット・PCに対応
- ⚡ **高速表示**: Next.js App Routerで最適化
- 🔗 **Amazonアソシエイト対応**: 各商品にアフィリエイトリンク
- 🎨 **モダンUI**: グラデーションとアニメーションで美しいデザイン

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: CSS Modules
- **データソース**: Notion API
- **ホスティング**: Vercel (推奨)

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルを作成し、以下を設定:

```env
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

### 4. 本番ビルド

```bash
npm run build
npm start
```

## Notionデータベースの設定

以下のプロパティを持つNotionデータベースを用意してください:

- **名前** (Title): 商品名
- **カテゴリー** (Select): カテゴリ
- **価格** (Number): 価格 (オプション)
- **AmazonURL** (URL): AmazonアソシエイトリンクURL (オプション)
- **画像** (Files): 商品画像 (オプション)
- **説明** (Text): 商品説明 (オプション)

※ プロパティ名は英語でも日本語でも対応しています

## Vercelへのデプロイ

### 1. GitHubリポジトリを作成

プロジェクトをGitHubにプッシュします。

### 2. Vercelにインポート

1. [Vercel](https://vercel.com)にログイン
2. 「New Project」をクリック
3. GitHubリポジトリを選択
4. 環境変数を設定:
   - `NOTION_TOKEN`
   - `NOTION_DATABASE_ID`
5. 「Deploy」をクリック

### 3. カスタムドメインの設定

1. Vercelのプロジェクト設定を開く
2. 「Domains」タブを選択
3. `mosva.jp` を追加
4. 表示されたDNS設定をお名前.comに追加:
   - Aレコード: Vercelが指定するIPアドレス
   - または CNAMEレコード: `cname.vercel-dns.com`

### お名前.comでの設定例

1. お名前.comの管理画面にログイン
2. 「DNS設定」を選択
3. 以下のレコードを追加:

```
タイプ: A
ホスト: @
値: 76.76.21.21 (Vercelが指定するIP)

タイプ: CNAME
ホスト: www
値: cname.vercel-dns.com
```

## 商品データの更新

Notionで商品情報を更新すると、1時間以内にサイトに反映されます。
即座に反映したい場合は、Vercelで再デプロイしてください。

## ライセンス

© 2026 MOSVA. All rights reserved.
