# webpack-dev

静的HTMLサイト向けのWebpack開発環境です。
既存のHTMLファイルに対してSCSS、TypeScript、画像最適化機能を含む包括的な開発環境を提供します。

## 特徴

- ✅ SCSS → CSS コンパイル
- ✅ TypeScript → JavaScript トランスパイル
- ✅ 画像圧縮（imagemin）
- ✅ WebP変換
- ✅ Tailwind CSS v4 対応
- ✅ ライブリロード（BrowserSync）
- ✅ ESLint / Stylelint / MarkupLint
- ✅ 環境変数による設定管理

## インストール

```sh
npm install
```

## 開発環境の起動

```sh
npm start
```

http://localhost:3000 でサイトが開きます。

## ビルド

```sh
npm run build
```

## 環境設定

`.env`ファイルで各種設定を管理できます：

```env
# CSS・JSを圧縮する（デフォルト: true）
MINIFY=false

# 画像を圧縮する（デフォルト: true）
COMPRESS_IMAGES=false

# 画像をWebPに変換する（デフォルト: false）
CONVERT_TO_WEBP=false

# アセット出力先ディレクトリ（デフォルト: htdocs/_assets配下に出力）
ASSETS_OUTPUT_DIR=_assets
```

## ファイル構成

### 開発ファイル
- **HTML**: `htdocs/` 配下に直接配置
- **SCSS**: `src/_assets/css/` 配下（`_`で始まらないファイルがビルド対象）
- **JS/TS**: `src/_assets/js/` 配下の直下ファイル
- **画像**: `src/_assets/img/` 配下

### 出力ファイル
- **CSS**: `htdocs/{ASSETS_OUTPUT_DIR}/css/`
- **JS**: `htdocs/{ASSETS_OUTPUT_DIR}/js/`
- **画像**: `htdocs/{ASSETS_OUTPUT_DIR}/img/`

## コマンド

| コマンド | 説明 |
|---------|------|
| `npm start` | 開発サーバー起動（webpack watch + BrowserSync + task watch） |
| `npm run build` | 本番ビルド |
| `npm run webpack:watch` | Webpackのみ監視 |
| `npm run serve` | BrowserSyncのみ起動 |
| `npm run lint` | ESLint実行 |
| `npm run lint:css` | Stylelint実行 |
| `npm run lint:markup` | MarkupLint実行 |
| `npm run lint:all` | 全リンター実行 |

## リンター・フォーマッター

- **ESLint**: JavaScript/TypeScript
- **Stylelint**: SCSS
- **MarkupLint**: HTML
- **Prettier**: コードフォーマット

## ディレクトリ構造

```
project/
├── htdocs/                 # 出力先・静的ファイル
│   ├── index.html
│   ├── _assets/           # ビルド済みアセット
│   │   ├── css/
│   │   ├── js/
│   │   └── img/
│   └── sample.html
├── src/                   # ソースファイル
│   └── _assets/
│       ├── css/           # SCSS
│       ├── js/            # JavaScript/TypeScript
│       └── img/           # 画像
├── .env                   # 環境設定
├── webpack.config.js      # Webpack設定
├── package.json
└── その他設定ファイル
```

## 画像最適化

### 圧縮
`COMPRESS_IMAGES=true` で以下の最適化を実行：
- **JPEG**: mozjpeg (品質80%)
- **PNG**: pngquant (品質60-80%)
- **GIF**: gifsicle (インターレース有効)
- **SVG**: svgo (viewBox保持)

### WebP変換
`CONVERT_TO_WEBP=true` で JPG/PNG/GIF を WebP に変換し、元ファイルは htdocs には出力されません（src には残ります）。

## 注意事項

- 出力先を変更した場合は、HTMLファイルのアセットパスも更新してください
- 画像ファイルは webpack のエントリーとして自動登録されます
- `_` で始まる SCSS ファイルは個別にビルドされません（import専用）

