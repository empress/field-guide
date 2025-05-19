#!/usr/bin/env node
import { Command } from 'commander';

import { build } from './lib/build.js';
import { start } from './lib/start.js';
import { config } from './lib/config.js';

const program = new Command();

program.name(process.env.npm_package_name);
program.description(process.env.npm_package_description);
program.version(process.env.npm_package_version);

program
  .command('start')
  .description('Live-reloading server for your slides.')
  .option('-p, --port <port>', 'Port to run the server on', 4200)
  .action(start);

program
  .command('build')
  .description('Build a static copy of your presentation.')
  .option('-o, --outDir <path>', 'Output directory', config.build.outDir)
  .action(build);

program.parse();
