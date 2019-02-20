const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ATL = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: ['webpack/hot/poll?1000', './src/main.hmr.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx|\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  mode: "development",
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    plugins: [
      new ATL.TsConfigPathsPlugin()
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/views'),
        to: path.resolve(__dirname, './dist/dist/src/views')
      }
    ])
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
};
