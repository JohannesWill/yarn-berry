import {patchFs as fslibPatchFs} from '@yarnpkg/fslib';
import {PnpApi}                  from '@yarnpkg/pnp';
import fs                        from 'fs';

import {NodeModulesFS}           from './NodeModulesFS';
import {dynamicRequire}          from './dynamicRequire';

let fsPatched = false;

let pnp: PnpApi;
try {
  pnp = dynamicRequire(`pnpapi`);
} catch {}

export const patchFs = () => {
  if (pnp && !fsPatched) {
    const realFs: typeof fs = {...fs};
    const nodeModulesFS = new NodeModulesFS(pnp, {realFs});
    fslibPatchFs(fs, nodeModulesFS);
    fsPatched = true;
  }
};

if (!process.mainModule)
  patchFs();
