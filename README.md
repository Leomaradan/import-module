# Import Module

Universal JS Module importer. Can import ESM, CommonJS, AMD and UMD files

[![NPM version](https://img.shields.io/npm/v/js-import-module.svg)](https://www.npmjs.com/package/js-import-module)

# Installation
__With npm:__

```bash
npm install js-import-module
```

__With yarn:__
```bash
yarn add js-import-module
```

# How to use

```js
import { importModule } from 'js-import-module';

// Async/await
(async () => {
  const exportedCJS = await importModule("./neededModuleCommonJS");
  // do stuff with exportedCJS values
})();

// Promise
importModule("./neededModuleCommonJS").then(exportedCJS => {
  // do stuff with exportedCJS values
})
```