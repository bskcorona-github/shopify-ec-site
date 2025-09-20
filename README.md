# Shopify EC Store

[![GitHub](https://img.shields.io/github/license/bskcorona-github/shopify-ec-site)](https://github.com/bskcorona-github/shopify-ec-site)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)](https://tailwindcss.com/)

ShopifyのMCP（Model Context Protocol）を活用したモダンなECサイトです。Next.js 14とShopify Storefront APIを使用して構築されています。

🌐 **Live Demo**: [https://github.com/bskcorona-github/shopify-ec-site](https://github.com/bskcorona-github/shopify-ec-site)

## 🚀 特徴

- **モダンなUI/UX**: Tailwind CSSを使用したレスポンシブデザイン
- **Shopify統合**: Storefront APIを使用した商品管理
- **カート機能**: ローカルストレージを使用した永続的なカート
- **商品検索**: 高速な商品検索機能
- **カテゴリー別表示**: コレクション別の商品表示
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応

## 🛠️ 技術スタック

- **フロントエンド**: Next.js 14, React 18, TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Context API
- **API**: Shopify Storefront API
- **アイコン**: Lucide React
- **画像**: Next.js Image Optimization

## 📦 インストール

1. リポジトリをクローン
```bash
git clone <repository-url>
cd shopify-ec-site
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数を設定
```bash
cp .env.local.example .env.local
```

`.env.local`ファイルを編集して、Shopifyの設定を追加：

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-shop.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. 開発サーバーを起動
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## 🏪 Shopify設定

### Storefront API アクセストークンの取得

1. Shopify管理画面にログイン
2. Apps > App and sales channel settings に移動
3. Develop apps をクリック
4. Create an app をクリック
5. App setup で以下を設定：
   - App name: EC Store Frontend
   - App developer: あなたの情報
6. Configuration タブで以下を有効化：
   - Storefront API access scopes
   - Unauthenticated read access
7. API credentials タブで Storefront access token をコピー

### 必要な権限

- `unauthenticated_read_product_listings`
- `unauthenticated_read_product_inventory`
- `unauthenticated_read_product_tags`
- `unauthenticated_read_selling_plans`

## 📁 プロジェクト構造

```
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   ├── cart/              # カートページ
│   └── products/           # 商品ページ
├── components/             # Reactコンポーネント
│   ├── Header.tsx         # ヘッダー
│   ├── Footer.tsx         # フッター
│   ├── Hero.tsx           # ヒーローセクション
│   ├── Categories.tsx     # カテゴリー一覧
│   ├── FeaturedProducts.tsx # おすすめ商品
│   └── Newsletter.tsx     # ニュースレター
├── contexts/              # React Context
│   └── CartContext.tsx    # カート状態管理
├── lib/                   # ユーティリティ
│   └── shopify.ts         # Shopify API設定
└── public/                # 静的ファイル
```

## 🎨 カスタマイズ

### テーマカラー

`tailwind.config.js`でテーマカラーを変更できます：

```javascript
colors: {
  primary: {
    // プライマリーカラーを変更
  },
  secondary: {
    // セカンダリーカラーを変更
  }
}
```

### コンポーネントのカスタマイズ

各コンポーネントは`components/`ディレクトリにあり、自由にカスタマイズできます。

## 🚀 デプロイ

### Vercel（推奨）

#### 方法1: Vercel CLIを使用

1. Vercel CLIをインストール
```bash
npm i -g vercel
```

2. ログイン
```bash
vercel login
```

3. デプロイ
```bash
vercel --prod
```

#### 方法2: Vercel Dashboardを使用

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでログイン
3. "New Project"をクリック
4. GitHubリポジトリ`bskcorona-github/shopify-ec-site`を選択
5. 環境変数を設定：
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`: あなたのShopifyストアドメイン
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`: Storefront APIアクセストークン
   - `NEXT_PUBLIC_APP_URL`: デプロイ後のURL
6. "Deploy"をクリック

#### 自動デプロイ

GitHubリポジトリにプッシュするたびに、Vercelが自動的にデプロイを実行します。

### その他のプラットフォーム

- **Netlify**: `npm run build && npm run export`
- **AWS Amplify**: Next.jsアプリとして設定
- **Railway**: GitHubリポジトリを接続

## 📝 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。

## 📞 サポート

質問や問題がある場合は、GitHubのIssuesセクションでお知らせください。
