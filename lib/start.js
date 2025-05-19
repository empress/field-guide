import { join } from 'node:path';
import { createServer } from 'vite';
import { config } from './config.js';
import { fileURLToPath } from 'node:url';
import { readFile, writeFile } from 'node:fs/promises';
import { execa } from 'execa';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const cwd = process.cwd();

export async function start({ port = 1337 } = {}) {
  config.server.port = Number(port);

  process.chdir(join(__dirname, '..'));
  await execa`pnpm link ${cwd}`;

  const server = await createServer(config);
  await server.restart(true);

  server.printUrls();
  server.bindCLIShortcuts({ print: true });
}
