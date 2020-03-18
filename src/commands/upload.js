const shell = require('shelljs')
const inquirer = require('inquirer')
const chalk = require('chalk')

const upload = (config) => {
  let pwd = process.cwd()

  let questions = [
    {
      type: 'input',
      name: 'version',
      message: '请输入本次上传版本号',
      default: '1.0.0'
    },
    {
      type: 'input',
      name: 'desc',
      message: '请输入版本备注'
    }
  ]

  inquirer.prompt(questions)
    .then(answers => {
      let cmd = answers.desc
        ? `${config.cli_path} -u ${answers.version}@${pwd}/dist --upload-desc ${answers.desc}`
        : `${config.cli_path} -u ${answers.version}@${pwd}/dist`
      shell.exec('npm run build')
      shell.exec(cmd)
      console.log(chalk.green(`\n   版本号：${answers.version}`))
      console.log(chalk.green(`   项目备注：${answers.desc || ''}`))
    })
}

module.exports = {
  upload
}