import { exampleMiddleware } from "../../middleware/example";
import * as AuthController from "./AuthController";

export default [
    {
        path: "/auth",
        method: "get",
        handler: [
            exampleMiddleware,
            AuthController.getAuth
            // async ({ query }: Request, res: Response) => {
            //     const result = await getPlacesByName(query.q);
            //     res.status(200).send(result);
            // }
        ]
    }
];