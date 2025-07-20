import routesConfig from '../config/routes.ts';

export default function() {
    const routesFiles = routesConfig.files;

    const routes = routesFiles.map((file: string) => {
        const module = require(file);
        return module.default;
    });

    return routes;
}