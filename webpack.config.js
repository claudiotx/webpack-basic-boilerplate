const webpack = require('webpack');
// Development Configuration
// ------------------------------------------------------------------
const config = {
    context: __dirname + '/src',
    entry: {
        app: './entry.js'        
    },
    output: {
        path: __dirname + './dist/assets',
        filename: '[name].bundle.js',
        publicPath: "/assets",
    },
    devServer: {
        contentBase: __dirname + '/src',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ["babel-preset-es2015"].map(require.resolve)
                }
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    devtool: "eval-source-map",
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
};

// Production Configurations
// ------------------------------------------------------------------
if (process.env.NODE_ENV === "production") {
    config.devtool = ""; // no sourcemaps
    config.output.filename = 'bundle.min.js',
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));    
  // More Pipes and Stuff (separate build outputs, versioning, etc)
}
module.exports = config;