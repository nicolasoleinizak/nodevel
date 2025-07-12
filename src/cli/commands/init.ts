import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import process from 'process';

export function initCommand() {
  const command = new Command('init');

  command
    .description('Generate a new project scaffold using Nico Framework')
    .argument('<project-name>', 'The name of the project to create')
    .action(async (projectName: string) => {
      // Note: __dirname will be dist/cli/commands, so we go up two levels
      const templateDir = path.resolve(__dirname, '../../templates');
      const targetDir = path.resolve(process.cwd(), projectName);

      try {
        if (fs.existsSync(targetDir)) {
          console.error(`Error: Directory '${projectName}' already exists.`);
          process.exit(1);
        }
        await fs.copy(templateDir, targetDir);
        console.log(`✅ Project '${projectName}' initialized.`);
      } catch (err) {
        console.error('❌ Failed to initialize project:', err);
        process.exit(1);
      }
    });

  return command;
}