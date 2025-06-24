import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import RemoveEmptyScriptsPlugin from "webpack-remove-empty-scripts";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entries = {};

// JS/TSファイルのエントリー（直下ファイルのみ）
glob.sync("src/_assets/js/*.{js,ts}").forEach((file) => {
  const name = file.replace("src/", "").replace(/\.(js|ts)$/, "");
  entries[name] = file;
});

// SCSSファイルのエントリー（_から始まるファイルは除く）
const scssFiles = await glob("src/_assets/css/**/*.scss", {
  ignore: ["**//_*.scss"],
});
scssFiles.forEach((file) => {
  const name = file.replace("src/", "").replace(/\.scss$/, "");
  entries[name] = file;
});

export default (env, argv) => {
  const isProduction = argv.mode === "production";
  const shouldMinify = process.env.MINIFY !== "false";

  return {
    mode: isProduction ? "production" : "development",
    entry: entries,
    output: {
      path: path.resolve(__dirname, "htdocs"),
      filename: "[name].js",
      // clean: false,
      clean: {
        keep: (asset) => !asset.endsWith(".map"),
      },
    },
    optimization: {
      minimize: shouldMinify,
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: !isProduction,
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: !isProduction,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: !isProduction,
                sassOptions: {
                  outputStyle: "expanded",
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new RemoveEmptyScriptsPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
    ],
    resolve: {
      extensions: [".ts", ".js", ".json"],
      extensionAlias: {
        ".js": [".js", ".ts"],
      },
      preferRelative: true,
    },
    devtool: isProduction ? false : "source-map",
    stats: "minimal",
    watch: !isProduction,
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
