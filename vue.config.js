/*
 * @Description:
 * @Version: 1.00
 * @Autor: songTeng
 * @Date: 2021-08-24 14:16:51
 * @LastEditors: songTeng
 * @LastEditTime: 2021-09-06 14:42:38
 */
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 路径前缀
  publicPath: '/',
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@a', resolve('src/assets'))
    // 忽略的打包文件
    // config.externals({
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios',
    //   'element-ui': 'ELEMENT'
    // })
    const entry = config.entry('app')
    entry.add('babel-polyfill').end()
    entry.add('classlist-polyfill').end()
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...
      config.mode = 'production'
      config.performance = { // 打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
  },
  css: {
    extract: process.env.NODE_ENV === 'production' ? {
      ignoreOrder: true
    } : false, // 解决打包css警告信息
    sourceMap: false,
    modules: false
  },
  // 开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 1024,
    proxy: {
      '/api': {
        // 本地服务接口地址
        target: 'http://127.0.0.1',
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
