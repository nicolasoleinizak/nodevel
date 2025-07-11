class Route {
  private _path: string;

  private _callback: Function;

  private _method: string;

  constructor() {
    this._path = '';
    this._callback = () => {};
    this._method = '';
  }
  
  public create(method: string, path: string, callback: Function) {
    this._method = method;
    this._path = path;
    this._callback = callback;
  }

  static get(path: string, callback: Function) {
    const route = new Route();
    route.create('GET', path, callback);
    return route;
  }

  public path() {
    return this._path;
  }

  public callback() {
    return this._callback;
  }

  public method() {
    return this._method;
  }
}

export { Route };