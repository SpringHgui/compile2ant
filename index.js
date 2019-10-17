const initParser = require('./core/init/parser');
const initPlugin = require('./core/init/plugin');

exports = module.exports = function () {
  return function () {
    if (this.options.output != 'ant') {
      return;
    }

    this.output = function (type, item) {
      let filename, code, encoding;
      if (type === 'wpy') {
        const sfc = item.sfc;
        const outputMap = {
          script: 'js',
          styles: 'acss',
          config: 'json',
          template: 'axml'
        };
  
        Object.keys(outputMap).forEach(k => {
          if (sfc[k] && sfc[k].outputCode) {
            filename = item.outputFile + '.' + outputMap[k];
            code = sfc[k].outputCode;
  
            this.outputFile(filename, code, encoding);
          }
        })
      } else {
        filename = item.targetFile;
        code = item.outputCode;
        encoding = item.encoding;
  
        this.outputFile(filename, code, encoding);
      }
    }

    initPlugin(this);
    initParser(this);
  }
}