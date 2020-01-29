const path = require('path');
const nodeExternals = require('webpack-node-externals');
// const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ZipPlugin = require('zip-webpack-plugin');
module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/index.ts',
  node: {
    __filename: true,
    __dirname: true,
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      src: path.resolve('./src'),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules|\.serverless/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
  },
  plugins: [
    // new WebpackCleanupPlugin(),
    new ZipPlugin({
      filename: 'dist_todo.zip',
    }),
  ],
};
