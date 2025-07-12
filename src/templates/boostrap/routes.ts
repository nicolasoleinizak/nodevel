import routesConfig from '../config/routes';

export default function() {
    const routesFiles = routesConfig.files;

    const routes = routesFiles.map(async (file: string) => {
        const module = await import(file);
        return module.default;
    });

    return routes;
}