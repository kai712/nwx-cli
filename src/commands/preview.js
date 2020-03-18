const shell = require('shelljs')

const preview = (config) => {
  let pwd = process.cwd()
  shell.exec(`${config.cli_path} -p ${pwd}/dist`)
}

module.exports = {
  preview
}