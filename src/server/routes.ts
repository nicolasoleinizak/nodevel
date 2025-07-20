import path from 'path';
import { Route, RouteGroup } from '../router';

function getRoutes(routesConfig: any = { files: [] }) {
    const routesFiles = routesConfig.files;

    const routes = routesFiles.map((file: string) => {
        const resolvedPath = path.resolve(process.cwd(), file);
        const module = require(resolvedPath);
        return module.default;
    });

    return routes;
}

export function bootstrapRoutes(app: any, routesConfig: any = { files: [] }) {
    getRoutes(routesConfig).forEach((route: any) => {
        if (route instanceof RouteGroup) {
            console.log(route);
            route.routes().forEach((r: Route) => {
                const method = r.method().toLowerCase();
                console.log(`Route registered: ${method.toUpperCase()} ${r.path()}`);
                app[method](r.path(), (req: Request, res: Response) => {
                r.callback()(req, res);
                });
            });
        } else if (route instanceof Route) {
            console.log(`Route registered: ${route.method().toUpperCase()} ${route.path()}`);
            const method = route.method().toLowerCase();
            app[method](route.path(), (req: Request, res: Response) => {
                route.callback()(req, res);
            });
        }
    });
}