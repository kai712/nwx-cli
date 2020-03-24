// 生成page、component模板

// 判断是否存在文件夹，创建文件夹并生成index.js、index.scss、index.json、index.wxml文件并填充内容
const chalk = require('chalk')
const shell = require('shelljs')
const fs = require('fs')

const create = (name, type) => {
  // 默认是page
  shell.exec(`mkdir ${name}`, {silent: true})
  shell.exec(`touch ${name}.js ${name}.json ${name}.scss ${name}.wxml`)

  let pagejs = `
  // pages/test.js
  Page({
  
    /**
     * 页面的初始数据
     */
    data: {
  
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    }
  })
  `

  let componentjs = `
  Component({
    /**
     * 组件的属性列表
     */
    properties: {
  
    },
  
    /**
     * 组件的初始数据
     */
    data: {
  
    },
  
    /**
     * 组件的方法列表
     */
    methods: {
  
    }
  })
  `

  let jscontent = type === 'component' ? componentjs : pagejs
  fs.writeFileSync(`${name}.js`, jscontent)

  let componentjson = `
    "component": true,
    "usingComponents": {}
  `

  let jsoncontent = type === 'component' ? componentjson : '"usingComponents": {}'
  fs.writeFileSync(`${name}.json`, `{${jsoncontent}}`)

  fs.writeFileSync(`${name}.wxml`, `<view></view>`)

  shell.exec(`mv ${name}.js ${name}.json ${name}.scss ${name}.wxml -t ${name}/`, {silent: true})
}

module.exports = {
  create
}