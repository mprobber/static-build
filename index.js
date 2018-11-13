const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { readFileSync } = require('fs');
const babelrc = readFileSync(resolve(__dirname, '..', '.babelrc'));

module.exports = ({ entry, name, template, favicon }) => (_, argv) => ({
  entry: ['@babel/polyfill', entry],
  output: {
    filename: `${name}.index.js`,
    path: resolve(process.cwd(), 'dist'),
  },
  mode: argv.mode || 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: { ...JSON.parse(babelrc.toString()) },
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
      favicon,
    }),
  ],
});
