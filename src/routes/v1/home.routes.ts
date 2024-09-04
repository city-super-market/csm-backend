import express from 'express';
import { IRequest, IResponse } from '../../interfaces/vendor';
import ApiResponse from '../../utils/ApiResponse';
const router = express.Router();

// route    :: GET /api/v1/
// access   :: Public
// desc     :: Welcome Message
router.get('/', (req: IRequest, res: IResponse): ApiResponse => {
    return new ApiResponse(res, 200, 'Welcome to City Super Market');
});

export default router;
