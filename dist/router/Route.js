"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
class Route {
    constructor() {
        this._path = '';
        this._callback = () => { };
        this._method = '';
    }
    create(method, path, callback) {
        this._method = method;
        this._path = path;
        this._callback = callback;
    }
    static get(path, callback) {
        const route = new Route();
        route.create('GET', path, callback);
        return route;
    }
    path() {
        return this._path;
    }
    callback() {
        return this._callback;
    }
    method() {
        return this._method;
    }
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map