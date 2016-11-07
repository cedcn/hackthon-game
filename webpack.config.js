const path = require('path');
const webpack = require('webpack');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const config = {
  context: __dirname,
  entry: {
    app: ['./client/App.jsx', hotMiddlewareScript],
    show: ['./client/Show.jsx', hotMiddlewareScript]
  },
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    root: [
      path.join(__dirname, '/')
    ],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=25000' },
      {
        test: /\.scss|\.css$/,
        loader: 'style!css!autoprefixer!sass'
      },
      { test: /\.(ttf|eot|svg|mp4|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    })
  ],
  node: {
    fs: 'empty'
  },
  devtool: 'source-map'
};

module.exports = config;
