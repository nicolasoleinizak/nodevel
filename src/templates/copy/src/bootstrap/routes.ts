import path from 'path';
import routesConfig from '../config/routes.ts';

export default function() {
    const routesFiles = routesConfig.files;

    const routes = routesFiles.map((file: string) => {
        const resolvedPath = path.resolve(__dirname, '../../', file);
        const module = require(resolvedPath);
        return module.default;
    });

    return routes;
}