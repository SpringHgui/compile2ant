# compile2ant
wepy2.0.x 编译为支付宝小程序代码插件

### 注意事项
插件仅支持 `2.0.0-alpha.21`之后的版本，请将cli先升级至最新版。

`npm install @wepy/cli@next -g`

### 安装

```console
npm install compile2ant -save-dev
```
### 配置

```console
wepy.config.js
```
```console
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
```console
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
