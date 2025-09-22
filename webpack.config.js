import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import RemoveEmptyScriptsPlugin from "webpack-remove-empty-scripts";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
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

// 画像ファイルのエントリー
const imageFiles = await glob("src/_assets/img/**/*.{jpg,jpeg,png,gif,svg}");
imageFiles.forEach((file) => {
  const name = file.replace("src/", "").replace(/\.(jpg|jpeg|png|gif|svg)$/, "");
  entries[name] = file;
});

export default (env, argv) => {
  const isProduction = argv.mode === "production";
  const shouldMinify = process.env.MINIFY !== "false";
  const shouldCompressImages = process.env.COMPRESS_IMAGES !== "false";
  const shouldConvertToWebP = process.env.CONVERT_TO_WEBP === "true";
  const assetsOutputDir = process.env.ASSETS_OUTPUT_DIR || "_assets";

  return {
    mode: isProduction ? "production" : "development",
    entry: entries,
    output: {
      path: path.resolve(__dirname, "htdocs"),
      filename: `${assetsOutputDir}/js/[name].js`,
      // clean: false,
      clean: {
        keep: (asset) => !asset.endsWith(".map"),
      },
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
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: (pathData) => {
              const relativePath = pathData.filename.replace("src/_assets/img/", "");
              return `${assetsOutputDir}/img/${relativePath}`;
            },
          },
        },
      ],
    },
    plugins: [
      new RemoveEmptyScriptsPlugin(),
      new MiniCssExtractPlugin({
        filename: `${assetsOutputDir}/css/[name].css`,
      }),
      ...(shouldCompressImages ? [
        new ImageMinimizerPlugin({
          test: /\.(jpe?g|png|gif|svg)$/i,
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ["imagemin-mozjpeg", { quality: 80 }],
                ["imagemin-pngquant", { quality: [0.6, 0.8] }],
                ["imagemin-gifsicle", { interlaced: true }],
                ["imagemin-svgo", {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                }],
              ],
            },
          },
        })
      ] : []),
      ...(shouldConvertToWebP ? [
        new ImageMinimizerPlugin({
          test: /\.(jpe?g|png|gif)$/i,
          deleteOriginalAssets: true,
          generator: [
            {
              type: "asset",
              implementation: ImageMinimizerPlugin.imageminGenerate,
              options: {
                plugins: ["imagemin-webp"],
              },
              filename: `${assetsOutputDir}/img/[path][name].webp`,
            },
          ],
        })
      ] : []),
    ],
    optimization: {
      minimize: shouldMinify,
      minimizer: shouldMinify ? [
        "...",
      ] : [],
    },
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
