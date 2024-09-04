import ApiException from '../utils/exceptions/ApiException';
import { validator } from '../utils';
import { IRequest, IResponse, INextFunction } from '../interfaces/vendor';
import { IResponseBody } from '../interfaces/vendor/IResponse';

const globalErrorHandler = (error: any, req: IRequest, res: IResponse, next: INextFunction): IResponse => {
    if (!(error instanceof ApiException)) {
        console.error(error);
    }

    const responseObject: IResponseBody = {
        msg: error.msg || 'Something went wrong, Please try again later',
    };
    if (!validator.isEmpty(error.errors)) {
        responseObject.err = error.errors;
    }

    return res.status(error.status || 500).json(responseObject);
};

export default globalErrorHandler;
