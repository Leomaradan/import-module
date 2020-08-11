import Queue from "./queue";

declare global {
  interface Window {
    define: any;
    module: any;
    exports: any;
  }
}

async function importModulePromise(loadPath: string) {

  let _module = window.module;
  let _exports = window.exports;
  let _define = window.define;
  let defined = {};

  function defineLoader(_requirment: any, factory: () => any) {
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

  const exported = await import(loadPath);

  let mergeExports = { ...window.module.exports, ...exported, ...window.exports, ...defined };

  window.module = _module;
  window.define = _define;
  window.exports = _exports;


  return mergeExports;
}



export const importModule = (path: string) => {
  return Queue.enqueue(() => importModulePromise(path));
};