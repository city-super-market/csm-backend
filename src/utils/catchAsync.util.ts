import { IRequest, IResponse, INextFunction } from '../interfaces/vendor';
import ApiResponse from './ApiResponse';

interface IController {
    (req: IRequest, res: IResponse): Promise<ApiResponse>;
}

const catchAsync = (fun: IController) => async (req: IRequest, res: IResponse, next: INextFunction) => {
    try {
        await fun(req, res);
    } catch (err) {
        next(err);
    }
};

export default catchAsync;
