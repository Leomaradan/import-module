import { importModule } from '../lib/index.js';

(async () => {
  let exportedAMD = await importModule("./amd.js");
  console.log({ exportedAMD });
})();

(async () => {
  let exportedCJS = await importModule("./cjs.js");
  console.log({ exportedCJS });
})();

(async () => {
  let exportedESM = await importModule("./esm.js");
  console.log({ exportedESM });
})();

(async () => {
  let exportedUMD = await importModule("./umd.js");
  console.log({ exportedUMD });
})();

(async () => {
  // will fail
  let pluginTypescript = await importModule("@rollup/plugin-typescript");
  console.log({ pluginTypescript });
})();

console.log({ context });