exports = module.exports = function parseDirectives() {
  ['./condition', './for', './model', './v-on'].map(v => require(v).call(this));
};
