const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = (env, options) => {
  return {
    mode: options.mode,
    entry: {
      index: [
        path.resolve(__dirname, "src/index.ts"),
        path.resolve(__dirname, "src/index.scss"),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(
        {
          filename: "css/[name].bundle.css",
        },
        new StylelintPlugin()
      ),
    ],
    module: {
      rules: [
        { test: /\.ts$/, use: "ts-loader", exclude: "/node_modules/" },
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { importLoaders: 1 } },
            {
              loader: "postcss-loader",
              options: {
                config: { path: path.resolve(__dirname, "postcss.config.js") },
              },
            },
            "sass-loader",
          ],
          exclude: "/node_modules/",
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "js/[name].bundle.js",
    },
    devtool: options.mode === "production" ? "eval-source-map" : "none",
  };
};
