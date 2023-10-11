module.exports = {
  devtool: "eval-source-map",
  entry: './index.ts',
  output: {
    path: __dirname+'/dist',
    filename: 'index.js', 
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts','.css']
  },
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
};