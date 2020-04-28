import * as UserController from "./UserController";

export default [
    {
        path: "/api/v1/user",
        method: "get",
        handler: UserController.getUser
        // async ({ query }: Request, res: Response) => {
        //     const result = await getPlacesByName(query.q);
        //     res.status(200).send(result);
        // }
    }
];