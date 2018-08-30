const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
  	contentBase: './dist',
    clientLogLevel: 'none'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      },
      {
      	test: /\.(js|jsx|mjs)$/,
      	exclude: /node_modules/,
      	loader: "babel-loader",
      	options: {
      		cacheDirectory: true
      	}
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // require('postcss-import')(),
                require('stylelint')(),
                require('autoprefixer')({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                })
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
