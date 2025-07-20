"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteGroup = void 0;
const Route_1 = require("./Route");
class RouteGroup {
    constructor() {
        this._routes = [];
    }
    static create(routes, prefix) {
        const routeGroup = new RouteGroup();
        routeGroup._routes = routes.map(route => {
            const newRoute = new Route_1.Route();
            newRoute.create(route.method(), prefix ? `${prefix}${route.path()}` : route.path(), route.callback());
            return newRoute;
        });
        return routeGroup;
    }
    routes() {
        return this._routes;
    }
}
exports.RouteGroup = RouteGroup;
//# sourceMappingURL=RouteGroup.js.map