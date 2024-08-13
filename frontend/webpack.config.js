const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects CSS into the DOM
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader', // Processes CSS with PostCSS
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Transpile JS files using Babel
        },
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'], // Extracts source maps from source files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map', // Generates source maps for easier debugging
};
