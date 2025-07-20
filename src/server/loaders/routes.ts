import path from "path";

export class RoutesLoader
{
  static getRoutes(routesConfig: any = { files: [] }) {
    const routesFiles = routesConfig.files;

    const routes = routesFiles.map((file: string) => {
        const resolvedPath = path.resolve(process.cwd(), file);
        const module = require(resolvedPath);
        return module.default;
    });

    return routes;
  }
}