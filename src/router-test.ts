import { Route } from "./router/Route";
import { RouteGroup } from "./router/RouteGroup";
import express, { Request, Response } from "express";

const mockFunction = (req: Request, res: Response) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: "Hello, World!" }));
}

const routes = [
  RouteGroup.create([
      Route.get("/users", mockFunction),
      Route.get("/users2", mockFunction),
  ], '/api'),
]

const routesBootstrap = (app: any, routes: RouteGroup[] | Route[]) => {
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

function createServer() {
  const app = express();

  routesBootstrap(app, routes);

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
}

createServer();
