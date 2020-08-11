(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    // @ts-ignore
    root.returnExports = factory();
  }
}(this, function () {
  //    methods
  const defaultReturn = function () { return 4; }
  defaultReturn.prototype.AMD_A = 1;
  defaultReturn.prototype.AMD_B = 2;
  defaultReturn.prototype.AMD_C = 3;

  return defaultReturn;
}));
