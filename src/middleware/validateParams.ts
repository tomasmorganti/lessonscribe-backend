import { Request, Response, NextFunction } from 'express';
import { HTTP400Error } from '../utils/httpErrors';
import Ajv from 'ajv';
import lodash from 'lodash';

type ParamSchema = {
    properties: {};
    required?: string[];
    oneOf?: object[];
    anyOf?: object[];
};

const getErrorMessageFromAjv = (errorObject: Ajv.ErrorObject) => {
    if (['minLength', 'maxLength', 'type', 'enum', 'format'].includes(errorObject.keyword)) {
        return `${errorObject.dataPath.replace('.', '')} ${errorObject.message}`;
    }
    if (['oneOf'].includes(errorObject.keyword)) {
        return 'Too many request parameters';
    }
    return errorObject.message;
};

export default (paramSchema: ParamSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const ajv = new Ajv({ $data: true, coerceTypes: true });
        const paramSchemaKeys = Object.keys(paramSchema.properties);
        const requestParamObj = {} as any;
        if (req.method === 'GET') {
            for (const key of paramSchemaKeys) {
                requestParamObj[key] = lodash.get(req.query, key);
            }
        } else {
            for (const key of paramSchemaKeys) {
                requestParamObj[key] = lodash.get(req.body, key);
            }
            if (req.params.id) {
                requestParamObj['id'] = req.params.id;
            }
        }
        console.log(requestParamObj);
        const validated = ajv.validate(paramSchema, requestParamObj);
        if (!validated) {
            // TODO: Sending all ajv error messages back, rather than just first in array
            console.log('All ajv errors: ', ajv.errors);
            const errorMessage = ajv.errors ? getErrorMessageFromAjv(ajv.errors[0]) : 'Bad request.';
            throw new HTTP400Error(errorMessage);
        } else {
            next();
        }
    };
};
