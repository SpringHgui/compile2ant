const fs = require('fs');
const path = require('path');
const hashUtil = require('../../util/hash');

// 记录 npm 文件是否已经遍历过
const npmTraverseFileMap = {};

exports = module.exports = function() {
  this.register('wepy-parser-dep', function(node, ctx, dep) {
    return this.resolvers.normal.resolve({ issuer: ctx.file }, path.dirname(ctx.file), dep.module, {}).then(rst => {
      let npm = rst.meta.descriptionFileRoot !== this.context;

      let assets = this.assets;
      let file = rst.path;

      if (!file) {
        // TODO: resovle fail ?
        return rst.path;
      }

      if(file.indexOf('\\node_modules\\@wepy\\core\\dist\\wepy.js') > 0){
        file = file.replace('wepy.js', 'wepy.ant.js');
      }

      let data = assets.data(file);
      if (data !== undefined && this.compiled[file] && this.compiled[file].hash) {
        let fileContent = fs.readFileSync(file, 'utf-8');
        let fileHash = hashUtil.hash(fileContent);
        if (fileHash === this.compiled[file].hash) {
          // File is not changed, do not compile again
          if (
            data.parser &&
            !data.depModules && // Ignore if deps modules are resolved, otherwise there will be a dead loop
            data.parser.deps &&
            data.parser.deps.length &&
            !npmTraverseFileMap[file]
          ) {
            // If it has dependences, walk throguh all dependences
            npmTraverseFileMap[file] = npm;
            let depTasks = data.parser.deps.map(dep =>
              this.hookUnique('wepy-parser-dep', data, this.compiled[file], dep)
            );
            return Promise.all(depTasks).then(rst => {
              data.depModules = rst;
              return data;
            });
          } else {
            return data;
          }
        } else {
          npmTraverseFileMap[file] = false;
        }
      }

      return this.hookUnique('wepy-parser-file', node, {
        file: file,
        npm: npm,
        component: ctx.component,
        type: ctx.type,
        dep,
        wxs: !!ctx.wxs
      });
    });
  });
};
