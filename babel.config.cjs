const presets = [
    ["@babel/preset-env", {
        targets: {
            "electron": 5
        }
    }]
];

const plugins = [
    "@babel/plugin-proposal-optional-chaining"
];

module.exports = {
    presets: presets,
    plugins: plugins,
    exclude: "node_modules/**",
    sourceMaps: "inline"
};