// src/commands/dev.ts
import { Command } from 'commander'
import { spawn } from 'child_process'
import path from 'path'

export function devCommand(): Command {
  const cmd = new Command('dev')
    .description('Run the project in watch-mode (TSX hot-reload)')
    .option('-p, --port <number>', 'override port (default 3000)')
    .action((opts) => {
      const projectRoot = process.cwd()
      const entry = path.join(projectRoot, 'src', 'bootstrap', 'app.ts')

      // npx tsx watch src/bootstrap/app.ts --port 4000
      const args = ['tsx', 'watch', entry]
      if (opts.port) args.push('--port', opts.port)

      spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', args, {
        cwd: projectRoot,
        stdio: 'inherit'
      })
    })

  return cmd
}
