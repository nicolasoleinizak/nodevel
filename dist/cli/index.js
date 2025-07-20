#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const run_1 = require("./commands/run");
const dev_1 = require("./commands/dev");
const program = new commander_1.Command();
program
    .name('nodevel')
    .description('CLI for Nodevel Framework')
    .version('0.1.0');
// Register the init command
program.addCommand((0, init_1.initCommand)());
// Register the run command
program.addCommand((0, run_1.runCommand)());
// Register the dev command
program.addCommand((0, dev_1.devCommand)());
program.parse(process.argv);
//# sourceMappingURL=index.js.map