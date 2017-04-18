const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./src/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public")
  },

  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: '/',
    historyApiFallback: true,
    open: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_ROOT': '"http://localhost:3002"',
    }),
  ],

  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)(\?.*)?$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    module: 'empty'
  }
}
