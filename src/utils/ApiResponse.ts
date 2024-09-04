import { IResponse } from '../interfaces/vendor';
import { IResponseBody, TResponseCodes } from '../interfaces/vendor/IResponse';

class ApiResponse {
    constructor(
        public readonly res: IResponse,
        public readonly status: TResponseCodes,
        public readonly msg: string,
        public readonly data: object = {},
    ) {
        const responseObject: IResponseBody = {
            msg: msg,
        };
        if (data) {
            responseObject.data = data;
        }

        res.status(status).json(responseObject);
    }
}

export default ApiResponse;
