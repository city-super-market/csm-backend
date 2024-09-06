import { Response } from 'express';

export interface IResponseBody {
    msg: string;
    data?: any;
    err?: any;
}

export type TResponseCodes = 200 | 201 | 400 | 401 | 403 | 404 | 422 | 500 | 503;

export interface IResponse extends Response {
    json: (body: IResponseBody) => this;
    status: (code: TResponseCodes) => this;
}

export default IResponse;
