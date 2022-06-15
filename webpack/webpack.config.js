const path = require('path');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        background: path.resolve(__dirname, "..", "src", "background.ts"),
        popup: path.resolve(__dirname, "..", "src", "popup.ts"),
        options: path.resolve(__dirname, "..", "src", "options.ts"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new copyPlugin({
            patterns: [{from: ".", to: ".", context: "public"}],
        }),
    ],
};