#!/usr/bin/env node

const version = require('../package').version;                 // 版本号
const { program } = require('commander');                         // 命令行解析
const { init } = require('./commands/init')
const { open } = require('./commands/open')
const { preview } = require('./commands/preview')
const { upload } = require('./commands/upload')
const { create } = require('./commands/create')
const { install } = require('./commands/install')
const { readConfig } = require('./utils/utils')

// 设置版本
program
  .version('2.2.2')

// init 项目
program
  .command('init')
  .description('初始化本地开发环境')
  .action(() => {
    init(version)
  })

// 打开微信调试工具
program
  .command('open')
  .description('打开微信调试工具')
  .action(() => {
    let config = readConfig()
    open(config)
  })

// 预览
program
  .command('preview')
  .description('预览小程序')
  .action(() => {
    let config = readConfig()
    preview(config)
  })

// 上传代码
program
  .command('upload')
  .description('上传代码到开发版本')
  .action(() => {
    let config = readConfig()
    upload(config)
  })

// 创建component、page模板文件
program
  .command('create <name> <type>')
  .description('创建component、page模板文件')
  .action((name, type) => {
    create(name, type)
  })

// 使用微信小程序原生组件
program
  .command('install')
  .description('使用微信小程序原生组件')
  .action(() => {
    install()
  })


program.parse(process.argv)