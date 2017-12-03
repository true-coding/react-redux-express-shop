module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'react',
            ['env', { targets: { browsers: ['last 2 versions'] } }],
            'stage-0'
          ]
        }
      }
    ]
  }
};
