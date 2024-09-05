import { IRegisterAdminReqBody } from '../interfaces/controllers/admin';
import { createAdmin } from '../services/admin.service';
import { catchAsync } from '../utils';
import ApiResponse from '../utils/ApiResponse';
import * as statusCodes from '../utils/constants/statusCodes';

const registerAdmin = catchAsync(async (req, res) => {
    const data: IRegisterAdminReqBody = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password || '',
        allow_password_change: req.body.allow_password_change || false,
    };

    const admin = await createAdmin(data);

    return new ApiResponse(res, statusCodes.CREATED, 'Admin registered successfully', admin);
});

export { registerAdmin };
