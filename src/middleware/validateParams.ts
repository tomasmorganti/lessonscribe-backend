import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";
import Ajv from 'ajv';
import lodash from 'lodash';

type ParamSchema = {
    properties: {},
    required?: string[],
    oneOf?: object[]
};

const getErrorMessageFromAjv = (errorObject: Ajv.ErrorObject) => {
    if (['minLength', 'maxLength', 'type'].includes(errorObject.keyword)) {
        return `${errorObject.dataPath.replace('.', '')} ${errorObject.message}`;
    } else if (['oneOf'].includes(errorObject.keyword)) {
        return "too many request parameters.";
    };

    return errorObject.message;
};

export default (paramSchema: ParamSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const ajv = new Ajv({ $data: true, coerceTypes: true });
        const paramSchemaKeys = Object.keys(paramSchema.properties);
        let requestParamObj = <any>{};
        if (req.method === "GET") {
            for (let key of paramSchemaKeys) {
                requestParamObj[key] = lodash.get(req.query, key);
            }
        } else {
            for (let key of paramSchemaKeys) {
                requestParamObj[key] = lodash.get(req.body, key);
            }
        }
        const validated = ajv.validate(paramSchema, requestParamObj);
        if (!validated) {
            const errorMessage = ajv.errors ? getErrorMessageFromAjv(ajv.errors[0]) : "bad request.";
            throw new HTTP400Error(errorMessage);
        } else {
            next();
        }
    }
};