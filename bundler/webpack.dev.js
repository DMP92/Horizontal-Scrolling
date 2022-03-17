const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(
    common, 
    {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: 'dist',
        host: '192.168.1.22',
        open: true,
        hot: false,
    },
})