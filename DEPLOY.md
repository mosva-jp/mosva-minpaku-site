# mosva.jp デプロイ手順書

## 準備するもの

✅ Notion統合トークン (取得済み)  
✅ NotionデータベースID (取得済み)  
✅ GitHubアカウント  
✅ Vercelアカウント (無料でOK)  
✅ お名前.comのアカウント

---

## Step 1: GitHubリポジトリの作成

### 1-1. GitHubにログイン
https://github.com にアクセスしてログイン

### 1-2. 新しいリポジトリを作成
1. 右上の「+」→「New repository」をクリック
2. Repository name: `mosva-minpaku-site`
3. Public または Private を選択
4. 「Create repository」をクリック

### 1-3. コードをアップロード
ターミナル(コマンドプロンプト)で以下を実行:

```bash
cd /path/to/mosva-minpaku-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/mosva-minpaku-site.git
git push -u origin main
```

※ `your-username` は自分のGitHubユーザー名に置き換えてください

---

## Step 2: Vercelへのデプロイ

### 2-1. Vercelにログイン
https://vercel.com にアクセスして「Sign Up」
GitHubアカウントで連携ログイン

### 2-2. プロジェクトをインポート
1. 「Add New...」→「Project」をクリック
2. GitHubから `mosva-minpaku-site` を選択
3. 「Import」をクリック

### 2-3. 環境変数を設定
「Environment Variables」セクションで以下を追加:

```
Name: NOTION_TOKEN
Value: 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

Name: NOTION_DATABASE_ID
Value: 2ce411dec37d80d18a17f0aa4158022c
```

### 2-4. デプロイ実行
「Deploy」ボタンをクリック

数分待つと、デプロイ完了！
`https://mosva-minpaku-site.vercel.app` のようなURLが発行されます。

---

## Step 3: カスタムドメイン (mosva.jp) の設定

### 3-1. Vercelでドメインを追加
1. プロジェクトの「Settings」→「Domains」を開く
2. 「Add」をクリック
3. `mosva.jp` を入力して「Add」

### 3-2. DNS設定情報を確認
Vercelが以下のような設定を表示します:

**Aレコード設定 (推奨)**
```
Type: A
Name: @
Value: 76.76.21.21
```

**または CNAMEレコード設定**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### 3-3. お名前.comでDNS設定

1. お名前.com Naviにログイン: https://navi.onamae.com/
2. 「ドメイン設定」→「DNS設定/転送設定」を選択
3. `mosva.jp` を選択して「次へ」
4. 「DNSレコード設定を利用する」→「設定する」

**Aレコードを追加:**
```
ホスト名: (空欄)
TYPE: A
VALUE: 76.76.21.21
TTL: 3600
```

**wwwのCNAMEレコードも追加 (オプション):**
```
ホスト名: www
TYPE: CNAME
VALUE: cname.vercel-dns.com
TTL: 3600
```

5. 「追加」→「確認画面へ進む」→「設定する」

### 3-4. 反映を待つ
DNS設定が反映されるまで**数分〜48時間**かかります。
通常は30分〜1時間程度で反映されます。

### 3-5. 確認
ブラウザで `https://mosva.jp` にアクセスして、サイトが表示されればOK！

---

## Step 4: 商品データの更新方法

### Notionで商品を追加・編集
1. Notionのデータベースページを開く
2. 商品を追加・編集
3. 保存

### 自動更新
- サイトは1時間ごとに自動的にNotionからデータを取得します

### 手動更新 (即座に反映したい場合)
1. Vercelのプロジェクトページを開く
2. 「Deployments」タブを選択
3. 最新のデプロイの右側の「...」→「Redeploy」をクリック

---

## トラブルシューティング

### サイトが表示されない
- Vercelのデプロイが成功しているか確認
- 環境変数が正しく設定されているか確認
- ブラウザのキャッシュをクリア

### ドメインが反映されない
- DNS設定が正しいか確認
- 最大48時間待つ
- `dig mosva.jp` コマンドでDNS伝播を確認

### 商品が表示されない
- Notion統合がデータベースに接続されているか確認
- 環境変数のトークンとIDが正しいか確認
- Vercelのログを確認

---

## サポート

問題が解決しない場合:
1. Vercelのログを確認
2. GitHubのIssuesに報告
3. Notion APIのステータスを確認: https://status.notion.so/

---

## 完了チェックリスト

- [ ] GitHubリポジトリ作成完了
- [ ] Vercelデプロイ完了
- [ ] 環境変数設定完了
- [ ] カスタムドメイン追加完了
- [ ] DNS設定完了
- [ ] mosva.jpでアクセス確認完了
- [ ] 商品データ表示確認完了
- [ ] 検索機能動作確認完了
- [ ] カテゴリフィルター動作確認完了

すべてチェックが付いたら完成です！🎉
