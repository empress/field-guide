import { resolve as resolvePath } from 'node:path';
import { build as viteBuild } from 'vite';
import { config } from './config.js';

export async function build(options = {}) {
  viteBuild({
    ...config,
    build: {
      ...config.build,
      outDir: options.outDir
        ? resolvePath(process.cwd(), options.outDir)
        : config.build.outDir,
    },
  });
}
