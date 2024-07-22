const { defineConfig } = require('@vue/cli-service')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const wasmFile = path.resolve(__dirname, 'node_modules/mediainfo.js/dist/MediaInfoModule.wasm')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [{ from: wasmFile, to: '.' }]
      })
    ]
  }
})
