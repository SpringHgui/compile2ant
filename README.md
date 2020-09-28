# compile2ant
wepy2.0.x 编译为支付宝小程序代码插件  

npm：https://www.npmjs.com/package/compile2ant

### 注意事项
插件仅支持 `2.0.0-alpha.21`之后的版本，请将cli先升级至最新版。

`npm install @wepy/cli@next -g`

### 安装

由于个人精力有限，测试未覆盖支付宝小程序的所有api，如编译后不能正常运行，请提交 issue 或直接 pr，会及时进行兼容

```
npm install compile2ant -save-dev
```

### 配置

`wepy.config.js`
```
const antPlugin = require('compile2ant');

module.exports = {
  ...
  plugins: [
    antPlugin()
  ],
  ...
}

```

### 编译

直接执行以下命令
```
./node_modules/.bin/wepy build -o ant -t ant --watch
```
或在 `package.json`添加`scripts`如下, 可执行 `npm run ant` 进行编译
```
{
  "name": "xxx",
  "version": "0.0.2",
  "description": "A WePY project",
  "main": "weapp/app.js",
  "scripts": {
    ...
    "ant": "./node_modules/.bin/wepy build -o ant -t ant --watch",
    ...
  },
  ...
 }
```
### 重要的事情

支付宝小程序 `启用 component2 编译` 一定要开启  
支付宝小程序 `启用 component2 编译` 一定要开启  
支付宝小程序 `启用 component2 编译` 一定要开启  

### MIT
