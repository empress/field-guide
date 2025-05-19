import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

let packageJson;

function getPackageJson(cwd = process.cwd()) {
  if (packageJson) {
    return packageJson;
  }

  try {
    packageJson = JSON.parse(
      fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'),
    );

    return packageJson;
  } catch {
    console.error('No package.json found');
  }

  return { name: '', dependencies: {} };
}

export function getThemePackage() {
  const packageJson = getPackageJson();
  return [
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
  ].find((name) => name.startsWith('field-guide-'));
}

export function getTheme() {
  const theme = getThemePackage();

  if (!theme) {
    throw new Error(
      'You must install a field-guide theme to use field guide. Try installing field-guide-default-template and try again.',
    );
  }

  // This can't be done with `import.meta.resolve` because it doesn't support a parent as of Node.js 20,
  // which is the reason why this whole file is a CommonJS module.
  return require.resolve(path.join(theme, 'package.json'), {
    paths: [process.cwd()],
  });
}
