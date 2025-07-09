import process from 'process';
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('nodevel')
  .description('CLI for Nodevel Framework')
  .version('0.1.0');

program
  .command('init <project-name>')
  .description('Generate a new project scaffold using Nico Framework')
  .action(async (projectName: string) => {
    const templateDir = path.resolve(__dirname, '../src/templates');
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

program.parse(process.argv);