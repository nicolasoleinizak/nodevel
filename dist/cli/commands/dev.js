"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devCommand = devCommand;
// src/commands/dev.ts
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
function devCommand() {
    const cmd = new commander_1.Command('dev')
        .description('Run the project in watch-mode (TSX hot-reload)')
        .option('-p, --port <number>', 'override port (default 3000)')
        .action((opts) => {
        const projectRoot = process.cwd();
        const entry = path_1.default.join(projectRoot, 'src', 'bootstrap', 'app.ts');
        // npx tsx watch src/bootstrap/app.ts --port 4000
        const args = ['tsx', 'watch', entry];
        if (opts.port)
            args.push('--port', opts.port);
        (0, child_process_1.spawn)(process.platform === 'win32' ? 'npx.cmd' : 'npx', args, {
            cwd: projectRoot,
            stdio: 'inherit'
        });
    });
    return cmd;
}
//# sourceMappingURL=dev.js.map