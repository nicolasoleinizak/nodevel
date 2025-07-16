import { Route, RouteGroup } from "nodevel";
import bootstrapRoutes from './routes.ts';
import express, { Request, Response } from "express";

function createServer() {
  const app = express();

  const routes = bootstrapRoutes();
  routesBootstrap(app, routes);

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

function routesBootstrap(app: any, routes: RouteGroup[] | Route[]) {
  routes.forEach(route => {
    if (route instanceof RouteGroup) {
      route.routes().forEach((r: Route) => {
        const method = r.method().toLowerCase();
        app[method](r.path(), (req: Request, res: Response) => {
          r.callback()(req, res);
        });
      });
    } else if (route instanceof Route) {
      const method = route.method().toLowerCase();
      app[method](route.path(), (req: Request, res: Response) => {
        route.callback()(req, res);
      });
    }
  });
}

createServer();