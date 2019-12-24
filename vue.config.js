const path = require('path')
const getLessVariables = require('./src/utils/get-less-variables')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        // modifyVars: {
        //   'base-color': '#409EFF',
        // },
        modifyVars: getLessVariables('./src/assets/less/variable.less'),
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'api': path.resolve(__dirname, 'static/newApi'),
        'assets': '@/assets',
        'views': '@/views',
        'static': path.resolve(__dirname, 'static'),
        'utils': '@/utils',
        'components': '@/components',
        'store': '@/store'
      }
    }
  },
  chainWebpack: config => {
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    })
  },
  devServer: {
    port: '8088',
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}
