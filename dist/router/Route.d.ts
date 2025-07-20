declare class Route {
    private _path;
    private _callback;
    private _method;
    constructor();
    create(method: string, path: string, callback: Function): void;
    static get(path: string, callback: Function): Route;
    path(): string;
    callback(): Function;
    method(): string;
}
export { Route };
//# sourceMappingURL=Route.d.ts.map