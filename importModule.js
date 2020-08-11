import Queue from "./queue";

async function importModulePromise(path) {

  let _module = window.module;
  let _exports = window.exports;
  let _define = window.define;
  let defined = {};


  function defineLoader(_requirment, factory) {
    const result = factory();
    if (typeof result === 'function') {
      defined = { default: result(), ...result.prototype };
    } else {
      defined = result;
    }
  };

  defineLoader.amd = true;

  window.module = {};
  window.exports = {};

  window.define = defineLoader;

  const exported = await import(path);

  let mergeExports = { ...module.exports, ...exported, ...exports, ...defined };

  window.module = _module; // restore global
  window.define = _define; // restore global
  window.exports = _exports; // restore global


  return mergeExports;
}



const importModule = (path) => {
  return Queue.enqueue(() => importModulePromise(path));
};