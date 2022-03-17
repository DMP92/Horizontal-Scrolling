const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: path.join(__dirname, '../src/index.html')
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            // CSS
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

            // Images
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },

            // Fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },

            // CSV 
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },

            // XML
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            
        ],
    },
}