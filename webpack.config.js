const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js', // Our main client-side JavaScript
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '', // Ensures assets are served from the root
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader', // Compiles Pug to a JS function
        options: {
          // pretty: process.env.NODE_ENV === 'development', // Optional: for readable HTML
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // Handles images imported/required in JS/CSS
        generator: {
          filename: 'img/[hash][ext][query]', // Outputs images to dist/img/
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/main.pug', // Use our new shell Pug template
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        // Copies contents of 'assets' folder to 'dist/assets'
        { from: 'assets', to: 'assets' },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve files from the 'dist' folder
    },
    port: 4000,
    hot: true, // Enable Hot Module Replacement
    historyApiFallback: true, // Important for client-side routing
  },
  resolve: {
    alias: {
      // Alias to make imports cleaner, points to the project root
      '@components': path.resolve(__dirname, '.'),
    },
  },

};