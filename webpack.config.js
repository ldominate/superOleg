const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV;
const __DEV__ = env === "development";
const __PRODUCTION__ = env === "production";

const paths = {
	src: path.resolve(__dirname, 'src'),
	dist: path.resolve(__dirname, 'dist')
};

const config = {
	context: paths.src, // базовая директория для точек входа и загрузчиков
	entry: {
		app: './index'  // точка входа в приложение, наш src/index.ts файл, названием итогового бандла будет имя свойства - app
	},
	
	output: {
		path: paths.dist,  // путь для результатов сборки
		filename: __PRODUCTION__ ? "[name].bundle.[chunkhash].js" : '[name].bundle.js',  // название итогового бандла, получится dist/app.bundle.js
		chunkFilename: __PRODUCTION__ ? "[name].bundle.[chunkhash].js" : '[name].bundle.js'  //динамически загружаемые модули считаются chunk'ами
	},
	
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'] // указание расширений файлов, которые webpack будет обрабатывать, и пытаться добавить автоматически (например получив запрос на index, не найдет его и попробует index.ts)
	},
	
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			} // загрузчик для обработки файлов с расширением .ts
		]
	},
	
	plugins: [
		// отправляем значение NODE_ENV в качестве глобального параметра
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(env)
		}),
		//ускорение выполнения кода в браузере
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html'
		}) // генерация html-файла на основе нашего шаблона
	]
};

if(__DEV__){
	//выносим source map в development сборку
	// дополнительные настройки и загрузчики не требуются, хотя даже официальный рецепт от TypeScript рекомендует source-map-loader и поле в tsconfig - "sourceMap": true
	config.devtool = "inline-source-map";
}

if(__PRODUCTION__){
	config.plugins.push(new CleanWebpackPlugin(['dist']));
	config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;