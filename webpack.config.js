const path = require("path");

module.exports = {
    // devtool: "source-map",
    entry: "./src/index.ts",
    externals: [
        "@aws-sdk/client-s3"
    ],
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    output: {
        filename: "index.js",
        library: {
            type: "commonjs2"
        },
        path: path.resolve(__dirname, "build/webpack"),
    },
};
