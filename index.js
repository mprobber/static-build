const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const STATIC_DIRECTORY = resolve(__dirname, '../static');

module.exports = ({ entry, name, template }) => (_, argv) => ({
  entry: ['@babel/polyfill', entry],
  output: {
    filename: join(name, 'index.js'),
    path: resolve(STATIC_DIRECTORY, name),
  },
  mode: argv.mode || 'development',
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
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
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
