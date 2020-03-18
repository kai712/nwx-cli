const shell = require('shelljs')

const open = (config) => {
  let pwd = process.cwd()
  shell.exec(`${config.cli_path} -o ${pwd}/dist`)
}

module.exports = {
  open
}