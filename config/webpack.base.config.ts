export {};
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const DEBUG = ENV !== 'production';

module.exports = {
  target: 'web',
  entry: {
    app: ['./src', './src/styles/index.scss'],
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          DEBUG ? 'style-loader' : { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
        ],
      },
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin({ shorthands: true }),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new MomentLocalesPlugin({ localesToKeep: ['en'] }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
    }),
  ],
};
