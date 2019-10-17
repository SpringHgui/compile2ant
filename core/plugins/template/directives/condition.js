const ADDITIONS_DIRECTIVES_HANDLES = {
  'v-show': ({ item, name, expr }) => ({ attrs: { hidden: `{{ !(${expr}) }}` } }),
  'v-if': ({ item, name, expr }) => ({ attrs: { 'a:if': `{{ ${expr} }}` } }),
  'v-else-if': ({ item, name, expr }) => ({ attrs: { 'a:elif': `{{ ${expr} }}` } }),
  'v-else': ({ item, name, expr }) => ({ attrs: { 'a:else': true } }),

  'wx:if': ({ item, name, expr }) => ({ attrs: { 'a:if': `${expr}` } }),
};

exports = module.exports = function() {
  Object.keys(ADDITIONS_DIRECTIVES_HANDLES).forEach(directives => {
    this.register('template-parse-ast-attr-' + directives, ADDITIONS_DIRECTIVES_HANDLES[directives]);
  });
};
