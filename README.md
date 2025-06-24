# webpack-dev
Webpack-dev環境

# Webpack開発環境

## インストール

```sh
npm i
```

## セットアップ
```sh
npm start
```
http://localhost:3000

## ビルド
```sh
npm run build
```

### チェック
#### ESLint
```sh
npm run lint
```
#### MarkupLint
```sh
npm run markup
```


## 使い方
- html、画像は直接`htdocs`配下に配置して編集してください。
- Tailwind v4にも対応しています。
- スタイルは`src/nadia_css/`配下にscssを作成して編集してください。頭に`_`が付いていないscssファイルが`htdocs/nadia_css/`配下にビルドされますのでページごとにcssを分けて作成してください。
- スクリプトは`src/nadia_js/`直下に作成されたファイルが`htdocs/nadia_js/`配下にビルドされますのでページごとにファイルを分けて作成することも可能です。Typescriptにも対応しています。
- コマンドラインもしくは`staging`または`nademo`ブランチにプルリクを作成すると自動でESLintとMarkuplintが走ります。適宜チェックに使用してください。


## ディレクトリ構造
```
project/
├── htdocs/
│   ├── index.html
│   ├── nadia_css/         # ビルドされたCSS
│   └── nadia_js/          # ビルドされたJS
├── src/
│   ├── nadia_css/
│   │   ├── style_page.scss
│   │   └── style_top.scss
│   └── nadia_js
│       ├── top.js
│       └── page.js
├── .github/
├── .vscode/
├── bs-config.cjs
├── eslint.config.js
├── markuplint-check.sh
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── webpack.config.js
├── .editorconfig
├── .gitignore
├── .markuplintrc
├── .node-version
├── .prettierrc
└── .stylelintrc.cjs
```

