import { Command } from 'commander';
import path from 'path';

export function runCommand() {
  const command = new Command('run');

  command
    .description('Run the Nodevel Framework application')
    .action(() => {
      // Note: This is a placeholder for the actual run logic.
      // In a real application, you would start your server or application here.
      console.log('Running the Nodevel Framework application...');

      // Execute the bootstrap/index.ts file

      const bootstrapPath = path.resolve(process.cwd(), 'src/bootstrap/index.ts');

      console.log(`Loading bootstrap file from: ${bootstrapPath}`);

      // Import the bootstrap file dynamically

      import(bootstrapPath)
        .then((module) => {
          if (module.default) {
            module.default();
          } else {
            console.error('Bootstrap module does not export a default function.');
          }
        })
        .catch((err) => {
          console.error('Error loading bootstrap file:', err);
        });
    });

  return command;
}