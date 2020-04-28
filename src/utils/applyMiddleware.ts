import { Router } from "express";

type Wrapper = (router: Router) => void;

export default (middlewareWrappers: Wrapper[], router: Router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};
