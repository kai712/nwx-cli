const inquirer = require('inquirer')
const shell = require('shelljs')
const { rewriteFile } = require('../utils/utils')
const path = require('path')
const chalk = require('chalk')
const fs = require('fs')

const init = (version) => {
  let questions = [
    {
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称',
      default: 'myProject'
    },
    {
      type: 'input',
      name: 'appid',
      message: '请输入 AppID(小程序ID)'
    },
    {
      type: 'confirm',
      name: 'isLint',
      message: '是否开启 git commit 时自动lint检查',
      default: true
    }
  ]

  inquirer.prompt(questions)
    .then(answers => {
      let projectName = answers.projectName
      let pwd = process.cwd()
      if (answers.appid === '') {
        throw new Error('appid 不可为空，请填写AppID(小程序ID)')
      }

      fs.exists(`${pwd}/.git`, (exists) => {
        if (!exists && answers.isLint) {
          shell.exec(`git init`)
          shell.exec(`git commit --no-verify --allow-empty -m "initial commit"`, {silent: true})
        }

        let template = path.join(__dirname, '../../template')

        // 生成模板文件
        shell.exec(`cp -rf ${template}/common/ ${pwd}`, {silent: true})

        if (answers.isLint) {
          shell.exec(`cp -rf ${template}/lint/package.json ${pwd}`, {silent: true})
        }

        rewriteFile(`${pwd}/package.json`, {projectName: projectName})
        rewriteFile(`${pwd}/src/project.config.json`, {projectName: projectName, appid: answers.appid})

        shell.exec(`npm install`)
        shell.exec(`webpack`, {silent: true})

        console.log(chalk.blue(`\n nwx-cli ${version}`))
        console.log(chalk.white(`Creating project in ${pwd}/${projectName}`))
        console.log(chalk.green('project init success!!'))
        console.log(chalk.white('\n请执行以下命令启动本地环境:\n'))
        console.log(chalk.green('         npm run start'))
      })
    })
}

module.exports = {
  init
}