"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = initCommand;
const child_process_1 = require("child_process");
const commander_1 = require("commander");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
function initCommand() {
    const command = new commander_1.Command('init');
    command
        .description('Generate a new project scaffold using Nico Framework')
        .argument('<project-name>', 'The name of the project to create')
        .option('-l, --link-local', 'Link to local nodevel development version')
        .action(async (projectName, options) => {
        // Note: __dirname will be dist/cli/commands, so we go up two levels
        const templateDir = path_1.default.resolve(__dirname, '../../templates/copy');
        const targetDir = path_1.default.resolve(process_1.default.cwd(), projectName);
        try {
            if (fs_extra_1.default.existsSync(targetDir)) {
                console.error(`Error: Directory '${projectName}' already exists.`);
                process_1.default.exit(1);
            }
            await fs_extra_1.default.copy(templateDir, targetDir);
            const packageJsonPath = path_1.default.resolve(__dirname, '../../templates/package.json.hbs');
            const packageJsonTemplate = await fs_extra_1.default.readFile(packageJsonPath, 'utf8');
            const { version: cliVersion, name: cliName } = require('../../../package.json');
            const pkgFilled = packageJsonTemplate
                .replace(/{{projectName}}/g, projectName)
                .replace(/{{nodevelVersion}}/g, `^${cliVersion}`);
            fs_extra_1.default.writeFileSync(path_1.default.join(targetDir, 'package.json'), pkgFilled);
            console.log('📦  Installing dependencies…');
            (0, child_process_1.execSync)('npm install', { cwd: targetDir, stdio: 'inherit' });
            /* --- Si estamos desarrollando localmente y querés apuntar al codebase git --- */
            if (options.linkLocal) {
                console.log('🔗  Linking local nodevel…');
                (0, child_process_1.execSync)('npm link nodevel', { cwd: targetDir, stdio: 'inherit' });
            }
            console.log(`✅ Project '${projectName}' initialized.`);
        }
        catch (err) {
            console.error('❌ Failed to initialize project:', err);
            process_1.default.exit(1);
        }
    });
    return command;
}
//# sourceMappingURL=init.js.map