const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const STATIC_DIRECTORY = resolve(__dirname, '../static');

module.exports = ({ entry, name, template }) => () => ({
  entry: ['@babel/polyfill', entry],
  output: {
    filename: join(name, 'index.js'),
    path: resolve(STATIC_DIRECTORY, name),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-transform-flow-strip-types',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template,
    }),
  ],
});
