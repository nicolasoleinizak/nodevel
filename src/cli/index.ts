import { Command } from 'commander';
import { initCommand } from './commands/init';

const program = new Command();

program
  .name('nodevel')
  .description('CLI for Nodevel Framework')
  .version('0.1.0');

// Register the init command
program.addCommand(initCommand());

program.parse(process.argv);