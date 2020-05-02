import database from "./db";
import http from "http";
import express from "express";
import applyMiddleware from "./utils/applyMiddleware";
import applyRoutes from "./utils/applyRoutes";
import middleware from "./middleware/common";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services";

const startServer = async () => {
    process.on("uncaughtException", e => {
        console.log(e);
        process.exit(1);
    });

    process.on("unhandledRejection", e => {
        console.log(e);
        process.exit(1);
    });

    await database();

    const router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);

    const { PORT = 9000 } = process.env;
    const server = http.createServer(router);
    server.listen(PORT, () =>
        console.log(`Server is running on port ${PORT}...`)
    );
};

startServer();