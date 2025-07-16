import { bootstrapRoutes } from './routes';
import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { pathToFileURL } from 'url';

export async function startServer(options: any) {
    const projectRoot = process.cwd()                 // 👈  raíz del usuario
    const port        = options.port ?? 3000

    // ---------- 1. arma la ruta que DEBERÍA existir en dev ----------
    let routesPath = options.routesFile ??
                    path.join(projectRoot, 'src', 'config', 'routes.ts')

    // ---------- 2. si no existe (=> estamos en prod), busca el .js compilado ----------
    if (!fs.existsSync(routesPath)) {
        // reemplaza /src/config/routes.ts -> /dist/config/routes.js
        routesPath = routesPath
        .replace(path.join('src', 'config'), path.join('dist', 'config'))
        .replace(/\.ts$/, '.js')
    }

    if (!fs.existsSync(routesPath)) {
        throw new Error(
        `Routes file not found. Expected at:\n  ${routesPath}\n` +
        `Check that you have "src/config/routes.ts" and/or ran "npm run build".`
        )
    }

    // ---------- 3. import dinámico ----------
    const url = pathToFileURL(routesPath).href

    const { default: routesFiles } = await import(
        /* webpackIgnore: true */ url
    )
  
    const app = express();

    bootstrapRoutes(app, routesFiles);

    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}