module.exports = ctx => {
  const DEBUG = ctx.env !== 'production';

  return {
    plugins: {
      'postcss-import': {},
      'postcss-preset-env': {
        browsers: ['> 1%', 'last 2 versions'],
      },
      cssnano: !DEBUG ? { autoprefixer: false } : false,
    },
  };
};
