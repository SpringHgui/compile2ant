const htmlparser = require('htmlparser2');
const tools = require('../../util/tools');
const onRE = /^@|^v-on:/;
const bindRE = /^:|^v-bind:/;
const modifierRE = /\.[^.]+/g;

exports = module.exports = function() {
  this.register('template-parse-ast-tag', function parseAstTag(item, rel) {
    let htmlTags = this.tags.htmlTags;
    let wxmlTags = this.tags.wxmlTags;
    let html2wxmlMap = this.tags.html2wxmlMap;
    let logger = this.logger;

    let components = rel.components;
    if (components[item.name]) { // It's a user defined component
      logger.silly('tag', `Found user defined component "${item.name}"`);
      item.parsedAttr = item.parsedAttr || {};
      item.parsedAttr['onInit'] = "_initComponent";
    } else if (html2wxmlMap[item.name]) {  // Tag is in the map list
      logger.silly('html2wxml', `Change "${item.name}" to "${html2wxmlMap[item.name]}"`);
      item.name = html2wxmlMap[item.name];
    } else if (wxmlTags.indexOf(item.name) > -1) { // Tag is a wxml tag

    } else if (htmlTags.indexOf(item.name) > -1) { // Tag is a html tag
      logger.silly('html2wxml', `Change "${item.name}" is a html tag, changed to "view"`);
      item.name = 'view';
    } else { // Tag is a unknow tag
      logger.silly('tag', `Assume "${item.name}" is a user defined component`);
    }

    return [item, rel];
  });
};
