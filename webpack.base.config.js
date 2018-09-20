const path = require('path');const webpack = require('webpack');const HtmlWebpackPlugin = require('html-webpack-plugin');const CopyWebpackPlugin = require('copy-webpack-plugin');const ExtractTextPlugin = require("extract-text-webpack-plugin");const autoprefixer = require('autoprefixer');// node:{//         __dirname:true//“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。//     }function resolve(dir) {//因为自己改变了文件的路径，这里需要重新处理一下  return path.join(__dirname, '.', dir);}const postcssOpts = {  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options  plugins: () => [    autoprefixer({      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],    }),    // postcssflexibility()  ],}module.exports = {  entry: {//string|object|array,起点或者是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行    // common:'./src/js/common/common.js',    index: './src/js/page/index.js',    browser: './src/js/page/browser.js'  },  output: {//指示webpack如何去输出，以及在哪里输出你的「bundle、asset和其他你所打包或使用webpack载入的任何内容」。    path: path.join(__dirname, './live/'),//目录对应一个绝对路径    //pathinfo:true,//告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。默认是false，pathinfo是在开发环境中使用，在生产环境中就不推荐    filename: 'js/[name].[chunkhash].min.js',//filename选项决定了在每个输出bundle的名称。这些bundle将写入到「output.path」选项指定的目录下。2017-08-09版本叠加，添加hash，有利于管理    // publicPath:'/',//值是string类型，对于加载（on-demand-load）或加载外部资源(external resources)（如图片、文件等）来说    //output.publicPath是很重要的选项。如果指定了一个错误的值，则在加载这些资源的时候会收到404错误  },  module: {    rules: [      // {      //     enforce:"pre",//在babel-loader对源码进行编译前进行lint的检查      //     test:/\.(js|html)$/,//检查js文件和html文件内的javascript代码的规范      //     exclude:path.join(__dirname,'node_module'),      //     use:[{      //         loader:"eslint-loader",      //         options:{      //             formatter: require('eslint-friendly-formatter')   // 编译后错误报告格式      //         }      //     }]      // },      {        rules: [{          test: /\.pug$/,          use: ['html-loader', 'pug-html-loader']        }        ]      },      {// 处理js-es6的规则        test: /\.js$/,//匹配资源，处理的文件的后缀名        exclude: path.join(__dirname, 'node_modules'),//排除匹配的文件夹        use: {//每个入口（entry）指定使用一个loader，处理的加载器是loader          loader: 'babel-loader',        },        include: path.join(__dirname, 'src'),//包含的路径（匹配特定条件）      },      {        test: /\.css$/,        use: ExtractTextPlugin.extract({          fallback: 'style-loader',          use: [            {loader: 'css-loader', options: {minimize: true}}, {loader: 'postcss-loader', options: postcssOpts}          ],          publicPath: "../"//生产环境下（也就是npm run build之后）重写资源的引入的路径,参考链接https://webpack.js.org/plugins/extract-text-webpack-plugin/#-extract        })      },      {//处理css的规则,处理less的规则        test: /\.less/,        use: ExtractTextPlugin.extract({          fallback: 'style-loader',          use: [            { loader: 'css-loader', options: {minimize: true}}, { loader: 'postcss-loader', options: postcssOpts }, 'less-loader'          ],          publicPath: "../"        })      },      {//处理图片资源,样式        test: /\.(png|svg|jpg|jpeg|gif)$/,//这里处理了以.png .svg .jpg .jpeg .gif为后缀名的图片        use: [          {loader: 'file-loader?limit=1024&name=images/[hash:8].[ext]'}//加载器file-loader和npm run build之后 图片的存储文件夹          // {loader:'file-loader?limit=1024&name=images/[hash:8].[ext]'}//加载器file-loader和npm run build之后 图片的存储文件夹        ]      },      // {      //      //   test: /\.html$/,      //   use:[      //     {loader:'html-withimg-loader'}      //   ]      //      // },      {//处理html，插入在html中的图片img用此处理        test: /\.html$/,        use: [          {loader: 'html-loader'}        ]      },      {//处理字体        test: /\.(woff|woff2|eot|ttf|otf)$/,        use: [          // 'file-loader'//等同于{loader:'file-loader'}          {loader: 'file-loader?limit=1024&name=fonts/[name].[ext]'}//加载器file-loader和npm run build之后字体的存储文件夹        ]      }    ]  },  //https://github.com/pugjs/pug-loader/issues/8#issuecomment-55568520  node: {    fs: "empty"  },  plugins: [    new CopyWebpackPlugin([      {from: 'src/images', to: './images'},    ]),    new webpack.ProvidePlugin({      'Holder': 'holderjs',      'holder': 'holderjs',      'window.Holder': 'holderjs'    }),    new HtmlWebpackPlugin({//简化了html文件的创建，以便为webpack包提供服务。      filename: resolve('./live/index.html'),//处理dirname路径的问题 ，这里等同于'../live/index.html'      template: './src/pug/page/index.pug',      chunks: ['index']//选择加载的css和js,模块名对应上面entry接口的名称    }),    new HtmlWebpackPlugin({//简化了html文件的创建，以便为webpack包提供服务。      filename: resolve('./live/browser.html'),//处理dirname路径的问题 ，这里等同于'../live/index.html'      template: './src/pug/page/browser.pug',      chunks: ['browser']//选择加载的css和js,模块名对应上面entry接口的名称    }),    new ExtractTextPlugin({//从bundle中提取出      filename: (getPath) => {        return getPath('css/[name].[chunkhash].min.css').replace('css/js', 'css');//.js文件中的.css|.less|.sass内容转换成转换成.css文件。 2017-08-09,添加hash，有利于资源管理      },      disable: false,//禁用插件为false      // allChunks:true    }),    //new ExtractTextPlugin('css/[name].css')  ]}