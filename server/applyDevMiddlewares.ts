/**
 * @overview Apply express middleware for local development.
 */
export {};
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../config/webpack.dev.config');

module.exports = app => {
  const compiler = webpack(webpackDevConfig);

  app.use(history());
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler));

  return app;
};
