import { Route, RouteGroup } from "../router";
import express, { Request, Response } from "express";

export class Server
{
  private _routes: Route[] | RouteGroup[] = [];

  private _port: number = 3000;

  public routes(
    routes: Route[] | RouteGroup[]
  ) {
    this._routes = routes;
  }

  public serve()
  {
    const app = express();

    this.registerRoutes(app);

    app.listen(this._port, () => {
      console.log("Server is running on http://localhost:" + this._port);
    });
  }

  public port(port: number) {
    this._port = port;

    return this;
  }

  private registerRoutes(app: any): void {
    this._routes.forEach((route: any) => {
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
}