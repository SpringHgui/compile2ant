exports = module.exports = function initParser(ins) {
  ['script', 'wxs'].forEach(k => {
    require('../plugins/parser/' + k).call(ins);
  });
};