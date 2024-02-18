const webpack = require( 'webpack' )
const path = require( 'path' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )

module.exports = {
	entry: {
		'vanillamation': './src/app.js',
		'demo/modal': '/src/demo/modal/_main.js',
		'demo/bouncing-ball': '/src/demo/bouncing-ball/_main.js',
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
			filename: 'index.html',
			template: 'src/index.html',
			minify: false
		} ),
		new HtmlWebpackPlugin( {
			filename: 'demo/modal/modal.html',
			template: 'src/demo/modal/modal.html',
			minify: false
		} ),
		new HtmlWebpackPlugin( {
			filename: 'demo/bouncing-ball/bouncing-ball.html',
			template: 'src/demo/bouncing-ball/bouncing-ball.html',
			minify: false
		} ),
	]
}
