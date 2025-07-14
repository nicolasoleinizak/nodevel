#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';
import { runCommand } from './commands/run';
import { devCommand } from './commands/dev';

const program = new Command();

program
  .name('nodevel')
  .description('CLI for Nodevel Framework')
  .version('0.1.0');

// Register the init command
program.addCommand(initCommand());

// Register the run command
program.addCommand(runCommand());

// Register the dev command
program.addCommand(devCommand());

program.parse(process.argv);