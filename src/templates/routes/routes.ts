import { Route } from "../../router/Route";
import { RouteGroup } from "../../router/RouteGroup";

export default RouteGroup.create([
    Route.get('/products', () => {
        return 'List of products';
    }),
    Route.get('/products/view', () => {
        return 'View product details';
    }),
], 'api');