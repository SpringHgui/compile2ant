const forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
const forIteratorRE = /,([^,}\]]*)(?:,([^,}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;
const variableRE = /^\s*[a-zA-Z$_][a-zA-Z\d_]*\s*$/;
const Check = require('../util/check');

const wxForRE = /^wx:for/;
const wxKeyRE = /^wx:key/;

exports = module.exports = function () {
  this.register('template-parse-ast-pre-attr-v-for', function preParseDirectivesFor({
    item,
    name,
    expr,
    modifiers,
    scope,
    ctx
  }) {
    let res = {};
    let currentScope = {};
    let inMatch = expr.match(forAliasRE);
    let variableMatch = expr.match(variableRE);
    if (variableMatch) {
      // e.g: v-for="items"
      res.alias = 'item';
      res.for = variableMatch[0].trim();
      currentScope.for = res.for;
      currentScope.declared = [];
    }

    if (inMatch) {
      currentScope.declared = currentScope.declared || [];
      res.for = inMatch[2].trim();
      currentScope.for = res.for;
      let alias = inMatch[1].trim().replace(stripParensRE, '');
      let iteratorMatch = alias.match(forIteratorRE);
      if (iteratorMatch) {
        res.alias = alias.replace(forIteratorRE, '').trim();
        currentScope.declared.push(res.alias);
        currentScope.alias = res.alias;
        res.iterator1 = iteratorMatch[1].trim();
        currentScope.iterator1 = res.iterator1;
        currentScope.declared.push(res.iterator1);
        if (iteratorMatch[2]) {
          res.iterator2 = iteratorMatch[2].trim();
          currentScope.iterator2 = res.iterator2;
          currentScope.declared.push(res.iterator2);
        }
      } else {
        res.alias = alias;
        currentScope.alias = alias;
        currentScope.declared.push(alias);
      }
    }
    if (scope) {
      currentScope.parent = scope;
    }

    let err = Check.checkExpression(res.for, `v-for="${expr}"`);
    if (err) {
      this.hookUnique(
        'error-handler',
        'template',
        {
          ctx: ctx,
          message: err,
          type: 'error',
          title: 'v-for'
        },
        {
          item: item,
          attr: name,
          expr: expr
        }
      );
    }

    item['v-for'] = {
      'a:for': `{{ ${res.for} }}`,
      'a:for-index': `${res.iterator1 || 'index'}`,
      'a:for-item': `${res.alias || 'item'}`,
      'a:key': `${res.iterator2 || res.iterator1 || 'index'}`
    };

    return {
      item,
      name,
      expr,
      modifiers,
      scope: currentScope,
      ctx
    };
  });

  this.register('template-parse-ast-attr-wx:for', function parseAstBind({ item, name, expr, modifiers, scope, ctx }) {
    console.log("=template-parse-ast-pre-attr-wx:for=", { item, name, expr, modifiers, scope, ctx });

    let prop = name.replace(wxForRE, 'a:for');
    let value = expr;
    return {
      bind: {
        name,
        prop,
        value,
        expr
      },
      attrs: {
        [prop]: expr
      }
    };
  });

  this.register('template-parse-ast-attr-wx:key', function parseAstBind({ item, name, expr, modifiers, scope, ctx }) {
    console.log("=template-parse-ast-pre-attr-wx:for=", { item, name, expr, modifiers, scope, ctx });

    let prop = name.replace(wxKeyRE, 'a:key');
    let value = expr;
    return {
      bind: {
        name,
        prop,
        value,
        expr
      },
      attrs: {
        [prop]: expr
      }
    };
  });
};
