const fs = require('fs')
const Handlebars = require('handlebars')
const chalk = require('chalk')

const rewriteFile = (path, data) => {
  let file = fs.readFileSync(path, "utf8")
  let template = Handlebars.compile(file)
  let result = template(data)
  
  fs.writeFileSync(path, result)
}

let config = {}
const readConfig = () => {
  if (config.cli_path && config.cli_path !== '') {
    return config
  }

  try {
    let pwd = process.cwd()
    config = require(`${pwd}/config`)
    return config ? config : {
      cli_path: '/Applications/wechatwebdevtools.app/Contents/MacOS/cli'
    }
  } catch(err) {
    console.log(chalk.white(`\n ${err}`))
    console.log(chalk.red(`\n 请到项目目录下运行该命令！`))
    process.exit()
  }
}

// 判断文件或文件夹存不存在
const fsExistsSync = path => {
  try{
      fs.accessSync(path,fs.F_OK);
  }catch(e){
      return false;
  }
  return true;
}

module.exports = {
  rewriteFile,
  readConfig,
  fsExistsSync
}