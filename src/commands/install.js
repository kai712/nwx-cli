const shell = require('shelljs')
const inquirer = require('inquirer')
const { fsExistsSync } = require('../utils/utils')
const chalk = require('chalk')

const install = () => {
  let questions = [
    {
      type: 'checkbox',
      name: 'name',
      pageSize: 40,
      choices: [
        new inquirer.Separator('基础组件'),
        { name: 'badge (徽章)' },
        { name: 'gallery (画廊)' },
        { name: 'loading (加载)' },
        { name: 'icon (图标)' },
        new inquirer.Separator('表单组件'),
        { name: 'form (表单)' },
        { name: 'form-page (表单页面)' },
        { name: 'cell (列表或者是表单的一项)' },
        { name: 'cells (列表分组)' },
        { name: 'checkbox (复选))' },
        { name: 'checkbox-group (复选组)' },
        { name: 'slideview (左滑删除)' },
        { name: 'uploader (图片上传)' },
        new inquirer.Separator('操作反馈'),
        { name: 'dialog (弹窗组件)' },
        { name: 'msg (提供操作确认页或操作成功或失败的标准的确认页的样式)' },
        { name: 'toptips (顶部错误提示)' },
        { name: 'half-screen-dialog (半屏弹窗)' },
        { name: 'actionsheet (底部弹起的操作按钮)' },
        new inquirer.Separator('导航组件'),
        { name: 'navigation-bar (顶部导航)' },
        { name: 'tabbar (自定义tabbar)' },
        new inquirer.Separator('搜索组件'),
        { name: 'searchbar (搜索)' },
        new inquirer.Separator('扩展组件'),
        { name: 'video-swiper (视频滑动切换)' }
      ]
    }
  ]

  inquirer.prompt(questions)
    .then(answers => {

      if (answers.name.length === 0) {
        console.log(chalk.red(`\n error: 暂未选择任何组件`))
        return
      }
      
      let node_modules = fsExistsSync(`node_modules`)
      if (!node_modules) {
        console.log(chalk.red(`\n error: 未在当前目录下找到node_modules`))
        return
      }

      let weui = fsExistsSync(`node_modules/weui-miniprogram/miniprogram_dist`)
      if (!weui) {
        shell.exec(`npm install weui-miniprogram --save`)
      }
      
      let components = answers.name.map(item => item.split(' ')[0])
      let weuipath = fsExistsSync('weui_components')
      if (!weuipath) {
        shell.exec(`mkdir weui_components`)
      }

      for (let item of components) {
        shell.exec(`cp -rf node_modules/weui-miniprogram/miniprogram_dist/${item} weui_components/`, {silent: true})
      }
      shell.exec(`mv weui_components src/`, {silent: true})
      console.log(chalk.green(`\n install ${components} success！！`))
    })
}

module.exports = {
  install
}