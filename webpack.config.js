import path from 'path';
import webpack from 'webpack';

export default {
  entry: './content.js', // 入口文件
  output: {
    filename: 'content.bundle.js', // 输出文件名
    path: path.resolve('dist'), // 输出目录
  },
  mode: 'production', // 或 'development'，根据需要选择
  resolve: {
    fallback: {
      crypto: 'crypto-browserify', // 使用 crypto-browserify 替代 crypto
      stream: 'stream-browserify', // 使用 stream-browserify 替代 stream
      vm: 'vm-browserify', // 使用 vm-browserify 替代 vm
    },
  },
  module: {
    rules: [
      {
        test: /\.pem$/,
        use: 'null-loader', // 忽略 .pem 文件
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'], // 提供全局 Buffer 支持
      process: 'process/browser', // 提供全局 process 支持
    }),
  ],
};
