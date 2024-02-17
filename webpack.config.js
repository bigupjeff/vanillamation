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
		static: {
			directory: path.join(__dirname, 'src' ),
		  },
		port: 9696,
		liveReload: true
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
		// To generate more than one HTML file, declare the plugin more than once:
		new HtmlWebpackPlugin( {
			filename: 'home.html',
			template: 'src/home.html',
			minify: false
		} ),
		new HtmlWebpackPlugin( {
			filename: 'demo/demo.html',
			template: 'src/demo/demo.html',
			minify: false
		} ),
		new HtmlWebpackPlugin( {
			filename: 'demo/modal/modal.html',
			template: 'src/demo/modal/modal.html',
			minify: false
		} ),
	]
}
