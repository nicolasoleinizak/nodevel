import { Request, Response } from "express";
import { Route, RouteGroup } from "nodevel";

export default RouteGroup.create([
    Route.get('/example', (req: Request, res: Response) => {
        res.end(JSON.stringify({ message: "Hello, World!" }));
    }),
], 'public');