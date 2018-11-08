'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const static_dir = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)

console.log(chalk.red('移除目录: ' + chalk.white.underline(static_dir) + '\n'))

rm(static_dir, err => {
  if (err) throw err

  let spinner = ora('构建生产环境...').start()

  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err

    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  构建失败.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  生产构建完成.\n'))
    console.log(chalk.yellow(
      '  提示: 将构建文件部署到一台HTTP服务器上.\n' +
      '  不能以file://打开index.html文件的方式访问.\n'
    ))
  })
})
