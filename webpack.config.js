const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist')
};

module.exports = {
	context: paths.src, // базовая директория для точек входа и загрузчиков
	entry: {
		app: './index'  // точка входа в приложение, наш src/index.ts файл, названием итогового бандла будет имя свойства - app
	},
	
	output: {
		path: paths.dist,  // путь для результатов сборки
		filename: '[name].bundle.js',  // название итогового бандла, получится dist/app.bundle.js
		chunkFilename: '[name].bundle.js'  //динамически загружаемые модули считаются chunk'ами
	},
	
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'] // указание расширений файлов, которые webpack будет обрабатывать, и пытаться добавить автоматически (например получив запрос на index, не найдет его и попробует index.ts)
	},
	
	devtool: 'inline-source-map', // дополнительные настройки и загрузчики не требуются, хотя даже официальный рецепт от TypeScript рекомендует source-map-loader и поле в tsconfig - "sourceMap": true
	
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			} // загрузчик для обработки файлов с расширением .ts
		]
	},
	
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './index.html'
		}) // генерация html-файла на основе нашего шаблона
	]
};