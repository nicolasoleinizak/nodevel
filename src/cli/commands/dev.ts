// src/commands/dev.ts
import { Command } from 'commander'
import { spawn } from 'child_process'
import path from 'path'

export function devCommand(): Command {
  const cmd = new Command('dev')
    .description('Run the project in watch-mode (TSX hot-reload)')
    .option('-p, --port <number>', 'override port (default 3000)')
    .action(({ port }) => {
      const args = ['tsx', 'watch', path.join(__dirname, '../../runtime/devEntry.js')];
      if (port) args.push('--port', port)
      spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', args,
            { stdio: 'inherit' });
    })

  return cmd
}