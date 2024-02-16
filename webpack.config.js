const webpack = require( 'webpack' )
const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

module.exports = {
	entry: {
		'index': './src/app.js',
		'demo/demo': '/src/demo/_main.js',
		'engine/engine': '/src/engine/_main.js',
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].js',
	},
	devServer: {
		constentBase: path.join(__dirname, 'src' ),
		port: 9696,
		watchContentBase: true
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin( {
			template: 'src/index.html'
		} )
	]
}
