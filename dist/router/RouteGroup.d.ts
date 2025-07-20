import { Route } from "./Route";
declare class RouteGroup {
    _routes: Route[];
    static create(routes: Route[], prefix?: string | null): RouteGroup;
    routes(): Route[];
}
export { RouteGroup };
//# sourceMappingURL=RouteGroup.d.ts.map