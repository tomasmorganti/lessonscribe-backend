import * as UsersController from "./UsersController";

export default [
    {
        path: "/users",
        method: "get",
        handler: UsersController.getAllUsers
        // async ({ query }: Request, res: Response) => {
        //     const result = await getPlacesByName(query.q);
        //     res.status(200).send(result);
        // }
    },
    {
        path: "/users/:id",
        method: "get",
        handler: UsersController.getUserById
    }
];