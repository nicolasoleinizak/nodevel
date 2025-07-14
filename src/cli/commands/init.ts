import { execSync } from 'child_process';
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import process from 'process';

export function initCommand() {
  const command = new Command('init');

  command
    .description('Generate a new project scaffold using Nico Framework')
    .argument('<project-name>', 'The name of the project to create')
    .option('-l, --link-local', 'Link to local nodevel development version')
    .action(async (projectName: string, options) => {
      // Note: __dirname will be dist/cli/commands, so we go up two levels
      const templateDir = path.resolve(__dirname, '../../templates/copy');
      const targetDir = path.resolve(process.cwd(), projectName);

      try {
        if (fs.existsSync(targetDir)) {
          console.error(`Error: Directory '${projectName}' already exists.`);
          process.exit(1);
        }
        await fs.copy(templateDir, targetDir);

        const packageJsonPath = path.resolve(__dirname, '../../templates/package.json.hbs');

        const packageJsonTemplate = await fs.readFile(packageJsonPath, 'utf8');

        const { version: cliVersion, name: cliName } = require('../../../package.json')

        const pkgFilled = packageJsonTemplate
          .replace(/{{projectName}}/g, projectName)
          .replace(/{{nodevelVersion}}/g, `^${cliVersion}`)

        fs.writeFileSync(path.join(targetDir, 'package.json'), pkgFilled)

        console.log('📦  Installing dependencies…')
        execSync('npm install', { cwd: targetDir, stdio: 'inherit' })

        /* --- Si estamos desarrollando localmente y querés apuntar al codebase git --- */
        if (options.linkLocal) {
          console.log('🔗  Linking local nodevel…')
          execSync('npm link nodevel', { cwd: targetDir, stdio: 'inherit' })
        }

        console.log(`✅ Project '${projectName}' initialized.`);
      } catch (err) {
        console.error('❌ Failed to initialize project:', err);
        process.exit(1);
      }
    });

  return command;
}