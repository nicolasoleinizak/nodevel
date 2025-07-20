"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = runCommand;
const commander_1 = require("commander");
const path_1 = __importDefault(require("path"));
function runCommand() {
    const command = new commander_1.Command('run');
    command
        .description('Run the Nodevel Framework application')
        .action(() => {
        // Note: This is a placeholder for the actual run logic.
        // In a real application, you would start your server or application here.
        console.log('Running the Nodevel Framework application...');
        // Execute the bootstrap/index.ts file
        const bootstrapPath = path_1.default.resolve(process.cwd(), 'src/bootstrap/index.ts');
        console.log(`Loading bootstrap file from: ${bootstrapPath}`);
        // Import the bootstrap file dynamically
        Promise.resolve(`${bootstrapPath}`).then(s => __importStar(require(s))).then((module) => {
            if (module.default) {
                module.default();
            }
            else {
                console.error('Bootstrap module does not export a default function.');
            }
        })
            .catch((err) => {
            console.error('Error loading bootstrap file:', err);
        });
    });
    return command;
}
//# sourceMappingURL=run.js.map