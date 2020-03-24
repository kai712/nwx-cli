## nwx-cli
nwx-cli 是一款能提供给你极致开发体验的微信小程序 CLI 工具！！！

啪（pa）一下，一键生成本地开发环境！

## 环境
- node >= v10.13.0
- git
- webpack 4.0以上

## 功能

- [x] 支持npm包
- [x] 可以任意使用es6/7新特性
- [x] 支持sass、less等
- [x] 对wxml、wxss、js压缩
- [x] 编译速度优化
- [x] npm lint自动流（基于git hooks）
- [x] 自动指定项目路径，并开启小程序调试工具
- [x] 获取预览二维码
- [x] 上传代码
- [x] 通过nwx create命令自动创建page、component模板
- [x] 可按需引入官方weui基础组件库

## 开始
- 新建一个项目根目录
- nwx init

全局安装（**推荐**）：

```
npm i -g nwx-cli
```

初始化项目：先新建一个项目根目录，然后在项目根目录中运行如下命令

```
nwx init
```

运行：

```
npm run start
```

到这里，本地开发环境就启动成功了，并且还会自动帮你打开微信小程序调试工具哟。

## 项目目录结构

``````
|---------dist                            编译出来的小程序代码根目录
|---------src                             项目开发文件
  |-----------pages                       页面开发文件
    |--------index                        首页
      |------index.js                     首页js
      |------index.json                   首页json
      |------index.scss                   首页scss
      |------index.xml                    首页xml
  |-----------utils                       项目公用方法或工具类方法
  |-----------app.js                      小程序主js文件
  |-----------app.json                    小程序主json配置文件
  |-----------app.scss                    小程序主scss样式文件
  |-----------project.config.json         项目配置文件
  |-----------sitemap.json                sitemap 配置
|---------gulpfile.js                     项目压缩的脚本配置文件
|---------config.js                       nwx-cli工具配置
|---------package.json                    npm初始文件
|---------README.md                       项目说明文件
|---------webpack.config.js               项目编译打包配置文件
|---------.eslintrc                       js代码规范检测配置文件
|---------.gitignore                      上传git时，指定忽略上传文件的配置文件
``````


## 命令介绍

#### 查看 nwx 版本

```
nwx --version
```

#### 查看 nwx 帮助

```
nwx -h
```

#### 初始化本地开发环境

```
nwx init
```
根据命令行提示，一次填写项目名称、appid、是否在git commit时开启自动lint检查

#### 打开微信小程序调试工具

默认在运行 npm run start 的时候会自动开启微信小程序调试工具，也可以通过以下方式手动开启，小程序项目路径默认就是当前目录下dist文件夹下
```
nwx open
```

#### 创建page、component文件

在**当前目录**下创建文件夹并生成对应的js、json、scss、wxml模板文件

```
nwx create <name> <type>
```

- name: 组件或者页面名称，必填
- type: page或者component，必填

#### 按需引入官方组件库中的组件

在**项目根目录**下运行下面的命令，然后选择需要按需引入的组件，可选择多个，组件会保存到src目录下的weui_components文件夹中，文件夹不存在自动创建。

```
nwx install
```

[官方组件库地址](https://developers.weixin.qq.com/miniprogram/dev/extended/weui/)

#### 预览小程序

通过运行以下命令可将预览二维码打印到命令行，如果没有登录微信小程序开发工具，会打印登录二维码，登录后再运行预览命令
```
nwx preview
```

#### 上传代码到开发版本

运行该命令，根据提示一次填写版本号以及版本备注，自动上传到开发版本
```
nwx upload
```

最后，当前只支持css预编译sass，less、stylus配置也很简单，可自行在webpack.config.js中配置