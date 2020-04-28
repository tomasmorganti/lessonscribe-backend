import { Router } from "express";
import helmet from "helmet";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";

const applyHelmet = (router: Router) => {
    router.use(helmet());
};

const handleCors = (router: Router) => {
    router.use(cors({ credentials: true, origin: true }));
};

const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({ extended: true }));
    router.use(parser.json());
};

const handleCompression = (router: Router) => {
    router.use(compression());
};

export default [
    applyHelmet,
    handleCors,
    handleBodyRequestParsing,
    handleCompression
];