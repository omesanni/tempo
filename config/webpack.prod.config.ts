export {};
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBaseConfig = require('./webpack.base.config');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  optimization: {
    moduleIds: 'hashed', // dont rehash cacheGroup bundle if nothing changed
    runtimeChunk: 'single', // dont reshash main bundle if nothing changed
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
        uglifyOptions: {
          compress: {
            ie8: false,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            drop_console: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
          priority: 20,
        },
        common: {
          test: /src/,
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: 10,
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: '[name]-[hash].css' })],
};

module.exports = merge(webpackBaseConfig, prodConfig);
