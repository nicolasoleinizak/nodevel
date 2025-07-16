import { Route } from "./Route";

class RouteGroup {
  public readonly __kind = 'RouteGroup';
  
  _routes: Route[] = [];

  static create(
    routes: Route[],
    prefix?: string | null,
  ) {
    const routeGroup = new RouteGroup();
    routeGroup._routes = routes.map(route => {
      const newRoute = new Route();
      newRoute.create(route.method(), prefix ? `/${prefix}${route.path()}` : route.path(), route.callback());
      return newRoute;
    })
    return routeGroup;
  }

  routes() {
    return this._routes;
  }
}

export { RouteGroup};