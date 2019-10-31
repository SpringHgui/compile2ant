# compile2ant
wepy2.0.x 编译为支付宝小程序代码插件

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


2.0.x
```console
wepy build -o ant -t ant --watch
```

1.7.x
```console
./node_modules/.bin/wepy build -o ant -t ant --watch
```
