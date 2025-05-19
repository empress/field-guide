import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
// import { ViteEjsPlugin as viteEjsPlugin } from 'vite-plugin-ejs';
import { getTheme } from './theme.js';
import { extensions, ember, classicEmberSupport } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const cwd = process.cwd();
const outDir = join(process.cwd(), 'dist');

process.env.EMBROIDER_WORKING_DIRECTORY = join(
  cwd,
  'tmp/compat-prebuild-field-guide',
);

const themeFolder = dirname(getTheme());
const config = {
  configFile: false,
  root: join(__dirname, '..'),
  cacheDir: join(cwd, 'tmp/.vite-field-guide'),
  publicDir: join(cwd, 'public'),
  base: './',

  server: {
    port: 1337,
    fs: {
      allow: [themeFolder, '.'],
    },
  },
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
      configFile: join(__dirname, '..', 'babel.config.cjs')
    }),
  ],
  resolve: {
    alias: {
      docs: join(cwd, 'docs'),
      'local-config-module': join(cwd, 'config/index.js'),
      '@theme': themeFolder,
      'ember-get-config': 'field-guide/config/environment',
    },
  },
  build: {
    outDir: join(cwd, 'dist'),
  },
};

export { config, outDir };
